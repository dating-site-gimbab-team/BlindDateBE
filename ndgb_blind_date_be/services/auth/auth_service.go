package auth

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
	"gorm.io/gorm"

	"ndgb_blind_date/models"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

// JWT 토큰 생성 함수
func createJWT(user models.User) (string, error) {
	// JWT claims 생성
	claims := jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 72).Unix(), // 72시간 후 만료
	}

	// JWT 토큰 생성
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// 비밀 키로 토큰 서명 및 문자열 반환
	return token.SignedString(jwtSecret)
}

// Google 로그인 핸들러
func HandleGoogleLogin(c echo.Context) error {
	if OauthConfig == nil {
		return c.String(http.StatusInternalServerError, "OAuthConfig is not initialized")
	}
	url := OauthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

// Google 인증 콜백 핸들러
func HandleGoogleCallback(c echo.Context, db *gorm.DB) error {

	state := c.QueryParam("state")
	if state != "state-token" {
		return c.String(http.StatusBadRequest, "state 토큰이 일치하지 않습니다.")
	}
	code := c.QueryParam("code")
	if code == "" {
		return c.String(http.StatusBadRequest, "code를 찾을 수 없습니다.")
	}

	// 토큰 교환
	token, err := OauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return c.String(http.StatusInternalServerError, "토큰 교환에 실패하셨습니다.")
	}

	// 사용자 정보 가져오기
	client := OauthConfig.Client(context.Background(), token)
	userInfoResp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return c.String(http.StatusInternalServerError, "유저정보를 찾을 수 없습니다.")
	}
	defer userInfoResp.Body.Close()

	userInfo := make(map[string]interface{})
	if err := json.NewDecoder(userInfoResp.Body).Decode(&userInfo); err != nil {
		return c.String(http.StatusInternalServerError, "유저정보를 분석하는데 실패하였습니다.")
	}
	// 최초 사용자면 유저 생성
	var user models.User
	if err := db.Where("oauth2_id = ?", userInfo["id"].(string)).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// 사용자가 없으면 새로운 사용자 생성
			user = models.User{
				Oauth2Id:   userInfo["id"].(string),
				Email:      userInfo["email"].(string),
				PictureUrl: userInfo["picture"].(string),
				Clinet:     "google",
			}

			// 데이터베이스에 사용자 저장
			if err := db.Create(&user).Error; err != nil {
				return c.String(http.StatusInternalServerError, "유저를 생성하는데 실패하였습니다.")
			}
		} else {
			// 다른 데이터베이스 오류 처리
			return c.String(http.StatusInternalServerError, "데이터베이스 오류가 발생했습니다.")
		}
	}

	// JWT 토큰 생성
	auth_token, err := createJWT(user)
	if err != nil {
			return c.String(http.StatusInternalServerError, "토큰 생성에 실패하였습니다.")
	}
	
	// JWT 토큰을 리디렉션 URL에 포함하여 프론트엔드로 리디렉션
	return c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/callback?token="+auth_token)
}

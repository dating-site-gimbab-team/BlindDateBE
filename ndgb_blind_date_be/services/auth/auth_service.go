package auth

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
)

// Google 로그인 핸들러
func HandleGoogleLogin(c echo.Context) error {
	if OauthConfig == nil {
		return c.String(http.StatusInternalServerError, "OAuthConfig is not initialized")
	}
	url := OauthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

// Google 인증 콜백 핸들러
func HandleGoogleCallback(c echo.Context) error {

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
	print("testTESTES")
	defer userInfoResp.Body.Close()

	userInfo := make(map[string]interface{})
	if err := json.NewDecoder(userInfoResp.Body).Decode(&userInfo); err != nil {
		return c.String(http.StatusInternalServerError, "유저정보를 분석하는데 실패하였습니다.")
	}

	// 사용자 정보를 반환
	return c.JSON(http.StatusOK, userInfo)
}

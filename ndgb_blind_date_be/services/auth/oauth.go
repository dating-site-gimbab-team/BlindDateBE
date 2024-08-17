package auth

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

// 글로벌 oauthConfig 변수 선언
var OauthConfig *oauth2.Config

func init() {
	// .env 파일 로드
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Oauth2 설정
	OauthConfig = &oauth2.Config{
		ClientID:     os.Getenv("OAUTH2_GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("OAUTH2_GOOGLE_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("OAUTH2_GOOGLE_REDIRECT_URL"),
		Scopes: []string{
			"email",
		},
		Endpoint: google.Endpoint,
	}
}

package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"ndgb_blind_date/config"
	"ndgb_blind_date/controllers"
	"ndgb_blind_date/services/auth"
)

func main() {

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"},                  // 허용할 도메인들
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete}, // 허용할 메소드들
		AllowHeaders:     []string{"Authorization", "Content-Type"},                                    // 허용할 헤더들
		AllowCredentials: true,                                                                         // 인증 정보 포함 허용 (쿠키 등)
	}))

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// 데이터베이스 초기화
	db := config.InitDB()

	// 라우팅 설정
	userController := controllers.NewUserController(db)
	e.GET("/", userController.Hello)
	e.GET("/users", userController.GetUsers)

	e.GET("/login", auth.HandleGoogleLogin)
	e.GET("/api/auth/google", func(c echo.Context) error {
		return auth.HandleGoogleCallback(c, db)
	})
	e.Logger.Fatal(e.Start(":1323"))
}

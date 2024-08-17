package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"ndgb_blind_date/config"
	"ndgb_blind_date/controllers"
	"ndgb_blind_date/services/auth"
)

func main() {

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// 데이터베이스 초기화
	db := config.InitDB()

	// 라우팅 설정
	userController := controllers.NewUserController(db)
	e.GET("/", userController.Hello)
	e.GET("/users", userController.GetUsers)

	e.GET("/login", auth.HandleGoogleLogin)
	e.GET("/api/auth/google", auth.HandleGoogleCallback)

	e.Logger.Fatal(e.Start(":1323"))
}

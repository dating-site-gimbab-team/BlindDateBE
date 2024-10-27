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
		AllowOrigins:     []string{"http://localhost:3000"},                                            // 허용할 도메인들
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
	e.GET("/api/users", userController.GetUsers)

	e.GET("/api/login", auth.HandleGoogleLogin)
	e.GET("/api/api/auth/google", func(c echo.Context) error {
		return auth.HandleGoogleCallback(c, db)
	})

	// 프로필 컨트롤러 설정
	profileController := controllers.NewProfileController(db)
	e.POST("/api/users/:user_id/profile", profileController.CreateProfile)
	e.GET("/api/users/:user_id/profile", profileController.GetProfile)
	e.PUT("/api/users/:user_id/profile", profileController.UpdateProfile)

	likeController := controllers.NewLikeController(db)
	e.POST("/api/users/:from_user_id/like/:to_user_id", likeController.AddLike)
	e.GET("/api/users/:from_user_id/like/:to_user_id", likeController.GetLikeStatus)

	e.Logger.Fatal(e.Start(":1323"))
}

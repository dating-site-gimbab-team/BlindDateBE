package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	userServices "ndgb_blind_date/services/user"
)

type UserController struct {
	UserService *userServices.UserService
}

func NewUserController(db *gorm.DB) *UserController {
	return &UserController{
		UserService: userServices.NewUserService(db),
	}
}

func (uc *UserController) Hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

func (uc *UserController) GetUsers(c echo.Context) error {
	users, err := uc.UserService.GetUsers()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, users)
}

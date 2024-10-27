package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	"ndgb_blind_date/models"
	userProfileService "ndgb_blind_date/services/user_profile"
)

type ProfileController struct {
	ProfileService *userProfileService.ProfileService
}

func NewProfileController(db *gorm.DB) *ProfileController {
	return &ProfileController{
		ProfileService: userProfileService.NewProfileService(db),
	}
}

// 프로필 생성
func (pc *ProfileController) CreateProfile(c echo.Context) error {
	var profile models.UserProfile
	if err := c.Bind(&profile); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid request"})
	}

	createdProfile, err := pc.ProfileService.CreateProfile(&profile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to create profile"})
	}

	return c.JSON(http.StatusOK, createdProfile)
}

// 프로필 조회
func (pc *ProfileController) GetProfile(c echo.Context) error {
	userID, err := strconv.ParseUint(c.Param("user_id"), 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid user ID"})
	}

	profile, err := pc.ProfileService.GetProfile(uint(userID))
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "Profile not found"})
	}

	return c.JSON(http.StatusOK, profile)
}

// 프로필 수정
func (pc *ProfileController) UpdateProfile(c echo.Context) error {
	userID, err := strconv.ParseUint(c.Param("user_id"), 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid user ID"})
	}

	var updatedProfile models.UserProfile
	if err := c.Bind(&updatedProfile); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid request"})
	}

	updated, err := pc.ProfileService.UpdateProfile(uint(userID), &updatedProfile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to update profile"})
	}

	return c.JSON(http.StatusOK, updated)
}

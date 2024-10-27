// controllers/like_controller.go
package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	likeServices "ndgb_blind_date/services/like"
)

type LikeController struct {
	LikeService *likeServices.LikeService
}

func NewLikeController(db *gorm.DB) *LikeController {
	return &LikeController{
		LikeService: likeServices.NewLikeService(db),
	}
}

func (lc *LikeController) AddLike(c echo.Context) error {
	fromUserID, _ := strconv.ParseUint(c.Param("from_user_id"), 10, 64)
	toUserID, _ := strconv.ParseUint(c.Param("to_user_id"), 10, 64)

	var likeReq struct {
		IsLike bool `json:"is_like"`
	}
	if err := c.Bind(&likeReq); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid request"})
	}

	like, err := lc.LikeService.AddLike(uint(fromUserID), uint(toUserID), likeReq.IsLike)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Could not add like/dislike"})
	}

	return c.JSON(http.StatusOK, like)
}

func (lc *LikeController) GetLikeStatus(c echo.Context) error {
	fromUserID, _ := strconv.ParseUint(c.Param("from_user_id"), 10, 64)
	toUserID, _ := strconv.ParseUint(c.Param("to_user_id"), 10, 64)

	like, err := lc.LikeService.GetLikeStatus(uint(fromUserID), uint(toUserID))
	if err != nil {
		return c.JSON(http.StatusOK, map[string]interface{}{"status": "none"})
	}

	return c.JSON(http.StatusOK, like)
}
// services/like/like_service.go
package like

import (
	"gorm.io/gorm"

	"ndgb_blind_date/models"
)

type LikeService struct {
	DB *gorm.DB
}

func NewLikeService(db *gorm.DB) *LikeService {
	return &LikeService{DB: db}
}

func (s *LikeService) AddLike(fromUserID, toUserID uint, isLike bool) (*models.Like, error) {
	var existingLike models.Like
	err := s.DB.Where("from_user_id = ? AND to_user_id = ?", fromUserID, toUserID).First(&existingLike).Error
	if err == nil {
		// 이미 존재하는 경우 업데이트
		existingLike.IsLike = isLike
		if err := s.DB.Save(&existingLike).Error; err != nil {
			return nil, err
		}
		return &existingLike, nil
	}

	// 새로운 좋아요/싫어요 추가
	like := &models.Like{
		FromUserID: fromUserID,
		ToUserID:   toUserID,
		IsLike:     isLike,
	}
	if err := s.DB.Create(like).Error; err != nil {
		return nil, err
	}

	return like, nil
}

func (s *LikeService) GetLikeStatus(fromUserID, toUserID uint) (*models.Like, error) {
	var like models.Like
	if err := s.DB.Where("from_user_id = ? AND to_user_id = ?", fromUserID, toUserID).First(&like).Error; err != nil {
		return nil, err
	}
	return &like, nil
}

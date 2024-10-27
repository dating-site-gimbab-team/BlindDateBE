package userProfileService

import (
	"gorm.io/gorm"

	"ndgb_blind_date/models"
)

type ProfileService struct {
	DB *gorm.DB
}

func NewProfileService(db *gorm.DB) *ProfileService {
	return &ProfileService{DB: db}
}

// 프로필 생성
func (s *ProfileService) CreateProfile(profile *models.UserProfile) (*models.UserProfile, error) {
	if err := s.DB.Create(profile).Error; err != nil {
		return nil, err
	}
	return profile, nil
}

// 프로필 조회
func (s *ProfileService) GetProfile(userID uint) (*models.UserProfile, error) {
	var profile models.UserProfile
	if err := s.DB.Where("user_id = ?", userID).First(&profile).Error; err != nil {
		return nil, err
	}
	return &profile, nil
}

// 프로필 수정
func (s *ProfileService) UpdateProfile(userID uint, updatedProfile *models.UserProfile) (*models.UserProfile, error) {
	var profile models.UserProfile
	if err := s.DB.Where("user_id = ?", userID).First(&profile).Error; err != nil {
		return nil, err
	}

	profile.Name = updatedProfile.Name
	profile.Gender = updatedProfile.Gender
	profile.Age = updatedProfile.Age
	profile.ImageURL = updatedProfile.ImageURL

	if err := s.DB.Save(&profile).Error; err != nil {
		return nil, err
	}

	return &profile, nil
}

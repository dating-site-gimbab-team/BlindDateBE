package userServices

import (
	"log"

	"gorm.io/gorm"

	"ndgb_blind_date/models"
)

type UserService struct {
	DB *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{DB: db}
}

func CreateUser(db *gorm.DB, user models.User) {
	result := db.Create(&user) // 새로운 사용자 생성
	if result.Error != nil {
		log.Println("유저 생성 실패:", result.Error)
	} else {
		log.Println("유저 생성 성공:", user.ID)
	}
}

func (s *UserService) GetUsers() ([]models.User, error) {
	var users []models.User
	result := s.DB.Find(&users)
	return users, result.Error
}

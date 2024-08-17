package config

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"ndgb_blind_date/models"
)

func InitDB() *gorm.DB {
	// dsn := "root:test1234!!!@tcp(blind-date-db:3306)/blind_date?charset=utf8mb4&parseTime=True&loc=Local"
	dsn := "root:test1234!!!@tcp(localhost:3306)/blind_date?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database: ", err)
	}

	// 모델 마이그레이션
	db.AutoMigrate(&models.User{})
	return db
}

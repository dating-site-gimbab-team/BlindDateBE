package models

type User struct {
    ID    uint   `json:"id" gorm:"primaryKey"`
    Email string `json:"email"`
    PictureUrl string `json:"picture_url"`
    Oauth2Id string `json:"oauth2_id"`
    Clinet string `json:"clinet"`
}

type UserProfile struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	UserID    uint   `json:"user_id" gorm:"unique"` // User와 UserProfile의 1:1 관계를 위한 외래 키
	Name      string `json:"name"`
	Gender    string `json:"gender"`
	Age       int    `json:"age"`
	ImageURL  string `json:"image_url"` // 공개용 프로필 이미지
	Likes      []Like `gorm:"many2many:user_likes;"`
}

type Like struct {
	ID         uint `json:"id" gorm:"primaryKey"`
	IsLike     bool `json:"is_like"`
	FromUserID uint `json:"from_user_id"`
	ToProfileID uint `json:"to_profile_id"` // 좋아요를 받은 프로필
}
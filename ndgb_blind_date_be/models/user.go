package models

type User struct {
    ID    uint   `json:"id" gorm:"primaryKey"`
    Name  string `json:"name"`
    Email string `json:"email"`
    PictureUrl string `json:"picture_url"`
    Oauth2Id string `json:"oauth2_id"`
    Clinet string `json:"clinet"`
    Likes      []Like `gorm:"many2many:user_likes;"`
}

type Like struct {
    ID     uint `json:"id" gorm:"primaryKey"`
    IsLike bool `json:"is_like"`
    FromUserID uint `json:"from_user_id"`
    ToUserID uint `json:"to_user_id"` 
}
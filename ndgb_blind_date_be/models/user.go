package models

type User struct {
    ID    uint   `json:"id" gorm:"primaryKey"`
    Name  string `json:"name"`
    Email string `json:"email"`
    PictureUrl string `json:"picture_url"`
    Oauth2Id string `json:"oauth2_id"`
    Clinet string `json:"clinet"`
}

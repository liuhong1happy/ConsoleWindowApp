package userModel

import (
	"gopkg.in/mgo.v2/bson"
)

//** TYPES
type (
	UserInfo struct {
		ID        bson.ObjectId `bson:"_id,omitempty"`
		UserName     string `bson:"user_name" json:"user_name"`
		UserEmail string     `bson:"user_email" json:"user_email"`
		UserMobile      string `bson:"user_mobile" json:"user_mobile"`
        UserPwd string  `bson:"user_pwd" json:"user_pwd"`
	}
)
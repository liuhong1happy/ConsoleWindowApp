package userApplicationModel

import (
	"gopkg.in/mgo.v2/bson"
)
	
UserApplication struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	AppID  string  `bson:"app_id" json:"app_id"`
	VersionID      string    `bson:"version_id" json:"version_id"`,
    AppSettings string `bson:"app_settings" json:"app_settings"`,
}

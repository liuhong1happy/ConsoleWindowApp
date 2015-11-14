package devAppliactionModel

import (
	"gopkg.in/mgo.v2/bson"
)
	
DevApplication struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	AppName  string  `bson:"app_name" json:"app_name"`
	AppContent      string    `bson:"app_content" json:"app_content"`
    CanUse bool  `bson:"can_use" json:"can_use"`
    CurrentVersionID  string  `bson:"current_version_id" json:"current_version_id"`
}

DevApplicationVersion struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	AppID  string        `bson:"app_id" json:"app_id"`
	VersionName string `bson:"version_name" json:"version_name"`
	VersionContent string `bson:"version_content" json:"version_content"`
    AppSettings string  `bson:"app_settings" json:"app_settings"`
    CanUse bool  `bson:"can_use" json:"can_use"`
}

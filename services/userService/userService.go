package userService

import (
	"github.com/liuhong1happy/ConsoleWindowApp/models/userModel"
	"github.com/liuhong1happy/ConsoleWindowApp/services"
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/helper"
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/mongo"
	log "github.com/goinggo/tracelog"
	"github.com/kelseyhightower/envconfig"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//** TYPES

type (
	// buoyConfiguration contains settings for running the buoy service.
	userConfiguration struct {
		Database string
	}
)

//** PACKAGE VARIABLES

// Config provides buoy configuration.
var Config userConfiguration

//** INIT

func init() {
	// Pull in the configuration.
	if err := envconfig.Process("winapp", &Config); err != nil {
		log.CompletedError(err, helper.MainGoRoutine, "Init")
	}

}

func FindUserById(service *services.Service,userID string) (*userModel.UserInfo,error){
    log.Startedf(service.UserID, "FindUser", "userID[%s]", userID)
    var userInfo userModel.UserInfo
	f := func(collection *mgo.Collection) error {
		queryMap := bson.M{"_id": userID}

		log.Trace(service.UserID, "FindUser", "MGO : db.user_infos.find(%s).limit(1)", mongo.ToString(queryMap))
		return collection.Find(queryMap).One(&userInfo)
	}
    
	if err := service.DBAction(Config.Database, "user_infos", f); err != nil {
		if err != mgo.ErrNotFound {
			log.CompletedError(err, service.UserID, "FindUser")
			return nil, err
		}
	}

	log.Completedf(service.UserID, "FindUser", "userInfo%+v", &userInfo)
	return &userInfo, nil
}


func FindUserByName(service *services.Service,userName string) (*userModel.UserInfo,error){
    log.Startedf(service.UserID, "FindUserByName", "userName[%s]", userName)
    var userInfo userModel.UserInfo
	f := func(collection *mgo.Collection) error {
        queryMap := bson.M{
            "$or": []bson.M{
                bson.M{"user_name": userName},
                bson.M{"user_email":userName},
                bson.M{"user_mobile":userName},
            },
        }
		log.Trace(service.UserID, "FindUserByName", "MGO : db.user_infos.find(%s).limit(1)", mongo.ToString(queryMap))
		return collection.Find(queryMap).One(&userInfo)
	}
    
	if err := service.DBAction(Config.Database, "user_infos", f); err != nil {
		if err != mgo.ErrNotFound {
			log.CompletedError(err, service.UserID, "FindUserByName")
			return nil, err
		}
	}

	log.Completedf(service.UserID, "FindUserByName", "userInfo%+v", &userInfo)
	return &userInfo, nil
}

func UserLogin(service *services.Service,firstPara string,userPwd string) (*userModel.UserInfo,error){
    log.Startedf(service.UserID, "UserLogin", "user[%s]", firstPara)
    var userInfo userModel.UserInfo
	f := func(collection *mgo.Collection) error {
        queryMap := bson.M{
            "$or": []bson.M{
                bson.M{"user_name": firstPara},
                bson.M{"user_email":firstPara},
                bson.M{"user_mobile":firstPara},
            },
            "user_pwd": userPwd,
        }
		log.Trace(service.UserID, "UserLogin", "MGO : db.user_infos.find(%s).limit(1)", mongo.ToString(queryMap))
		return collection.Find(queryMap).One(&userInfo)
	}
	if err := service.DBAction(Config.Database, "user_infos", f); err != nil {
		if err != mgo.ErrNotFound {
			log.CompletedError(err, service.UserID, "UserLogin")
			return nil, err
		}
	}
	log.Completedf(service.UserID, "UserLogin", "userInfo%+v", &userInfo)
	return &userInfo, nil
}

func UserLogup(service *services.Service,userInfo userModel.UserInfo) (*userModel.UserInfo,error){
    log.Startedf(service.UserID, "UserLogup", "user[%s]", userInfo.UserName)
	f := func(collection *mgo.Collection) error {
		log.Trace(service.UserID, "UserLogup", "MGO : db.user_infos.insert(%s)", mongo.ToString(userInfo))
		return collection.Insert(&userInfo)
	}
	if err := service.DBAction(Config.Database, "user_infos", f); err != nil {
		if err != mgo.ErrNotFound {
			log.CompletedError(err, service.UserID, "UserLogup")
			return nil, err
		}
	}
	log.Completedf(service.UserID, "UserLogup", "userInfo%+v", &userInfo)
	return &userInfo, nil
}







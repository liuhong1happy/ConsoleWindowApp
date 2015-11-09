package settingsService

import (
	"github.com/liuhong1happy/ConsoleWindowApp/models/settingsModel"
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
	settingsConfiguration struct {
		Database string
	}
)

//** PACKAGE VARIABLES

// Config provides buoy configuration.
var Config settingsConfiguration

//** INIT

func init() {
	// Pull in the configuration.
	if err := envconfig.Process("winapp", &Config); err != nil {
		log.CompletedError(err, helper.MainGoRoutine, "Init")
	}
}

func FindSettings(service *services.Service, userID string) (*settingsModel.WinSettings, error) {
	log.Startedf(service.UserID, "FindSettings", "userID[%s]", userID)

	var winSettings settingsModel.WinSettings
	f := func(collection *mgo.Collection) error {
		queryMap := bson.M{"user_id": userID}

		log.Trace(service.UserID, "FindSettings", "MGO : db.win_settings.find(%s).limit(1)", mongo.ToString(queryMap))
		return collection.Find(queryMap).One(&winSettings)
	}

	if err := service.DBAction(Config.Database, "win_settings", f); err != nil {
		if err != mgo.ErrNotFound {
			log.CompletedError(err, service.UserID, "FindSettings")
			return nil, err
		}
	}

	log.Completedf(service.UserID, "FindSettings", "winSettings%+v", &winSettings)
	return &winSettings, nil
}

func SaveSettings(service *services.Service,settings settingsModel.WinSettings) (*settingsModel.WinSettings,error){
    log.Startedf(service.UserID, "SaveSettings", "UserID[%s]", settings.UserID)
	f := func(collection *mgo.Collection) error {
		
        if len(settings.ID)>0{
            log.Trace(service.UserID, "SaveSettings", "MGO : db.win_settings.update(%s)", mongo.ToString(settings))
            return collection.Update(bson.M{"_id": settings.ID}, &settings)
        }else{
            log.Trace(service.UserID, "SaveSettings", "MGO : db.win_settings.insert(%s)", mongo.ToString(settings))
            return collection.Insert(&settings)
        }
		
	}
	if err := service.DBAction(Config.Database, "win_settings", f); err != nil {
		if err != mgo.ErrNotFound {
			log.CompletedError(err, service.UserID, "SaveSettings")
			return nil, err
		}
	}
	log.Completedf(service.UserID, "SaveSettings", "settings%+v", &settings)
	return &settings, nil
}


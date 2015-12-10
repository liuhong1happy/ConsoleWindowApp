// Copyright 2013 Ardan Studios. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE handle.

// Package buoyService implements the service for the buoy functionality.
package buoyService

import (
	"github.com/liuhong1happy/ConsoleWindowApp/models/fileModels"
	"github.com/liuhong1happy/ConsoleWindowApp/services"
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/helper"
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/mongo"
	log "github.com/goinggo/tracelog"
	"github.com/kelseyhightower/envconfig"
	"gopkg.in/mgo.v2"
)

//** TYPES

type (
	fileConfiguration struct {
		Database string
	}
)

//** PACKAGE VARIABLES

// Config provides buoy configuration.
var Config fileConfiguration

//** INIT

func init() {
	// Pull in the configuration.
	if err := envconfig.Process("winapp", &Config); err != nil {
		log.CompletedError(err, helper.MainGoRoutine, "Init")
	}
}

//** PUBLIC FUNCTIONS

// FindStation retrieves the specified station
func SaveFile(service *services.Service, fileInfo fileModels.FileInfo) (*fileModels.FileInfo, error) {
	log.Startedf(service.UserID, "SaveFile", "FileHash[%s]", fileInfo.FileHash)

    
	f := func(collection *mgo.Collection) error {
		log.Trace(service.UserID, "SaveFile", "MGO : db.file_infos.insert(%s)", mongo.ToString(fileInfo))
		return collection.Insert(&fileInfo)
	}
	if err := service.DBAction(Config.Database, "file_infos", f); err != nil {
		if err != mgo.ErrNotFound {
			log.CompletedError(err, service.UserID, "SaveFile")
			return nil, err
		}
	}

	log.Completedf(service.UserID, "SaveFile", "fileInfo%+v", &fileInfo)
	return &fileInfo, nil
}

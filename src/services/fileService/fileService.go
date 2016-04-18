// Copyright 2013 Ardan Studios. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE handle.

// Package buoyService implements the service for the buoy functionality.
package fileService

import (
	"github.com/liuhong1happy/ConsoleWindowApp/models/fileModels"
	"github.com/liuhong1happy/ConsoleWindowApp/services"
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/helper"
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/mongo"
	log "github.com/goinggo/tracelog"
	"github.com/kelseyhightower/envconfig"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type (
	fileConfiguration struct {
		Database string
	}
)
var Config fileConfiguration

func init() {
	if err := envconfig.Process("winapp", &Config); err != nil {
		log.CompletedError(err, helper.MainGoRoutine, "Init")
	}
}

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


func FindFileByHash(service *services.Service,hash string)(*fileModels.FileInfo, error){
    var fileInfo fileModels.FileInfo
    
	f := func(collection *mgo.Collection) error {
		queryMap := bson.M{ "file_hash": hash }

		log.Trace(service.UserID, "findFileByHash", "MGO : db.file_infos.find(%s).limit(1)", mongo.ToString(queryMap))
		return collection.Find(queryMap).One(&fileInfo)
	}
    
	if err := service.DBAction(Config.Database, "file_infos", f); err != nil {
		if err != mgo.ErrNotFound {
			log.CompletedError(err, service.UserID, "findFileByHash")
			return nil, err
		}
	}

	log.Completedf(service.UserID, "findFileByHash", "fileInfo%+v", &fileInfo)
	return &fileInfo, nil
    
}

func FindFilesByHash(service *services.Service,hash string)(*fileModels.FileInfo, error){
    var fileInfo fileModels.FileInfo
    
	f := func(collection *mgo.Collection) error {
		queryMap := bson.M{ "file_hash": hash }

		log.Trace(service.UserID, "findFilesByHash", "MGO : db.file_infos.find(%s).limit(1)", mongo.ToString(queryMap))
		return collection.Find(queryMap).One(&fileInfo)
	}
    
	if err := service.DBAction(Config.Database, "file_infos", f); err != nil {
		if err != mgo.ErrNotFound {
			log.CompletedError(err, service.UserID, "findFilesByHash")
			return nil, err
		}
	}

	log.Completedf(service.UserID, "findFilesByHash", "fileInfo%+v", &fileInfo)
	return &fileInfo, nil
    
}

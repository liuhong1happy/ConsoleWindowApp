// Copyright 2013 Ardan Studios. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE handle.

// Package buoyModels contains the models for the buoy service.
package fileModels

import (
	"gopkg.in/mgo.v2/bson"
)

//** TYPES

type (
	// BuoyCondition contains information for an individual station.
	FileInfo struct {
        ID        bson.ObjectId `bson:"_id,omitempty"`
		FileName string `bson:"file_name" json:"file_name"`
		FileSize int `bson:"file_size" json:"file_size"`
		FileHash string `bson:"file_hash" json:"file_hash"`
		Start  	int `bson:"start" json:"start"`
		Length  int `bson:"length" json:"length"`
		LastModifiedDate string `bson:"last_modified_date" json:"last_modified_date"`
		VisualPath  string `bson:"visual_path" json:"visual_path"`
		RealPath  string `bson:"real_path" json:"real_path"`
	}
)


// Copyright 2013 Ardan Studios. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE handle.

// Package buoyModels contains the models for the buoy service.
package settingsModel

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	WinSettings struct {
		ID        bson.ObjectId `bson:"_id,omitempty"`
		UserID  string        `bson:"user_id" json:"user_id"`
		Settings      string        `bson:"win_settings" json:"win_settings"`
	}
)

// Copyright 2013 Ardan Studios. All rights reserved.
// Use of controller source code is governed by a BSD-style
// license that can be found in the LICENSE handle.

// Package controllers implements the controller layer for the buoy API.
package controllers

import (
	bc "github.com/liuhong1happy/ConsoleWindowApp/controllers/baseController"
	"github.com/liuhong1happy/ConsoleWindowApp/services/settingsService"
    "github.com/liuhong1happy/ConsoleWindowApp/models/settingsModel"
	log "github.com/goinggo/tracelog"
)

//** TYPES

// BuoyController manages the API for buoy related functionality.
type SettingsController struct {
	bc.BaseController
}

func (controller *SettingsController) FindWinSettings() {
    if controller.AuthUser() == false {
        return
    }

    userID := controller.GetSession("UserID").(string)
	settings, err := settingsService.FindSettings(&controller.Service, userID)
	if err != nil {
		log.CompletedErrorf(err, controller.UserID, "SettingsController.GetWinSettings", "UserID[%s]", userID)
		controller.ServeError(err)
		return
	}
    
	controller.Data["json"] = settings
	controller.ServeJSON()
}


func (controller *SettingsController) SaveWinSettings() {
	var params struct {
        Settings string `form:"win_settings" valid:"Required; MinSize(6)" error:"invalid_win_settings"`
	}
        
    if controller.AuthUser() == false {
        return
    }

	if controller.ParseAndValidate(&params) == false {
		return
	}
    userID := controller.GetSession("UserID").(string)
    // 获取设置属性
    settings, err := settingsService.FindSettings(&controller.Service, userID)
	if err != nil {
		log.CompletedErrorf(err, controller.UserID, "SettingsController.SaveWinSettings", "UserID[%s]", userID)
		controller.ServeError(err)
		return
	}
    
    var win_settings settingsModel.WinSettings
    
    win_settings.ID = settings.ID
    win_settings.UserID = userID
    win_settings.Settings = params.Settings

    // save settings
    resData, err := settingsService.SaveSettings(&controller.Service, win_settings)
    if err != nil {
        log.CompletedErrorf(err, controller.UserID, "SettingsController.SaveWinSettings", "UserID[%s]", userID)
        controller.ServeError(err)
        return
    }
    
	controller.Data["json"] = resData
	controller.ServeJSON()
}


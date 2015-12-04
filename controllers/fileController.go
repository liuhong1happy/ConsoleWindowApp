// Copyright 2013 Ardan Studios. All rights reserved.
// Use of controller source code is governed by a BSD-style
// license that can be found in the LICENSE handle.

// Package controllers implements the controller layer for the buoy API.
package controllers

import (
	bc "github.com/liuhong1happy/ConsoleWindowApp/controllers/baseController"
	"github.com/liuhong1happy/ConsoleWindowApp/services/fileService"
	log "github.com/goinggo/tracelog"
)

//** TYPES

// BuoyController manages the API for buoy related functionality.
type UploadFileController struct {
	bc.BaseController
}


func (controller *UploadFileController) GetHashFile() {
	// The call to ParseForm inside of ParseAndValidate is failing. This is a BAD FIX
	params := struct {
		Hash string `form:":hash" valid:"Required; MinSize(4)" error:"not hash"`
	}{controller.GetString(":hash")}

	if controller.ParseAndValidate(&params) == false {
		return
	}

	fileInfo, err := fileService.findFileByHash(&controller.Service, params.Hash)
	if err != nil {
		log.CompletedErrorf(err, controller.UserID, "File", "Hash[%s]", params.Hash)
		controller.ServeError(err)
		return
	}

	controller.Data["json"] = fileInfo
	controller.ServeJson()
}

func (controller *UploadFileController) GetHashFiles() {
	// The call to ParseForm inside of ParseAndValidate is failing. This is a BAD FIX
	params := struct {
		HashArray string `form:":hash_array" valid:"Required; MinSize(4)" error:"not hash array"`
	}{controller.GetString(":hash_array")}

	if controller.ParseAndValidate(&params) == false {
		return
	}

	filesInfo, err := fileService.findFilesByHash(&controller.Service, params.HashArray)
	if err != nil {
		log.CompletedErrorf(err, controller.UserID, "Files", "HashArray[%s]", params.HashArray)
		controller.ServeError(err)
		return
	}

	controller.Data["json"] = filesInfo
	controller.ServeJson()
}

func (controller *UploadFileController) UploadFile(){
	var params struct {
		FileName string `form:"file_name" valid:"Required; MinSize(4)" error:"invalid_file_name"`
        FileHash string `form:"file_hash" valid:"Required; MinSize(6)" error:"invalid_file_hash"`
		FileSize string `form:"file_size" valid:"Required;" error:"invalid_file_size"`
        Start string `form:"start" valid:"Required;" error:"invalid_start"`
        Length string `form:"length" valid:"Required;" error:"invalid_length"`
        LastModifiedDate string `form:"last_modified_date" valid:"Required;" error:"invalid_last_modified_date"`
        VisualPath  string `form:"visual_path" valid:"Required;" error:"invalid_visual_path"`
	}

	if controller.ParseAndValidate(&params) == false {
		return
	}
    var file_path = "/var/files/"+params.lastModifiedDate+"/"+params.FileHash;
    
    File,FileHeader,error = this.GetFile("file")
    // 做后续的处理
    
    
    
}


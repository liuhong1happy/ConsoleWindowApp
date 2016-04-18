package controllers

import (
	bc "github.com/liuhong1happy/ConsoleWindowApp/controllers/baseController"
	"github.com/liuhong1happy/ConsoleWindowApp/services/userService"
	log "github.com/goinggo/tracelog"
)

type UserController struct {
	bc.BaseController
}

func (controller *UserController) UserLogin() {
	var params struct {
		UserName string `form:"user_name" valid:"Required; MinSize(4)" error:"invalid_user_name"`
        UserPwd string `form:"user_pwd" valid:"Required; MinSize(6)" error:"invalid_user_pwd"`
	}

	if controller.ParseAndValidate(&params) == false {
		return
	}

	userInfo, err := userService.UserLogin(&controller.Service, params.UserName,params.UserPwd)
	if err != nil {
		log.CompletedErrorf(err, controller.UserID, "UserController.UserLogin", "UserName[%s]", params.UserName)
		controller.ServeError(err)
		return
	}

    // set session
    if len(userInfo.ID)>0{
        log.Trace("UserController","UserLogin","userID[%s]",userInfo.ID.Hex())
        controller.SetSession("UserID", userInfo.ID.Hex())
    }
	controller.Data["json"] = userInfo
	controller.ServeJSON()
}
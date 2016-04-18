package routers

import (
	"github.com/liuhong1happy/ConsoleWindowApp/controllers"
	"github.com/astaxie/beego"
)
func init() {
    beego.Router("/", &controllers.HomeController{})
    beego.Router("/v1/u/login", &controllers.UserController{}, "post:UserLogin")
    beego.Router("/v1/u/settings", &controllers.SettingsController{}, "get:FindWinSettings")
    beego.Router("/v1/u/settings", &controllers.SettingsController{}, "post:SaveWinSettings")
}
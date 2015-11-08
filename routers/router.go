package routers

import (
	"github.com/liuhong1happy/ConsoleWindowApp/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.HomeController{})
    beego.Router("/v1/u/login", new(controllers.UserController), "post:UserLogin")
}

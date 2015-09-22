package routers

import (
	"github.com/liuhong1happy/ConsoleWindowApp/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
}

package controllers

import (
	"github.com/astaxie/beego"
)

//** TYPES

// BuoyController manages the API for buoy related functionality.
type HomeController struct {
	beego.Controller
}

func (c *HomeController) Get() {
	c.TplName = "index.html"
    c.Render()
}

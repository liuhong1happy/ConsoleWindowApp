package main

import (
	"github.com/astaxie/beego"
	"github.com/liuhong1happy/ConsoleWindowApp/localize"
	_ "github.com/liuhong1happy/ConsoleWindowApp/routers"
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/helper"
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/mongo"
    "github.com/goinggo/tracelog"
    _ "github.com/astaxie/beego/session/redis" 
	"os"
)

func main() {
	tracelog.Start(tracelog.LevelTrace)

	// Init mongo
	tracelog.Started("main", "Initializing Mongo")
	err := mongo.Startup(helper.MainGoRoutine)
	if err != nil {
		tracelog.CompletedError(err, helper.MainGoRoutine, "initApp")
		os.Exit(1)
	}

	// Load message strings
	localize.Init("en-US")
    
    beego.SessionOn = true
    beego.SessionProvider = "redis"
    beego.SessionSavePath = "192.168.1.10:6379"
    
	beego.Run()

	tracelog.Completed(helper.MainGoRoutine, "Website Shutdown")
	tracelog.Stop()
}
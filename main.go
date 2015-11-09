package main

import (
	"github.com/astaxie/beego"
	"github.com/liuhong1happy/ConsoleWindowApp/localize"
	_ "github.com/liuhong1happy/ConsoleWindowApp/routers"
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/helper"
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/mongo"
	_ "github.com/astaxie/beego/session/redis" 
	"github.com/liuhong1happy/ConsoleWindowApp/utilities/session"
    	"github.com/goinggo/tracelog"
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
    
    	SessionConfig,err := session.GetSessionConfig("session")
    
        tracelog.Trace("main", "SessionConfig", "Session : On[%v]", SessionConfig.On)
        tracelog.Trace("main", "SessionConfig", "Session : On[%v]", SessionConfig.Provider)
        tracelog.Trace("main", "SessionConfig", "Session : On[%v]", SessionConfig.SavePath)
    
    	beego.SessionOn = SessionConfig.On
    	beego.SessionProvider = SessionConfig.Provider
    	beego.SessionSavePath = SessionConfig.SavePath
    
        beego.Run()

        tracelog.Completed(helper.MainGoRoutine, "Website Shutdown")
        tracelog.Stop()
}

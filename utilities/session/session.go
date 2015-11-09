package session

import (
  	log "github.com/goinggo/tracelog"
	  "github.com/kelseyhightower/envconfig"
)

type (
	SessionConfiguration struct {
		On    bool
		Provider string
		SavePath string
	}
}

func getSessionConfig(sessionType string) SessionConfiguration{
	log.Started(sessionType, "getSessionConfig")

	// Pull in the configuration.
	var config SessionConfiguration
	if err := envconfig.Process(sessionType, &config); err != nil {
		log.CompletedError(err, sessionType, "getSessionConfig")
		return err
	}
	
	log.Completed(sessionType, "getSessionConfig")
	return config
}

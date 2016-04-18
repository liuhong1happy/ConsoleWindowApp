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
)

func GetSessionConfig(sessionType string) (*SessionConfiguration,error) {
	log.Started(sessionType, "GetSessionConfig")

	// Pull in the configuration.
	var config SessionConfiguration
	if err := envconfig.Process(sessionType, &config); err != nil {
		log.CompletedError(err, sessionType, "GetSessionConfig")
		return nil, err
	}
	
	log.Completed(sessionType, "GetSessionConfig")
	return &config, nil
}

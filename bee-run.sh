export MGO_HOSTS=192.168.1.10
export MGO_DATABASE=admin
export MGO_USERNAME=mongo
export MGO_PASSWORD=123456
export WINAPP_DATABASE=winapp
export SESSION_ON=true
export SESSION_PROVIDER=redis
export SESSION_SAVEPATH=192.168.1.10:6379

cd $GOPATH/src/github.com/liuhong1happy/ConsoleWindowApp
go clean -i
go build

bee run watchall

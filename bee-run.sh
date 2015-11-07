export MGO_HOSTS=192.168.1.10
export MGO_DATABASE=admin
export MGO_USERNAME=mongo
export MGO_PASSWORD=123456
export APP_DATABASE= winapp


cd $GOPATH/src/github.com/liuhong1happy/ConsoleWindowApp
go clean -i
go build

bee run watchall
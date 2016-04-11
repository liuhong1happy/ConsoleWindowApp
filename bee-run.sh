export MGO_URL=mongodb://mongo:123456@127.0.0.1:27017/admin
export WINAPP_DATABASE=winapp
export SESSION_ON=true
export SESSION_PROVIDER=redis
export SESSION_SAVEPATH=127.0.0.1:6379

cd $GOPATH/src/github.com/liuhong1happy/ConsoleWindowApp
go clean -i
go build

bee run watchall

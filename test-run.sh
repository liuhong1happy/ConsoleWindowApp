export MGO_HOSTS=192.168.1.10
export MGO_DATABASE=admin
export MGO_USERNAME=mongo
export MGO_PASSWORD=123456
export WINAPP_DATABASE=winapp


cd $GOPATH/src/github.com/liuhong1happy/ConsoleWindowApp/tests/serviceTests
go test -v
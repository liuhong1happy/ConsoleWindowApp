package serviceTests

import (
	"testing"
	"github.com/liuhong1happy/ConsoleWindowApp/services/userService"
	. "github.com/smartystreets/goconvey/convey"
    "github.com/liuhong1happy/ConsoleWindowApp/models/userModel"
)

// Test_Station checks the station service call is working
func TestUserService(t *testing.T) {
	service := Prepare()
	defer Finish(service)

    var userInfo userModel.UserInfo
    userInfo.UserName = "admin"
    userInfo.UserPwd = "123456"


	data,err := userService.UserLogup(service, userInfo)
    Convey("Subject: Test User Service", t, func() {
        Convey("Should Have User Data", func() {
            So(len(data.ID), ShouldBeGreaterThan, 0)
        })
    })
    
}

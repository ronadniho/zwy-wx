
const __GlobalInfo = require('../../utils/config.js')

const util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    __GlobalInfo: __GlobalInfo,
    timestamp: "",
    username: "",
    safecode: "",
    mobile: "",
    vifycode: "",
    logname: "",
    password: "",
    countdown: 60,
    countstart: 0,
    countStr: "发送验证码",
    curInterval: 0
  },
  onLoad: function (option) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F14141'
    })
    wx.setNavigationBarTitle({
      title: "账号激活"
    })

    if (option.logname) {
      this.setData({
        logname: option.ogname
      })
    }

    if (option.password) {
      this.setData({
        password: option.password
      })
    }

    //验证码时间戳
    var timestamp = Date.parse(new Date());
    this.setData({
      timestamp: timestamp
    })

  },
  onReady: function () {

    let that = this;

  },
  //更新验证码
  verfiyCode: function () {
    var timestamp = Date.parse(new Date());
    this.setData({
      timestamp: timestamp
    })
  },
  //激活
  activeAccount: function () {

    let username = this.data.username;
    let safecode = this.data.safecode;
    let mobile = this.data.mobile;
    let vifycode = this.data.vifycode;

    console.log(username);
    console.log(safecode);
    console.log(mobile);
    console.log(vifycode);



    var callback = function (res) {
      if (res.result == "true"){
        if (res.index  == "0"){
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000,
            success: function () {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        }
        else{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000,
            success: function () {
              
            }
          })
        }
      }
      else{
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000,
          success: function () {
            
          }
        })
      }
    }

    util.getServerData({
      loginObj: { logname: this.data.logname, password: this.data.password, inputyzmcode: "" },
      activeObj: { name: username, inputyzmcode: safecode, inputsmscode: vifycode, cellphone: mobile }
    }, "api/Active", function (result) {
      console.log(result);
      callback(result);
    });

  },
  inputUser: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  inputSafetyCode: function (e) {
    this.setData({
      safecode: e.detail.value
    })
  },
  inputMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  inputVerificationCode: function (e) {
    this.setData({
      vifycode: e.detail.value
    })
  },
  sendVify: function (e) {
    let that = this;
    if (that.data.countstart == 0) {
      this.setData({
        countstart: 1
      })
      //后台交互逻辑开始

      //后台交互逻辑结束

      let curInterval = setInterval(() => {
        let countdown = that.data.countdown;
        countdown--;
        let countStr = countdown + "秒后重新发送";
        this.setData({
          countdown: countdown,
          countStr: countStr
        })

        if (countdown == 0) {
          this.setData({
            countdown: 60,
            countStr: "发送验证码",
            curInterval: curInterval,
            countstart: 0
          })
          clearInterval(that.data.curInterval);
        }

      }, 1000);
    }
  }
})

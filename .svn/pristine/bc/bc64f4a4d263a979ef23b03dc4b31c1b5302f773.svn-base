var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
var Base64 = require('../../utils/base64.js');

const app = getApp()

Page({
  data: {
    mobile: "",
    password: ""
  },
  onLoad: function () {
    let that = this;
    wx.setStorageSync("welcome", "1");

  },
  //登录
  login: function () {
    let that = this;

    if (util.isBlank(that.data.mobile)) {
      wx.showToast({
        title: '手机号不可为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (util.isBlank(that.data.password)) {
      wx.showToast({
        title: '密码不可为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    let mobile = that.data.mobile;
    let password = that.data.password;

    let base64_pwd = Base64.CusBASE64.encoder(password);
    console.log(base64_pwd)
    wx.showLoading({
      title: '正在登录中',
    })


    wx.request({
      url: __GlobalInfo.postUrl + 'api/Login',
      data: {
        clienttype: 'wechatapp',
        logname: mobile,
        password: base64_pwd,
        inputyzmcode: ''
      },
      method: "POST",
      header: getApp().globalData.header,
      success: function (res) {
        console.log(res); 
        wx.hideLoading();
        if (res.statusCode === 200) {

          switch (res.data.index) {
            case 0:
              if (res.data.result) {

                wx.setStorage({
                  key: "loginUser",
                  data: res.data.loginUser,
                  complete: function (e) {
                    wx.showToast({
                      title: res.data.message,
                      icon: 'none',
                      duration: 2000,
                      success: function () {
                        wx.switchTab({
                          url: '/pages/electiveCourse/electiveCourse'
                        })
                      }
                    })
                  }
                })

              }
              else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000,
                  success: function () {
                   
                  }
                })
              }

              break;
            case -1:
              wx.navigateTo({
                url: "/pages/index/index?logname=" + that.data.mobile + "&password=" + that.data.password
              })
              break;
            case 2:
              break;
            default:
              wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 2000
              })
              break;
          }

        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          })
        }

      },
      fail: function (response) {
        console.log(response);
        wx.hideLoading();
      }
    })

  },
  storeSession: function () {
    let that = this;


  },
  //监控手机号
  inputUser: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  //监控密码
  inputPwd: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  otherClick: function () {

    var that = this;
    util.getServerData({
      "clienttype": "wap",
    }, "api/GetUnifyAccountLoginUrl", function (result) {
      console.log(result);
      if (result.status) {
        wx.navigateTo({
          url: '/pages/login/other?url=' + result.result
        })
      }
    });


  }
})

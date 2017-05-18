//app.js
App({
  // onLaunch: function () {
  //   //调用API从本地缓存中获取数据
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  // },

  onLaunch: function () {
    var that = this;
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.winHeight = res.windowHeight
      }
    })
    that.getUserInfoSync()
  },
  getUserInfoSync: function (cb, cb1) {
    var that = this;
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo);
    } else {
      // 用户登录
      if (wx.getStorageSync('sessionId')) {
        if (wx.getStorageSync('autoLogin')) {
          that.getUserInfo(function (userInfo) {
            //  that.setData({ userInfo: userInfo })
            that.globalData.userInfo = userInfo
            typeof cb == "function" && cb(userInfo);
          })
        } else {
          typeof cb1 == "function" && cb1();
        }
      } else {
        // that.login()
        typeof cb1 == "function" && cb1();
      }
    }
  },
  getRequest: function (url, data, doSuccess, doFail, doComplete) {
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log('-------success-------')
        if (typeof doSuccess == "function")
          res.statusCode === 200 && doSuccess(res.data)
      },
      fail: function () {
        console.log('-------fail-------')
        wx.showToast({
          title: '网络请求异常',
          icon: 'success',
          duration: 2000
        })
        typeof doFail == "function" && doFail()
      },
      complete: function () {
        console.log('-------complete-------')
        typeof doComplete == "function" && doComplete()
      }
    })
  },
  login: function (cb) {
    console.log('-------getSessionForWeChat-------')
    var that = this;

    // 获取Code
    wx.login({
      success: function (res) {
        if (res.code) {
          // 使用Code获取session_key、openid，服务端存储后返回sessionId
          that.getRequest(
            'weChat/getSessionForWeChat',
            { code: res.code },
            function (result) {
              if (result.status === '0') {
                wx.setStorageSync('sessionId', result.msg.thirdSession);
                wx.setStorageSync('openId', result.msg.openID);

                typeof cb == "function" && cb()
              } else {
                console.log(result)
              }
            }
          )
        }
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
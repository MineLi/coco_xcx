// pages/user/user.js
var app = getApp()
Page({
  data: {
    userInfo: null
  },
  toOrder: function (e) {
    var name = e.target.dataset.name
    wx.navigateTo({
      url: '/pages/myOrder/myOrder?name=' + name
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (!app.globalData.userInfo) {
      wx.login({//login流程
        success: function (res) {//登录成功
          if (res.code) {
            var code = res.code;
            wx.getUserInfo({//getUserInfo流程
              success: function (res2) {//获取userinfo成功
                console.log(res2);
                var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
                app.globalData.userInfo = res2.userInfo
                that.setData({
                  userInfo: app.globalData.userInfo
                });
                console.log(app.globalData.userInfo);
                var iv = res2.iv;
                //请求自己的服务器
                // Login(code, encryptedData, iv);
              }
            })

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    } else {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
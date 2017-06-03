// pages/orderConfirm/orderConfirm.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var commodityId = options.commodityId;
    console.log(commodityId);
    this.setData({
      commodityId: commodityId
    })
    this.getCommodity(commodityId)

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getCommodity: function (commodityId) {
    var that = this;
    var time = this.formatDate(new Date());
    this.setData({
      timeStamp: time
    })
    app.getRequest(
      'https://xcx001.69yt.com/index.php/item/index/getItemInfoById',
      {
        pid: commodityId
      },
      function (res) {
        console.log(res);
        that.setData({
          commodityDetail: res[0],
        })
        // WxParse.wxParse('desc', 'html', that.data.desc, that, 0);
      }
    )
  },
  formatDate: function (now) {
    var year = now.getFullYear(),
      month = now.getMonth() + 1,
      date = now.getDate(),
      hour = now.getHours(),
      minute = now.getMinutes(),
      second = now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  },
  updateName: function (e) {
    var name = e.detail.value
    this.setData({
      name: name
    })
  },
  updatePhone: function (e) {
    var phone = e.detail.value
    this.setData({
      phone: phone
    })
  },
  confirmPay: function () {
    var that = this;
    // wx.getStorage({
    //   key: 'openid',
    //   success: function (res) {
    //     that.setData({
    //       openid: res.data
    //     })
    //   },
    // })
    var openid = app.globalData.openid;



    console.log(that.data.name);

    app.getRequest(
      'https://xcx001.69yt.com/index.php/order/index/creatOrder',
      {
        order_note: that.data.name,
        order_phone: that.data.phone,
        p_id: that.data.commodityId,
        wx_id: openid
      },
      function (res) {
        console.log(res);
        // that.setData({
        //   commodityDetail: res[0],
        // })
        // WxParse.wxParse('desc', 'html', that.data.desc, that, 0);
      }
    )
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
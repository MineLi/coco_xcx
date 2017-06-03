// pages/commodity/commodity.js
var app = getApp();
Page({
  data: {
    orderListName: ["我的订单", "待付款", "已付款", "已完成"],
    orderStyleName: "",
    orderList: [1, 1, 1]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var name = options.name;
    console.log(name);
    this.setData({
      orderStyleName: name
    })
    //页面初始化时 调用查询
    this.getOrderList(name);
  },
  getOrderList: function (orderName) {
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
    })
    // let isPay;
    switch (orderName) {
      case "我的订单":
        // isPay = all;
        this.getAllOrder();
        break;
      case "待付款":
        // isPay = 0;
        this.getOrderIsPay(0);
        break;
      case "已付款":
        // isPay = 1;
        this.getOrderIsPay(1);
        break;
      case "已完成":
        // isPay = 2;
        break;
    }

  },
  getAllOrder: function () {


    var that = this;
    console.log(app.globalData.openid);
    //请求所有数据
    app.getRequest(
      'http://xcx001.69yt.com/index.php/order/index/getAllOrder',
      {
        wx_id: app.globalData.openid
      },
      function (res) {
        console.log(res);
      }
    )
  },
  getOrderIsPay: function (isPay) {
    var that = this;
    //请求所有数据
    app.getRequest(
      'http://xcx001.69yt.com/index.php/order/index/getOrderIsPay',
      {
        ispay: isPay,
        wx_id: that.data.appid
      },
      function (res) {
        console.log(res);

      }
    )
  },
  goToCommodityDtail: function (e) {
    // var barCode = e.currentTarget.dataset.barcode
    wx.navigateTo({
      url: '/pages/commodityDetail/commodityDetail'
    })
  },
  classifyOrders: function (e) {
    var name = e.target.dataset.i;
    this.setData({
      orderStyleName: name
    })
    //分类查询
    this.getOrderList(name);
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
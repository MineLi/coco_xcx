// pages/commodity/commodity.js
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

  },
  goToCommodityDtail: function (e) {
    // var barCode = e.currentTarget.dataset.barcode
    // if (barCode) {
    wx.navigateTo({
      url: '/pages/commodityDetail/commodityDetail'
    })
    // }
  },
  classifyOrders: function (e) {
    var name = e.target.dataset.i;
    this.setData({
      orderStyleName: name
    })
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
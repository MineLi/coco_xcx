// pages/commodity/commodity.js
Page({
  data: {
    countryList: ["全部", "中国", "日本", "欧洲", "美国", "澳洲", "韩国", "其他"],
    countryName: "全部",
    commodityList: [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },

  goToCommodityDtail: function (e) {
    // var barCode = e.currentTarget.dataset.barcode
    // if (barCode) {
      wx.navigateTo({
        url: '/pages/commodityDetail/commodityDetail'
      })
    // }
  },



  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
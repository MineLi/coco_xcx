// pages/commodity/commodity.js
Page({
  data: {
    countryList: ["美甲", "美瞳", "纹绣", "美容"],
    countryName: "美甲",
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
    // this.data.countryName = \
    console.log('onLoad')
    var that = this
    // 拿到缓存的选择项
    wx.getStorage({
      key: 'select',
      success: function (res) {
        // that.data.countryName = res
        that.setData({
          countryName: res.data
        })
      }
    })
  },
  classifybrandlist: function (e) {
    var itm = e.target.dataset.i;
    this.setData({
      countryName: itm
    })
  },
  onReady: function () {
    // 页面渲染完成
    console.log('onReady')
  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
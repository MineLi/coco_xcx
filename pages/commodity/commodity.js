// pages/commodity/commodity.js
var app = getApp();
Page({
  data: {
    cateList: ["美甲", "美瞳", "纹绣", "美容"],
    cateName: "美甲",
    pageNum: 1,
    commodityList: []
  },

  goToCommodityDtail: function (e) {
    var id = e.currentTarget.dataset.commodityId
    // if (barCode) {
    wx.navigateTo({
      url: '/pages/commodityDetail/commodityDetail?id=' + id
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
        that.setData({
          countryName: res.data
        })
      }
    })
    //初始化数据
    this.getCommodities(this.data.pageNum, this.data.cateName)
  },
  classifycatelist: function (e) {
    console.log(e)
    var itm = e.target.dataset.i;
    this.setData({
      cateName: itm
    })
    this.getCommodities(this.data.pageNum, this.data.cateName)
  },

  getCommodities: function (pageNum, cate) {
    var that = this;
    app.getRequest(
      'https://xcx001.69yt.com/index.php/item/index/getItemInfoByCate',
      {
        pageNum: pageNum,
        pageSize: 1000,
        p_cate: cate
      },
      function (res) {
        that.data.commodityList = that.data.commodityList.concat(res);
        that.setData({
          commodityList: that.data.commodityList,
        })
        console.log(that.data.commodityList);
      }
    )
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
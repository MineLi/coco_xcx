//获取应用实例
var app = getApp()
// 富文本渲染器
var WxParse = require('../../utils/wxParse/wxParse.js')

Page({
  data: {
    winHeight: 0,// 屏幕高
    // scrollTop: 0,// 全屏滚动位置
    // 轮播图初始参数
    circular: true,// 是否采用衔接滑动
    numIndex: 1,// 轮播图当前页码
    numSize: 0,// 轮播图总条数
    commodityDetail: []
  },
  onLoad: function (option) {
    var that = this



    that.setData({
      userInfo: app.globalData.userInfo,
      commodityId: option.id
    })
    // 获取商品数据
    // that.getCommodity(option.barCode)
    // app.getUserInfoSync(
    //   function (userInfo) {
    //     that.setData({ userInfo: userInfo })
    //     // 查询品牌详情
    //     that.getCommodity(option.barCode)
    //   },
    //   function () {
    //     that.getCommodity(option.barCode)
    //   }
    // )
    this.getCommodityDetail()


  },
  onShow: function () {
    // 每次页面重新显示时，当前页面用户为空时，并且全局存在用户时
    // 表示刚从绑定页面返回，可直接触发页面内事件
    // var that = this
    // app.getUserInfoSync(function (userInfo) {
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
    // if (!that.data.userInfo) {
    //   var userInfo = app.globalData.userInfo
    //   if (userInfo) {
    //     that.setData({ userInfo: userInfo })
    //     // 获取商品数据
    //     that.getCommodity(that.data.barCode)
    //     // 直接关注此数据
    //     that.addFollow()
    //   }
    // }
  },
  // 分享事件处理函数
  onShareAppMessage: function () {
  },
  getCommodityDetail: function () {
    var that = this;
    app.getRequest(
      'https://xcx001.69yt.com/index.php/item/index/getItemInfoById',
      {
        pid: this.data.commodityId
      },
      function (res) {
        that.setData({
          commodityDetail: res,
          desc: that.unescapeHTML(decodeURIComponent(res[0].p_desc))
        })
        WxParse.wxParse('desc', 'html', that.data.desc, that, 0);
      }
    )
  },
  unescapeHTML: function (a) {
    a = "" + a;
    return a.replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/\+/g, " ")
      .replace(/\\/g, "");

  },
  //确认跳往订单确认页
  confirm: function () {
    var that = this;
    wx.navigateTo({
      url: "/pages/orderConfirm/orderConfirm?commodityId=" + that.data.commodityId
    })
  }
})

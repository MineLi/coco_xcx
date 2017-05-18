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
    // 选项卡初始参数
    currentTab: 0,// 当前选项卡下标
    // 关注事件与icon
    followTap: 'addFollow',
    followImg: 'follow-b',
    poster: false,// 显示隐藏视频封面
    enlargeImg: false, //点击图片放大
  },
  onLoad: function (option) {
    var that = this
    that.setData({
      winHeight: app.globalData.winHeight,
      ossUrl: getApp().globalData.ossUrl,
      M_100: app.globalData.M_100,
      M_W_500: app.globalData.M_W_500,
      userInfo: app.globalData.userInfo,
      barCode: option.barCode,
      from: option.from
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
    var commodity = this.data.commodity
    return {
      title: commodity.commodityName,
      path: '/pages/commodity/commodity?barCode=' + commodity.barCode
    }
  },
  // getCommodity: function (barCode) {
  //   console.log(barCode);
  //   var that = this;
  //   var userInfo = that.data.userInfo;
  //   var openId = wx.getStorageSync("openId");
  //   app.getRequest(
  //     'weChat/getCommodityInfoForWeChat',
  //     {
  //       barCode: barCode,
  //       userId: userInfo && userInfo.id || "",
  //       openId: openId
  //     },
  //     function (result) {
  //       //最近浏览 
  //       console.log(result);
  //       var resentObj = {};
  //       if (result.status === '0') {
  //         var commodity = result.msg
  //         console.log(result);
  //         // 计数器的数字显示

  //         var numSize = commodity.showImg.length;
  //         var visitId = result.msg.visitId;
  //         that.setData({
  //           visitId: visitId
  //         })
  //         // 关注状态初始化
  //         that.setData({
  //           commodity: commodity,
  //           numSize: numSize > 0 && numSize,
  //           followTap: followStatus ? 'unFollow' : 'addFollow',
  //           followImg: followStatus ? 'follow-f' : 'follow-b',
  //           // brandCategoryId:result.msg.brandCategoryId
  //         })
  //         // 图文详情渲染
  //         var detail = commodity.detail || "";
  //         WxParse.wxParse('detail', 'html', detail, that);

  //       } else {
  //         wx.showToast({
  //           title: '没有请求到数据',
  //           icon: 'success',
  //           duration: 2000
  //         })
  //       }
  //     }
  //   )
  // },




  // image滑动切换tab
  imageSlide: function (e) {
    var that = this
    that.setData({ numIndex: e.detail.current + 1 })
    // 停止视频
    this.videoContext.pause()
  },
  // box滑动切换tab
  // boxSlide: function (e) {
  //   var that = this
  //   that.setData({ currentTab: e.detail.current })
  // },
  // 点击tab切换
  tabClick: function (e) {
    var that = this
    if (that.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})

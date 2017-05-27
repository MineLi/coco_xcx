//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1000,
    scrollX: true,
    countryList: [
      {
        imgsrc: "/resources/images/country_all.jpg",
        country: "美甲",
      },
      {
        imgsrc: "/resources/images/country_China.jpg",
        country: "美瞳",
      },
      {
        imgsrc: "/resources/images/country_Japan.jpg",
        country: "纹绣",
      },
      {
        imgsrc: "/resources/images/country_Europe.jpg",
        country: "美容",
      }
    ],
    commodityList: [],
    hidden: true,
    scrollTop: 0,
    scrollHeight: 0,
    pageNum: 1,
    canLoad: true
  },
  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
  },
  onLoad: function () {
    var that = this
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
    }
    //sliderList
    app.getRequest(
      'http://huanqiuxiaozhen.com/wemall/slider/list',
      {
      },
      function (res) {
        that.setData({
          images: res
        })
      }
    )
    // //获取高度设置给scroll_view
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       scrollHeight: res.windowHeight
    //     });
    //   }
    // });
    // 获取第一页商品数据
    this.getCommodityInfo(1);
  },
  getCommodityInfo: function (pageNum) {
    var that = this;
    app.getRequest(
      'https://xcx001.69yt.com/index.php/item/index/getalliteminfo',
      {
        pageNum: pageNum,
        pageSize: 1000
      },
      function (res) {
        that.data.commodityList = that.data.commodityList.concat(res);
        that.setData({
          commodityList: that.data.commodityList,
          pageNum: that.data.pageNum++,
          canLoad: true
        })
        console.log(that.data.commodityList);
      }
    )
  },
  // //页面滑动到底部
  // bindDownLoad: function () {
  //   var that = this;
  //   // loadMore(that);
  //   if (this.data.canLoad) {
  //     this.setData({
  //       canLoad: false
  //     })
  //     this.getCommodityInfo(this.data.pageNum)
  //   }
  //   console.log("lower");
  // },
  // scroll: function (event) {
  //   //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
  //   this.setData({
  //     scrollTop: event.detail.scrollTop
  //   });
  // },
  goToList: function (e) {
    var select = e.target.dataset.name
    wx.setStorage({
      key: 'select',
      data: select,
    })
    wx.switchTab({
      url: '/pages/commodity/commodity',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },
  gotoDetail: function () {
    wx.navigateTo({
      url: '/pages/commodityDetail/commodityDetail'
    })
  }
})

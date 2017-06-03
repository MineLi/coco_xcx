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
    pageNum: 1,
    canLoad: true
  },
  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
  },
  onLoad: function () {
    var that = this;
    var serect = 'c4d2c765ce2bdf473351c10aeaa1777a';
    var appid = 'wx6ef434841cd84798';
    if (!app.globalData.userInfo) {
      wx.login({//login流程
        success: function (res) {//登录成功
          if (res.code) {
            var code = res.code;
            wx.getUserInfo({//getUserInfo流程
              success: function (res2) {//获取userinfo成功
                var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
                app.globalData.userInfo = res2.userInfo
                var iv = res2.iv;
                //请求自己的服务器
                // Login(code, encryptedData, iv);

                console.log(iv)
              }
            })

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
      wx.login({
        success: function (res) {
          var that = this;
          //获取openid
          if (res.code) {
            app.getRequest(
              'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + serect + '&grant_type=authorization_code&js_code=' + res.code,
              {
              },
              function (res) {
                console.log(res);
                // wx.setStorage({
                //   key: 'openid',
                //   data: res.openid
                // });
                //  放入全局
                app.globalData.openid = res.openid
              })
          }
        }
      })
    }
    //设置屏幕宽
    that.setData({
      winHeight: app.globalData.winHeight
    })
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
    // 获取第一页商品数据
    this.getCommodityInfo();
  },
  getCommodityInfo: function () {
    var that = this;
    if (that.data.canLoad) {
      that.setData({
        canLoad: false
      })
      app.getRequest(
        'https://xcx001.69yt.com/index.php/item/index/getalliteminfo',
        {
          pageNum: that.data.pageNum,
          pageSize: 10
        },
        function (res) {
          console.log(res);
          if (res.length !== 0) {
            var commodityList = that.data.commodityList.concat(res);
            that.setData({
              commodityList: commodityList,
              pageNum: that.data.pageNum + 1,
              canLoad: true
            })
          }
          console.log(that.data.commodityList);
        }
      )
    }

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
  gotoDetail: function (e) {
    var id = e.currentTarget.dataset.commodityid
    wx.navigateTo({
      url: '/pages/commodityDetail/commodityDetail?id=' + id
    })
  }
})

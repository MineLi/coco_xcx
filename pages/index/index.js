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
        country: "全部",
      },
      {
        imgsrc: "/resources/images/country_China.jpg",
        country: "中国",

      },
      {
        imgsrc: "/resources/images/country_Japan.jpg",
        country: "日本",
      },
      {
        imgsrc: "/resources/images/country_Europe.jpg",
        country: "欧洲",
      },
      {
        imgsrc: "/resources/images/country_USA.jpg",
        country: "美国",
      },
      {
        imgsrc: "/resources/images/country_Australia.jpg",
        country: "澳洲",
      },
      {
        imgsrc: "/resources/images/country_Korea.jpg",
        country: "韩国",
      },
      {
        imgsrc: "/resources/images/country_others.jpg",
        country: "其他",
      }
    ],
    commodityList:[1,1,1,1,1,11,1,1,1,1,1]
  },
  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //sliderList
    app.getRequest(
      'http://huanqiuxiaozhen.com/wemall/slider/list',
      {},
      function (res) {
        console.log(res);
        that.setData({
          images: res
        })
      }
    )
  }

})

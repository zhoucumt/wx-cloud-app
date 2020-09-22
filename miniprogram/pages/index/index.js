//index.js
const app = getApp()

Page({
  data: {
  },
  btnGetWerun(e) {
    wx.cloud.callFunction({
      name: 'getwerun',
      data: {
        a: 53,
        b: 95
      },
      success(res) {
        console.log(res);
      }
    });
  },

  onLoad: function() {
    
  },
})

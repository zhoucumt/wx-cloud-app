//index.js
const app = getApp()
const db = wx.cloud.database(); 

Page({
  data: {
    title: '',
    imageurl: ''
  },

  // 获取微信步数
  btnGetWerun(e) {
    wx.getWeRunData({
      success: (result) => {
        wx.cloud.callFunction({
          name: "getwerun",
          data: {
            werundata: wx.cloud.CloudID(result.cloudID)
          },
          success: (res) => {
            console.log(res);
            var stepList = res.result.werundata.data.stepInfoList;
            wx.showModal({
              content: "您今天一共走了 " + stepList[stepList.length - 1].step + " 步"
            });
          }
        });
      },
    });
  },

  // 扫码识书
  btnScanCode(e) {
    console.log('点击扫码');
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log('res: ', res);
        var isbn = res.result;
        console.log(res);
        wx.cloud.callFunction({
          name: "getbook",
          data: {
            isbn: res.result
          },
          success: (result) => {
            console.log('result---: ', result);
            this.setData({
              imageurl: result.result.cover_url,
              title: result.result.title
            });
          }
        });
      }
    });
  },

  onLoad: function() {
    
  },
})

//index.js
const app = getApp()

Page({
  data: {
  },
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

  onLoad: function() {
    
  },
})

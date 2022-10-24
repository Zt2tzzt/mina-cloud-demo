Page({

  data: {
    qrCodeFileID: ''
  },

  onTestTap() {
    wx.cloud.callFunction({
      name: 'test'
    }).then(res => {
      console.log('test res:', res);
    })
  },

  onSumTap() {
    const num1 = 20
    const num2 = 30
    // 调用云函数
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        num1,
        num2
      }
    }).then(res => {
      console.log('sum res:', res);
    })
  },

  onGetOpenidTap() {
    wx.cloud.callFunction({
      name: 'fetchopenid'
    }).then(res => {
      console.log('openid res:', res);
    })
  },

  onGetBiliChannelTap() {
    wx.cloud.callFunction({
      name: 'fetchBiliChannel',
      data: {
        play: 200000
      }
    }).then(res => {
      console.log('bili channel res:', res);
    })
  },

  onGetHomeDataTap() {
    wx.cloud.callFunction({
      name: 'fetchHome'
    }).then(res => {
      console.log('home res:', res);
    })
  },

  onGetMiniQRCode() {
    wx.cloud.callFunction({
      name: 'fetchCode'
    }).then(res => {
      this.setData({
        qrCodeFileID: res.result.fileID
      })
    })
  }
})
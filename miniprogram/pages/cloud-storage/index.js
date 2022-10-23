Page({
  data: {
    tempFilePath: ''
  },

  onUploadTap() {
    // 1.选择本地图片（相册/拍照）
    wx.chooseMedia({
      type: 'image',
    }).then(res => {
      console.log('choose image res:', res);
      // 2.获取图片
      const filePath = res.tempFiles[0].tempFilePath
      // 3.将图片上传到云存储中。
      const timestamp = Date.now()
      const openid = 'open_xxx' // 模拟获取到用户的 openid
      const extension = filePath.split('.').pop() // 获取图片后缀名
      const name =  `${timestamp}_${openid}.${extension}` // 生成图片名称
      return wx.cloud.uploadFile({
        filePath,
        cloudPath: 'SondsEufonium/' + name
      })
    }).then(res => {
      console.log('upload image res:', res);
      this.setData({
        tempFilePath: res.fileID
      })
    })
  },

  onDownloadTap() {
    // 1.根据 fileID 下载图片
    wx.cloud.downloadFile({
      fileID: 'cloud://cloud1-8g4a3iira9235aea.636c-cloud1-8g4a3iira9235aea-1306746431/SondsEufonium/1666528766271_open_xxx.jpg' // 真实开发中不会写死
    }).then(res => {
      console.log('download image res:', res);
      // 2.将图片的路径放到 data 中
      this.setData({
        tempFilePath: res.tempFilePath
      })
    })
  },

  onDeleteloadTap() {
    wx.cloud.deleteFile({
      fileList: ['cloud://cloud1-8g4a3iira9235aea.636c-cloud1-8g4a3iira9235aea-1306746431/SondsEufonium/1666528766271_open_xxx.jpg']
    }).then(res => {
      console.log('delete image res:', res);
    })
  },

  onTempFileTap() {
    wx.cloud.getTempFileURL({
      fileList: [
        'cloud://cloud1-8g4a3iira9235aea.636c-cloud1-8g4a3iira9235aea-1306746431/SondsEufonium/1666529836647_open_xxx.jpg'
      ]
    }).then(res => {
      console.log('temp file res:', res);
    })
  },

})
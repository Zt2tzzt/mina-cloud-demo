// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // 1.生成小程序码
  const qrCoderes = await cloud.openapi.wxacode.createQRCode({
    width: 320,
    path: 'pages/cloud-function/index'
  })
  console.log('qrCoderes:', qrCoderes);

  // 2.获取到数据，并且上传到云存储中
  const wxCtx = cloud.getWXContext()

  const timestamp = Date.now()
  const openid = wxCtx.OPENID
  const extension = qrCoderes.contentType.split('/').pop()

  const cloudPath = `${timestamp}_${openid}.${extension}`
  console.log('cloudPath:', cloudPath);
  const uploadRes = cloud.uploadFile({
    fileContent: qrCoderes.buffer,
    cloudPath
  })
  console.log('uploadRes', uploadRes);
  return uploadRes
}
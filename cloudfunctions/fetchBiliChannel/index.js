// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // 1.获取数据库和集合
  const db = cloud.database()
  const biliColl = db.collection('bili-channel1')
  const cmd = db.command

  const play = event.play
  return biliColl.where({
    play: cmd.gt(play)
  }).get().then(res => ({
    name: 'bilibili channel',
    videoList: res.data
  }))
  
}
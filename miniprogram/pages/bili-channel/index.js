const db = wx.cloud.database()
const biliColl = db.collection('bili-channel1')

Page({
  data: {
    biliChannelList: [],
  },
  offset: 0,
  size: 10,
  
  onLoad() {
    this.fetchBiliChannelData()
  },

  onReachBottom() {
    this.fetchBiliChannelData()
  },

  fetchBiliChannelData() {
    biliColl.skip(this.offset).limit(5).get().then(res => {
      console.log('res:', res);
      this.setData({
        biliChannelList: this.data.biliChannelList.concat(res.data)
      })
      this.offset = this.data.biliChannelList.length
    })
  },

  onItemDeleteTap(e) {
    const { item, index } = e.currentTarget.dataset
    biliColl.doc(item._id).remove().then(res => {
      console.log('delete res:', res);
      if (res) {
        this.setData({
          biliChannelList: [],
        })
        this.offset = 0
        this.fetchBiliChannelData()
      }
    })
  },
})
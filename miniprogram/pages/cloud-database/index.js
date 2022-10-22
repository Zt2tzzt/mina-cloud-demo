// 1.获取到对应的数据库
const db = wx.cloud.database()

// 2.获取到操作的集合（collection）
const studentsColl = db.collection('students')

Page({

  onAddBtnTap() {
    // 向云数据库中添加一条数据
    studentsColl.add({
      data: {
        name: 'Martines',
        age: 20,
        address: {
          name: 'Manchester',
          code: '54321',
          alias: 'Man'
        },
        hobbies: ['football', 'basketball']
      },
      /* success: res => {
        console.log('success res:', res);
      } */
    }).then(res => {
        console.log('success res:', res);
    })
  },
  onDeleteBtnTap() {

  },
  onUpdateBtnTap() {

  },
  onQueryBtnTap() {

  }
})
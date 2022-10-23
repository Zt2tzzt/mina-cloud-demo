// 1.获取到对应的数据库
const db = wx.cloud.database()
// 1.1.获取查询指令对象
const cmd = db.command
// 2.获取到操作的集合（collection）
const studentsColl = db.collection('students')
const biliColl = db.collection('bili-channel1')

Page({

  onShowBiliChannelBtnTap() {
    wx.navigateTo({
      url: '/pages/bili-channel/index',
    })
  },

  onAddBtnTap() {
    // 向云数据库中添加一条数据
    studentsColl.add({
      data: {
        name: 'CR7',
        age: 20,
        address: {
          name: 'Manchester',
          code: '54321',
          alias: 'Man'
        },
        hobbies: ['football', 'golf']
      },
      /* success: res => {
        console.log('success res:', res);
      } */
    }).then(res => {
        console.log('success res:', res);
    })
  },
  onDeleteBtnTap() {
    // 1.删除一条文档（记录）
    /* studentsColl.doc('c658c1c56353f7e3001235167d7e6c81')
    .remove()
    .then(res => {
      console.log('delete res:', res);
    }) */

    // 2.删除年龄大于 25 的文档
    const cmd = db.command
    studentsColl.where({
      age: cmd.gt(25)
    })
    .remove()
    .then(res => {
      console.log('delete condition res:', res);
    })
  },
  onUpdateBtnTap() {
    // 1.更新某一条明确的数据
    // 1.1.使用 update 的方式
    /* studentsColl.doc('8655d51b6354e047001258933d0254ac')
    .update({
      data: {
        age: 38
      }
    }).then(res => {
      console.log('update res:', res);
    }) */
    // 1.2.使用 set 的方式
    /* studentsColl.doc('5d055c866354da040012425222d0b5b3')
    .set({
      data: {
        age: 24
      }
    }).then(res => {
      console.log('set res:', res);
    }) */

    // 2.更新多条数据
    studentsColl.where({
      age: cmd.gt(18)
    })
    .update({
      data: {
        age: 10
      }
    })
    .then(res => {
      console.log('update multi res:', res);
    })

  },
  onQueryBtnTap() {
    // 方式一，根据 id 查询某一条数据。
    /* biliColl.doc('a0197c3e6353e65e02c161fd72e396c7')
    .get()
    .then(res => {
      console.log('方式一 res:', res);
    }) */

    // 方式二：根据条件查询多条数据
    /* biliColl.where({
      author: '在下老酷'
    })
    .get()
    .then(res => {
      console.log('方式二 res:', res);
    }) */

    // 方式三：查询指令，gt / lt
    /* biliColl.where({
      coins: cmd.gte(1000)
    })
    .get()
    .then(res => {
      console.log('方式三 res:', res);
    }) */

    // 方式四：正则表达式
    /* biliColl.where({
      author: db.RegExp({
        regexp: 'a',
        options: 'i'
      })
    })
    .get()
    .then(res => {
      console.log('方式四 res:', res);
    }) */

    // 方式五：获取整个集合中的数据
    /* biliColl.get().then(res => {
      console.log('方式五 res:', res);
    }) */

    // 方式六：过滤字段，分页，排序，
    biliColl.field({
      _id: true,
      author: true,
      bvid: true,
      play: true,
      title: true
    })
    .skip(0)
    .limit(5)
    .orderBy('play', 'desc')
    .get()
    .then(res => {
      console.log('方式六 res:' ,res);
    })
  }
})
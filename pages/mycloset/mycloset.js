// pages/select/select.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemtypeCategorys: ["所有类别", "上衣", "下衣", "鞋袜", "饰品", "其他"],
    itemtypeCategory: 0,
    seasonCategorys: ["所有季节", "春秋", "夏装", "冬装", "其他"],
    seasonCategory: 0,
    colorCategorys: ["所有色系", "浅色", "暖色", "冷色", "深色"],
    colorCategory: 0,
    occasionCategorys: ["所有场合", "正装", "休闲"],
    occasionCategory: 0,
    swiperid:0,
  },
  itemtypeChange: function(e){
    const that = this
    const select = e.detail.value
    console.log(select)
    this.setData({
      itemtypeCategory: select
    })
    var current = that.data.inventory
    const itemtypeCategory = select
    const seasonCategory = that.data.seasonCategory
    const colorCategory = that.data.colorCategory
    const occasionCategory = that.data.occasionCategory
    if (itemtypeCategory != 0) {
      current = current.filter(item => item.itemtype == itemtypeCategory.toString())
    }
    if (seasonCategory!=0){
      current = current.filter(item => item.season == seasonCategory.toString())
    }
    if (colorCategory != 0) {
      current = current.filter(item => item.color == colorCategory.toString())
    }
    if (occasionCategory != 0) {
      current = current.filter(item => item.occasion == occasionCategory.toString())
    }
    that.setData({
      current: current,
      swiperid: 0
    })
  },
  seasonChange: function (e) {
    const that = this
    const select = e.detail.value
    console.log(select)
    this.setData({
      seasonCategory: select
    })
    var current = that.data.inventory
    const itemtypeCategory = that.data.itemtypeCategory
    const seasonCategory = select
    const colorCategory = that.data.colorCategory
    const occasionCategory = that.data.occasionCategory
    if (itemtypeCategory != 0) {
      current = current.filter(item => item.itemtype == itemtypeCategory.toString())
    }
    if (seasonCategory != 0) {
      current = current.filter(item => item.season == seasonCategory.toString())
    }
    if (colorCategory != 0) {
      current = current.filter(item => item.color == colorCategory.toString())
    }
    if (occasionCategory != 0) {
      current = current.filter(item => item.occasion == occasionCategory.toString())
    }
    that.setData({
      current: current,
      swiperid: 0
    })
  },
  colorChange: function (e) {
    const that = this
    const select = e.detail.value
    console.log(select)
    this.setData({
      colorCategory: select
    })
    var current = that.data.inventory
    const itemtypeCategory = that.data.itemtypeCategory
    const seasonCategory = that.data.seasonCategory
    const colorCategory = select
    const occasionCategory = that.data.occasionCategory
    if (itemtypeCategory != 0) {
      current = current.filter(item => item.itemtype == itemtypeCategory.toString())
    }
    if (seasonCategory != 0) {
      current = current.filter(item => item.season == seasonCategory.toString())
    }
    if (colorCategory != 0) {
      current = current.filter(item => item.color == colorCategory.toString())
    }
    if (occasionCategory != 0) {
      current = current.filter(item => item.occasion == occasionCategory.toString())
    }
    that.setData({
      current: current,
      swiperid:0
    })
  },
  occasionChange: function (e) {
    const that = this
    const select = e.detail.value
    console.log(select)
    this.setData({
      occasionCategory: select
    })
    var current = that.data.inventory
    const itemtypeCategory = that.data.itemtypeCategory
    const seasonCategory = that.data.seasonCategory
    const colorCategory = that.data.colorCategory
    const occasionCategory = select
    if (itemtypeCategory != 0) {
      current = current.filter(item => item.itemtype == itemtypeCategory.toString())
    }
    if (seasonCategory != 0) {
      current = current.filter(item => item.season == seasonCategory.toString())
    }
    if (colorCategory != 0) {
      current = current.filter(item => item.color == colorCategory.toString())
    }
    if (occasionCategory != 0) {
      current = current.filter(item => item.occasion == occasionCategory.toString())
    }
    that.setData({
      current: current,
      swiperid: 0
    })
  },
  swiperchange:function(e){
    console.log(e.detail)
    this.setData({
      swiperid:e.detail.current
    })
  },
  showoptions: function(e){
    const that = this
    const id = e.currentTarget.id
    wx.showActionSheet({
      itemList: ['加入今日装扮', '打入冷宫'],
      success: function (res) {
        const choice =res.tapIndex
        switch(choice){
          case 0:
            console.log(choice)
            that.setData({
              inventory: that.data.inventory.map(item => { if (item._id == id) { return { ...item, savetoday: 1 } } return item}),
              current: that.data.current.map(item => { if (item._id == id) { return { ...item, savetoday: 1 } } return item })
            })
            wx.request({
              url: 'https://chinabackend.bestlarp.com/api/closet/' + id,
              method:'PUT',
              data:{
                savetoday:1
              },
              success:function(res){
                console.log("updated")
              }
            })
            break;
          case 1:
            console.log(choice)
            that.setData({
              inventory: that.data.inventory.filter(item => item._id != id),
              current: that.data.current.filter(item => item._id != id),
              swiperid: that.data.swiperid-1
            })
            wx.request({
              url: 'https://chinabackend.bestlarp.com/api/closet/' + id,
              method: 'PUT',
              data: {
                savetoday: -1
              },
              success: function (res) {
                console.log("updated")
              }
            })
            break;
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  onLoad: function (options) {
    const that = this
    const baseurl="https://chinabackend.bestlarp.com/api/closet"
    const unionid = wx.getStorageSync('unionid')
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: baseurl+'?type=user&id='+unionid+'&populate=inventory' ,
      method:'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          inventory: res.data[0].inventory.filter(item => item.savetoday != -1),
          current: res.data[0].inventory.filter(item => item.savetoday != -1),
          unionid: unionid,
          user_id: res.data[0]._id
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
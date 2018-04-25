// pages/addnew/addnew.js
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
    image:null,
  },
  itemtypeChange: function (e) {
    const that = this
    const select = e.detail.value
    console.log(select)
    this.setData({
      itemtypeCategory: select
    })
  },
  seasonChange: function (e) {
    const that = this
    const select = e.detail.value
    console.log(select)
    this.setData({
      seasonCategory: select
    })
  },
  colorChange: function (e) {
    const that = this
    const select = e.detail.value
    console.log(select)
    this.setData({
      colorCategory: select
    })
  },
  occasionChange: function (e) {
    const that = this
    const select = e.detail.value
    console.log(select)
    this.setData({
      occasionCategory: select
    })
  },
  addphoto: function(e){
    const filename = Date.now()
    const that=this
    wx.chooseImage({
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://chinabackend.bestlarp.com/uploadimage', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'name': filename,
            'folder': wx.getStorageSync('unionid')
          },
          success: function (res) {
            wx.hideLoading()
            console.log(filename +"."+ res.data.split('.')[res.data.split('.').length - 1])
            that.setData({
              image: filename + "." + res.data.split('.')[res.data.split('.').length-1]
            })
            //do something
          }
        })
      }
    })
  },
  saveitem:function(){
    const that = this
    wx.request({
      method:'POST',
      url: 'https://chinabackend.bestlarp.com/api/closet',
      data:{
        type:'item',
        owner: that.data.unionid,
        image:that.data.image,
        itemtype: that.data.itemtypeCategory,
        season: that.data.seasonCategory,
        color: that.data.colorCategory,
        occasion: that.data.occasionCategory,
      },
      success:function(res){
        console.log("done")
        wx.reLaunch({
          url: '../home/home',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      unionid: wx.getStorageSync('unionid')
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
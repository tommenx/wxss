// pages/detail/detail.js
var config = require('../../config.js');
var app = getApp();
var haveApplyed = false;
var lat = null;
var lng = null;
var face = null;
var location = null;
var activity_id=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detail_info:{},
      activity_info:{},
      check_date_info:{},
      detail_show:false,
      show_date:true,
      date_info_hidden:true,
      apply_msg:"点击报名"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var activityId = options.activity_id;
      activity_id = activityId;
      var that = this;
    //   console.log(activityId);
      wx.request({
          url: config.url +'/check/details',
          data: {
              'id':activityId
          },
          method:'POST',
          success:function(res) {
              console.log(res.data);
              that.setData({
                  detail_info:res.data
              });
          }
      });
      wx.request({
          url: config.url + '/activity/actInfo',
          data:{
              'id':activityId
          },
          method:'POST',
          success: function(res) {
              that.setData({
                  activity_info:res.data
              })
              console.log(res.data);
              lng = res.data.infos[0].F_Lng;
              lat = res.data.infos[0].F_Lat;
              face = res.data.infos[0].F_IfFace;
              location = res.data.infos[0].F_IfLocation;
          }
      })
      //判断是否已经报过名
      wx.request({
          url: config.url + '/activity/haveApply',
          data:{
              'userId': app.globalData.user_id,
              'activityId':activityId
          },
          method:'POST',
          success: function(res){
              console.log(res.data)
              if(res.data.code){
                  haveApplyed = true;
                  that.setData({
                      apply_msg:'点击打卡'
                  })
              }
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
  
  },
  getActivity_detail: function(){
      console.log('detail clicked')
      var that = this;
      var temp = that.data.detail_show;
      that.setData({
          detail_show:!temp
      })
  },
  getCheckDate: function(){
      var that = this;
      var temp = that.data.show_date;
      that.setData({
          show_date:!temp
      })

  },
  /**
   * 点击具体的时期时触发操作
   * 2018-02-26
   */
  getDetailedCheck:function(e){
      var that = this;
      var date = e.currentTarget.dataset.date;
    //   console.log(date);
      var temp = that.data.date_info_hidden;
      wx.request({
          url: config.url + '/check/details/date',
          method:'POST',
          data:{
              'activityId': activity_id,
              'checkDate':date
          },
          success:function(res){
              that.setData({
                  check_date_info:res.data.details,
                  date_info_hidden :!temp
              })
              console.log(!temp,res.data.details);
              
          }
      })
  },
  submitCheck:function(){
      if(haveApplyed){
          console.log(activity_id);
          wx.redirectTo({
              url: '../checkIn/checkIn?lat=' + lat + '&lng=' + lng +'&activityId=' + activity_id
              +'&face='+ face +'&location='+location
          })
      }else{
          wx.request({
              url:config.url + '/activity/apply',
              method:'POST',
              data:{
                  'activityId':activity_id,
                  'userId':app.globalData.user_id
              },
              success: function(res){
                  wx.showToast({
                      title: '报名成功',
                  })
              }

          })
          wx.switchTab({
              url: '../manage/manage'
          })
      }
  }


})
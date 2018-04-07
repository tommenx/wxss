// pages/user/user.js
var uploadFn = require('../../utils/upload.js');
var config = require('../../config.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_name: "张三",
        user_city: "常州",
        // 此时头像的照片是静态的
        avator_path: "../../image/avator.jpg",
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
                avator_path: app.globalData.avator_url
            });
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                    avator_path: app.globalData.avator_url
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                        avator_path: app.globalData.avator_url
                    })
                }
            })
        }
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
    changeAvator: function () {
        var me = this;
        wx.chooseImage({
            success: function (res) {
                var filePath = res.tempFilePaths[0];
                console.log(filePath);
                // var fileName = filePath.match(/http.{7}(.*)/);
                //fileName = fileName[1];
                var fileName = Date.parse(new Date())+'.jpg';
                console.log(fileName);
                uploadFn(filePath, fileName, me,function(avator_url){
                    wx.request({
                        url: config.url + '/person/update',
                        data:{
                            'user_id': app.globalData.user_id,
                            'avator_url': avator_url
                        },
                        method: 'POST',
                        success: function(res) {
                            console.log(res.data);
                            app.globalData.avator_url = avator_url;
                        }
                    })
                });
            },
        })
    }
})
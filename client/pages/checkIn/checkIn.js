// pages/checkIn/checkIn.js
var uploadFn = require('../../utils/upload.js');
var config = require('../../config.js');
var distance = require('../../utils/getdistance.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
//腾讯地图Key
var demo = new QQMapWX({
    key: ''
});
const app = getApp();
var photo_check_url = null;
var photo_check_res = false;
var location_check_res = false;
var face_check_res = false;
var activity_lat = null;
var activity_lng = null;
var activity_id = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activity_title: "",
        photo: "../../image/avator.jpg",
        location_res: "等待验证",
        face_res: "等待验证",
        face_disabled:false,
        location_disabled:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log('点击打卡', photo_check_res, location_check_res)
        activity_lat = options.lat;
        activity_lng = options.lng;
        activity_id = options.activityId;
        console.log(options.activityId);
        if(options.face == 0){
            face_check_res = true;
        }
        if(options.location == 0) {
            location_check_res = true;
        }
        console.log(options.face,options.location);
        that.setData({
            activity_title: options.title,
            face_disabled: options.face==0?true:false,
            location_disabled: options.location == 0 ? true : false
        });
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
        var that = this;
        that.setData({
            face_disabled: false,
            location_disabled: false
        })
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
    /**
     * 选择图片
     * api_key face++的人脸对比接口key
     * api_secret face++的人脸对比接口secret
     * image_url2 第二张人脸的照片
     */
    chooseImage: function () {
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: 'https://api-cn.faceplusplus.com/facepp/v3/compare', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'image_file1',
                    formData: {
                        'api_key': '',
                        'api_secret': '',
                        'image_url2': ''
                    },
                    success: function (res) {
                        console.log(res.data);
                        //do something
                    }
                })
            }
        })
    },
    /**
     * 点击上传打卡照片时，进行图片签到
     */
    photoCheck: function () {
        var me = this;
        wx.chooseImage({
            success: function (res) {
                var filePath = res.tempFilePaths[0];
                // var fileName = filePath.match(/http.{7}(.*)/);
                // fileName = fileName[1];
                var fileName = Date.parse(new Date()) + '.jpg';
                uploadFn(filePath, fileName, me, function (photo_url) {
                    photo_check_url = photo_url;
                    photo_check_res = true;
                    //   最后用的时候再打开，否则频繁请求说不定要钱呢！
                      me.setData({
                          photo: photo_url
                      });
                    // console.log(photo_url);
                });
            },
        })
    },
    /**
     * 点击地点验证，进行地点签到
     */
    locationCheck: function () {
        var that = this;
        wx.getLocation({
            success: function (res) {
                var p1 = {
                    lat: res.latitude,
                    lng: res.longitude
                };
                var p2 = {
                    lat: activity_lat,
                    lng: activity_lng
                };
                // console.log(p1, p2);
                demo.calculateDistance({
                    to: [{
                        latitude: p1.lat,
                        longitude: p1.lng
                    }],
                    from: {
                        latitude: p2.lat,
                        longitude: p2.lng
                    },
                    success: function (res) {
                        var dis = res.result.elements[0].distance;
                        if (dis <= 1000) {
                            location_check_res = true;
                            that.setData({
                                location_res: "验证成功"
                            })
                        } else {
                            location_check_res = false;
                            that.setData({
                                location_res: "验证失败"
                            })
                        }
                        // console.log(res.result.elements[0].distance);
                        console.log(res);
                    },
                    fail: function (res) {
                        console.log(res);
                    },
                })
            },
        })
    },
    /**
     * 点击人脸验证，进行人脸签到
     * api_key face++的人脸对比接口key
     * api_secret face++的人脸对比接口secret
     * image_url2 第二张人脸的照片
     */
    faceCheck: function () {
        var that = this;
        wx.chooseImage({
            success: function (res) {
                var avator_url = app.globalData.avator_url;
                console.log('本地照片地址',avator_url);
                if (avator_url == '') {
                    wx.showToast({
                        title: '请绑定照片',
                        duration: 1000
                    })
                } else {
                    var tempFilePaths = res.tempFilePaths
                    wx.uploadFile({
                        url: 'https://api-cn.faceplusplus.com/facepp/v3/compare', //仅为示例，非真实的接口地址
                        filePath: tempFilePaths[0],
                        name: 'image_file1',
                        formData: {
                            'api_key': '',
                            'api_secret': '',
                            'image_url2': avator_url
                        },
                        success: function (res) {
                            console.log(res.data);
                            var obj = JSON.parse(res.data);
                            // console.log(obj.confidence);
                           if(obj.confidence >= 50){
                               face_check_res = true;
                               that.setData({
                                   face_res:'验证成功'
                               })
                           }else if (obj.confidence < 50) {
                               that.setData({
                                   face_res:'验证失败'
                               })
                           }else{
                               wx.showToast({
                                   title: 'API并发控制',
                                   duration: 1000
                               })
                           }
                        }
                    })
                }

            }
        })
    },
    submitCheck: function(){
        if(photo_check_res&&location_check_res&&face_check_res){
            wx.request({
                url: config.url + '/check',
                method:'POST',
                data:{
                    'userId':app.globalData.user_id,
                    'activityId':activity_id,
                    'photoUrl':photo_check_url
                },
                success: function(check_res){
                    if(check_res.data.code==1){
                        wx.navigateBack({
                        });
                        photo_check_res = false;
                        face_check_res = false;
                        location_check_res = false;
                    }
                }

            })
        }else{
            wx.showToast({
                title: '请完成所有验证',
                duration: 1000
            })
        }
    }
})
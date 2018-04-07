// pages/new/new.js
var location = "";
var config = require('../../config.js');
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        start_date: "2018-01-01",
        end_date: "2018-01-02",
        checkboxItems: [
            { name: '拍照打卡', value: '1', checked: true },
            { name: '地点打卡', value: '2' },
            { name: '人脸打卡', value: '3' }
        ],
        activity_location: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        var that = this;
        console.log(getApp().data.activity_location);
        location = getApp().data.activity_location;
        if (location != "") {
            that.setData({
                activity_location: location
            });
        }
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
    /**
     * 选择日期并获取日期
     */
    bindStartDateChange: function (e) {
        this.setData({
            start_date: e.detail.value
        });
        console.log()
    },
    bindEndDateChange: function (e) {
        this.setData({
            end_date: e.detail.value
        })
    },

    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);
        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if (checkboxItems[i].value == values[j]) {
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems
        });
    },
    getLocation: function () {
        wx.navigateTo({
            url: '../addLocation/addLocation',
        });
    },
    
    formSubmit: function (e) {
        var ifPhoto = 0;
        var ifLocation = 0;
        var ifFace = 0;
        var value = e.detail.value
        var types = value.checkin_types;
        // console.log(types.l);
        for (var i = 0; i < types.length; i++) {
            if (types[i] == 1) {
                ifPhoto = 1;
            }

            if (types[i] == 2) {
                ifLocation = 1;
            }
            if (types[i] == 3) {
                ifFace = 1;
            }
        }
        wx.request({
            url: config.url+'/activity/create',
            data: {
                'createrId': app.globalData.user_id,
                'activity_name': value.activity_name,
                'activity_desc': value.activity_desc,
                'location': value.activity_location,
                'lat': app.data.activity_lat,
                'lng': app.data.activity_lng,
                'startDate':value.start_date,
                'endDate':value.end_date,
                'ifFace':ifFace,
                'ifPhoto':ifPhoto,
                'ifLocation':ifLocation
            },
            method:'POST',
            success:function(res) {
                // console.log(res.data);
                wx.switchTab({
                    url: '/pages/manage/manage'
                })
            }
        })


    }
})
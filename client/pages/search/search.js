/**
 * TODO:onload中加载所有正在进行的活动，在Typing中进行过滤，不用一遍一遍查询服务器
 */
var config = require('../../config.js');
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        processing:[]
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        var that = this;
        that.setData({
            inputVal: e.detail.value
        });
        wx.request({
            url: config.url + '/activity/like',
            method: 'POST',
            data:{
                'str': e.detail.value
            },
            success: function (res) {
                that.setData({
                    processing: res.data.processing
                });
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // var that = this;
        // wx.request({
        //     url: config.url + '/activity/getall',
        //     method: 'POST',
        //     success: function (res) {
        //         that.setData({
        //             processing: res.data.processing
        //         });
        //     }
        // })
    },
});
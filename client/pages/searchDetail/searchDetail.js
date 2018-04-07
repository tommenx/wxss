var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
//key:腾讯地图的key
var demo = new QQMapWX({
    key:''
});
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        result:[]
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
    /**
     * 当每次输入框更改的时候触发此函数
     */
    inputTyping: function (e) {
        var that = this;
        that.setData({
            inputVal: e.detail.value
        });
        demo.getSuggestion({
            keyword: e.detail.value,
            region:'常州市',
            success:function(res){
                if(res.status == 0){
                    that.setData({
                        result:res.data
                    })
                }
            },
            fail: function (res) {
                console.log(res);
            },
            complete: function (res) {
                console.log(res);
            }
        });
    }
});
const upPerInfoUrl = require('../../../config').upPerInfoUrl;
const app = getApp();


Page({
    data:{
        userInfo:{},
        imageList:[],
        gender:"",
        region:[],
        array: ['男', '女'],
        data:"",
        index: 0
    },
    previewImage:function(e){
        let that = this;
        var current = this.data.userInfo.avatarUrl;
        // that.data.imageList.push(current)
        // that.setData({
        //     imageList:that.data.imageList
        // }),
        console.log("imageList:",that.data.imageList),
        console.log("avatarUrl:",current)
        console.log("avatarUrl:",e.currentTarget);
        wx.previewImage({
            current: current,
            urls:that.data.imageList,
            success:function(res){
                console.log("imageList:",that.data.imageList),
                console.log("res:",res)
            },
            fail:function(res){
                console.log('res:',res)
            }
        })
    },
    goSetName:function(){
        wx.navigateTo({
            url:'../../setPerInfo/setName/setName'
        });
    },
    bindGenderChange:function(e){
        console.log(e.detail.value)
        this.setData({
            index:e.detail.value
        })
    },
    binDataChange:function(){
        this.setData({
            data:e.detail.value
        })
    },
    bindRegionChange:function(e){
        console.log(e.detail.value)
        this.setData({
            region:e.detail.value
        })
    },
    onLoad:function(){
        // let that = this;
        console.log("onLoad前",app.globalData.userInfo);
        this.setData({
            userInfo: app.globalData.userInfo,
            imageList:[],
            'region[0]':app.globalData.userInfo.province,
            'region[1]':app.globalData.userInfo.city,
            index:app.globalData.userInfo.gender-1
        })
        console.log("onLoad后",app.globalData.userInfo);
    },
    onShow:function(){
        // let that = this;
        // console.log("onShow前",app.globalData.userInfo);
        let imgUrl = app.globalData.userInfo.avatarUrl;
        let imglist =[];
        imglist.push(imgUrl)
        // this.data.imageList.splice(0,1,imgUrl)
        this.setData({
            userInfo: app.globalData.userInfo,
            // imageList:this.data.imageList
            imageList:imglist
        })

        // let gender = this.data.userInfo.gender;
        // if(gender==1){
        //     this.setData({
        //         gender:"男"
        //     })
        // }else if(gender==2){
        //     this.setData({
        //         gender:"女"
        //     })
        // }else{
        //     this.setData({
        //         gender:"其他"
        //     })
        // }
    },
    onUnload:function(){
        // 将这个页面的信息传入globalData中
        // 将golbalData上传
        console.log("app.Info",app.globalData.userInfo)
        
        app.globalData.userInfo.avatarUrl=this.data.userInfo.avatarUrl
        app.globalData.userInfo.gender=this.data.index+1
        app.globalData.userInfo.province=this.data.region[0]
        app.globalData.userInfo.city=this.data.region[1]
        //  wx.request({
        //     url: upPerInfoUrl,
        //     data: {
        //         nickName:app.globalData.userInfo.nickName,
        //         six:app.globalData.userInfo.gender,
        //         province:app.globalData.userInfo.province,
        //         city:app.globalData.userInfo.city,
        //     },
        //     header: {'content-type':'application/x-www-form-urlencoded'},
        //     method: 'POst',
        //     success: (res)=>{
        //         if(res.code==0){
        //             console.log('用户信息上传成功,code=0,')
        //         }else{
        //             console.log('用户信息上传失败,code=1,')
        //         }
        //     },
        //     fail: (res)=>{
        //         console.log('调用upPerInfoUrl接口失败，',res)
        //     },
        // });
    }
})
const app = getApp();

Page({
    data:{
        nickName:'',
        setName:''
    },  
    bindChange:function(e){
        this.setData({
            setName:e.detail.value
        })
        app.globalData.userInfo.nickName = this.data.setName
        console.log(this.data.setName)
        console.log(app.globalData.userInfo.nickName)
    },
    onLoad:function(){

    },
    onShow:function(){
        this.setData({
            nickName:app.globalData.userInfo.nickName
        })
    }
})
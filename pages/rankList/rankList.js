// pages/rankList/index.js
const checkRankList = require('../../config').checkRankList;
const getOtherInfoUrl = require('../../config').getOtherInfoUrl;

const app = getApp();

Page({
    data: {
      updateRank:'',
      rankList:[        
          // {      // 测试数据，可以多复制几个
          //   user:{
          //       avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
          //       nickName:'君'
          //   },
          //   match:'90%'
          // }
      ],
      otherIndex: null,   
      timer:  null,     //更新排行榜的定时器
      loading: true,
    },
    goOtherInfo:function(e){
      let that =this;
      // console.log(e)
      // 获取当前对象索引
      app.globalData.otherIndex=e.currentTarget.dataset.index  // 存入全局中，为了获取头像显示在他人资料页面中  因为获取用户信息中没有头像
      this.setData({
        otherIndex:e.currentTarget.dataset.index  // 存入当前页面， 为了判断当前对象的匹配度是否满足用户的匹配度，若满足，可以查看对象资料，否则不能查看
      // "排行榜-查看对方用户资料链接"，这个链接与 "查看用户个人资料" 不同；这里的链接是提交对方的id和match，返回是否可以查看以及可以查看时对方的资料
      })
      
      wx.request({
        url:getOtherInfoUrl,  
        method:"GET",
        data:{
          otherUserId:that.rankList[that.data.otherIndex].userId,
          match:that.rankList[that.data.otherIndex].match
        },
        success:function(res){
          console.log(res);
          if(!res.data.code){                           // 0查询成功 -1查询失败
            app.globalData.otherInfo = res.data.data    // 将对方的资料保存在全局中，用于下一个页面使用
            wx.navigateTo({
              url:'../otherInfo/otherInfo'
            })
          }else{
            wx.showModal({
              title: "匹配度不够，不能看Ta呦~",
              content: res.data.msg,
              showCancel:false,
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        },
        fail:function(){
          wx.showToast({
            title: "网络出问题啦，稍后再试试~",
            icon: 'none',
            duration: 1000
          }) 
          console.log("请求后台失败：",res)
        }
      })
    },

    //请求排行榜信息，  每小时跟新一次
    requestRank:function(){
      let that =this;
      wx.request({
        url:checkRankList,
        data:{
          userId:app.globalData.weixinInfo.userId
        },
        method:"GET",
        success:function(res){
          that.setData({
            rankList:res.data.data
          })
          app.globalData.rankList=res.data.data
          console.log("请求排行榜成功，返回信息：",res.data)
          console.log("排行榜：",res.data.data)
        },
        fail:function(res){
          console.log('请求排行榜后台失败')
          wx.showToast({
            title: '系统出错，请稍后再试哦~',
            icon: 'none',
            duration: 1000
          })
        }
      })
    },

//生命周期函数--监听页面加载
    onLoad (options) {
      console.log("onload")
      this.requestRank()   //请求排行榜信息

    },

 //生命周期函数--监听页面初次渲染完成
   onReady: function () {
    },

 // 生命周期函数--监听页面显示
    onShow: function () {
      let that = this;
      that.setData({
        timer:setInterval( ()=>{      //页面只要显示，就每小时更新一次排行榜
          that.requestRank()
        },3600000)
      })
      
    },

    onHide:function(){    
      clearInterval(this.data.timer)    //页面隐藏时，销毁定时器 不再更新排行榜, 防止内存泄漏
    }
  
  })
// pages/rankList/index.js
const checkRankList = require('../../config').checkRankList;
const getOtherInfoUrl = require('../../config').getOtherInfoUrl;

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
      updateRank:'',
      rankList:[
          // {
          //   user:{
          //       avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
          //       nickName:'君'
          //   },
          //   match:'30%'
          // },
          // {
          //   user:{
          //       avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
          //       nickName:'君'
          //   },
          //   match:'60%'
          // },
          // {
          //   user:{
          //       avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
          //       nickName:'君'
          //   },
          //   match:'90%'
          // },
          // {
          //   user:{
          //       avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
          //       nickName:'君'
          //   },
          //   match:'90%'
          // },
          // {
          //   user:{
          //       avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
          //       nickName:'君'
          //   },
          //   match:'90%'
          // },
          // {
          //   user:{
          //       avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
          //       nickName:'君'
          //   },
          //   match:'30%'
          // },
          // {
          //   user:{
          //       avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
          //       nickName:'君'
          //   },
          //   match:'60%'
          // },
          // {
          //   user:{
          //       avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
          //       nickName:'君'
          //   },
          //   match:'90%'
          // },
          // {
          //   user:{
          //       avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
          //       nickName:'君'
          //   },
          //   match:'90%'
          // }
      ],
          
      
      loading: true,
    },
    goOtherInfo:function(e){
      // console.log(e)
      // console.log(e.currentTarget.dataset.index)

      app.globalData.otherIndex=e.currentTarget.dataset.index  //存起来为了获取头像

      var otherIndex=e.currentTarget.dataset.index  //点击的这个人在排行榜中的索引
      wx.request({
        url:getOtherInfoUrl,
        method:"GET",
        data:{
          otherUserId:app.globalData.rankList[otherIndex].userId,
          match:app.globalData.rankList[otherIndex].match
        },
        success:function(res){
          if(!res.data.code){
            app.globalData.otherInfo = res.data.data
            wx.navigateTo({
              url:'../otherInfo/otherInfo'
            })
          }else{
            wx.showModal({
              title: "不能看Ta呦~",
              content: res.data.msg,
              showCancel:true,
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        },
        fail:function(){
          console.log("请求后台失败：",res)
        }
      })


      
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (options) {
      var that = this
      console.log("onload")
      that.setData({
        rankList:app.globalData.rankList
      })
      
      that.setData({
        updateRank:setInterval( () =>{
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
            }
          })
        },1000000)
      })
        
    },
    /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {
    // this.updateRank();
    },

    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {

    },

    onUnload:function(){
      // clearInterval(this.data.updateRank)
    }
  
  })
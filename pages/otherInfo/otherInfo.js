// pages/play/play.js
var questionData = require("../../questionData/questionData.js");

// const postAnswerResult = require('../../config').postAnswerResult;
const app = getApp();


Page({

  data: {
    //他人的信息
    otherInfo:{},
    rankOtherInfo:{},  //主要获得头像和答题匹配结果 （获得用户信息没有头像）
    otherInfo:{},  //获取用户的所有信息，已在上个界面存入全局变量

    answerList:[],
    trueAnswerList:[],
    // ta:'',

    // 题目
     current:0,//当前题号
     qusLength:0,
     questionList:[], //题的列表

  },

  


  // 题目
  next_question(){
      this.setData({
        current: this.data.current + 1,
      })

  },
  pre_question(){
    this.setData({
      current :this.data.current - 1,
    })
  },

  //从后台传来的答案匹配结果是‘12342312’，转换为‘ABCDBCAB’
  changeAnswerList: function(){
    var trueAnswer=[]
    for(var i=0; i<this.data.answerList.length; i++){
      if(this.data.answerList[i]=='1'){
        trueAnswer.push("A")
      }else if(this.data.answerList[i]=='2'){
        trueAnswer.push("B")
      }else if(this.data.answerList[i]=='3'){
        trueAnswer.push("C")
      }else if(this.data.answerList[i]=='4'){
        trueAnswer.push("D")
      }
    }
    this.setData({
      trueAnswerList:trueAnswer
    })
  },

 
  onLoad: function () {
    // 得到题目
    this.setData({
      questionList:questionData.questionList,
      qusLength:this.data.questionList.length
    });
  },
  onShow:function(){
    // let that = this
    var otherIndex=app.globalData.otherIndex  //点击的这个人在排行榜中的索引
    // wx.request({
    //   url:getOtherInfoUrl,
    //   method:"GET",
    //   data:{
    //     otherUserId:app.globalData.rankList[otherIndex].userId,
    //     match:app.globalData.rankList[otherIndex].match
    //   },
    //   success:function(res){
    //     console.log("请求获得他人信息，后台返回：",res)
    //     console.log("他人信息：",res.data.data)
    //     that.setData({
    //       otherInfo:res.data.data
    //     })
    //   },
    //   fail:function(){
    //     console.log("请求后台失败：",res)
    //   }
    // })
    this.setData({
      otherInfo:app.globalData.otherInfo,
      rankOtherInfo:app.globalData.rankList[otherIndex],   //得到从排行榜接口得到的信息（目的是为了渲染头像）
      answerList:app.globalData.rankList[otherIndex].answerCompare.split('')    //得到从排行榜接口得到的信息（目的是为了得到匹配度）
    })
    this.changeAnswerList()
    // if(that.data.otherInfo.gender==1){
    //   that.setData({
    //     ta:"他"
    //   })
    // }else{
    //   that.setData({
    //     ta:"她"
    //   })
    // }
      
  },
  
  onShareAppMessage: function () {

  }
})
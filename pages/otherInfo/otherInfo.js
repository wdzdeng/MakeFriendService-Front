// pages/play/play.js
const questionData = require("../../questionData/questionData.js");

// const postAnswerResult = require('../../config').postAnswerResult;
const app = getApp();


Page({

  data: {
    //他人的信息
    otherInfo:{},
    rankOtherInfo:{},  //从排行榜接口获取的用户数据，主要获得头像和答题匹配结果 （获取用户信息接口返回的数据中没有头像）
    otherInfo:{},  //获取用户信息接口返回的数据，已在上个界面存入全局变量

    //答案列表
    answerList:[],   //后台传过来的答案匹配列表是‘12342312’，
    trueAnswerList:[],   //转换为‘ABCDBCAB’的答案列表
    // ta:'',

    // 题目
     current:0,//当前题号
     qusLength:0,  //题的长度，为了判断上(下)一题的按钮是否显示
     questionList:[], //题的列表

  },

  //预览头像
  previewImage:function(){
    let myheadUrl = this.data.rankOtherInfo.headUrl;
    let imglist =[];
    imglist.push(myheadUrl)
    wx.previewImage({
        current: myheadUrl,                   // 当前显示图片的http链接
        urls: imglist,                        // 需要预览的图片http链接列表
    })
  },

  // 上(下)一题的按钮
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
    let trueAnswer=[];
    let answerList=this.data.answerList;
    answerList.forEach( (val)=>{
      if( val == '1'){
        trueAnswer.push("A")
      }else if(val=='2'){
        trueAnswer.push("B")
      }else if(val=='3'){
        trueAnswer.push("C")
      }else if(val=='4'){
        trueAnswer.push("D")
      }
    })
    this.setData({
      trueAnswerList:trueAnswer
    })
  },
 
  onLoad: function () {
    this.setData({               // 得到题目列表、题目个数
      questionList:questionData.questionList,
      qusLength:questionData.questionList.length
    })
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
      rankOtherInfo:app.globalData.rankList[otherIndex],   //从排行榜接口获取用户信息 （主要是为了得到头像）
      answerList:app.globalData.rankList[otherIndex].answerCompare.split('')    //从排行榜接口中获得的答案匹配列表
    })
    console.log("answerCompare:",app.globalData.rankList[otherIndex].answerCompare)
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
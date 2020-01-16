// pages/play/play.js
var questionData = require("../../questionData/questionData.js");
const postAnswerResult = require('../../config').postAnswerResult;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

     myChecked:0,
     currentValue:null,//当前选择答案
     current:0,//当前题号
    //  score:0,
     questionList:[], //题的列表
     nowQuestion:[],  
     nowAnswer:[],      //当前答案的列表
     multiIndex:[{checked:false},{checked:false},{checked:false},{checked:false}],
    //  items:questionData.questionList[0].items

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getRandomQuestion();//获取随机问题序列
    // console.log("items");
    // console.log(this.data.item1);
    //获取当前题号
    // var current=this.data.current;
   //获取当前题号对应的题目，并更新
    // console.log(questionData)
    // console.log(questionData.questionList)
    this.setData({
      questionList:questionData.questionList,
    });
  
    
  
  
  },

 //单选和判断函数，选择选项函数
 selectItem(event){
   
    // console.log("selectId:"+parseInt(event.currentTarget.dataset.selectid));
    // if(this.data.nowQuestion.type_id==1||this.data.nowQuestion.type_id==0){
      //type_id为1与0时则进行下列赋值(单选或判断)
    // console.log("看看我有没有进入单选判断");
    // console.log("id"+this.data.nowQuestion.type_id);
    var selectId =parseInt(event.currentTarget.dataset.selectid);//将携带的参数selectid赋值给selectId
   
    this.setData({//在data数据里更新myChecked的值和当前选择的值
      myChecked: selectId,
      currentValue: selectId
    })
   },
  // 下一题next_question函数
  next_question(){
    // 将当前答案放在答案列表里
    // 获取当前题号
   
    let that = this;
    let Answer = that.data.nowAnswer;
    if(that.data.myChecked!=0){
      Answer.push(that.data.currentValue)
      // 将当前题号的答案放入答案列表中
      this.setData({
        nowAnswer: Answer
      })
      console.log(this.data.nowAnswer);
    }
    //下标加1进入下一题
      //判断是否最后一题,解决最后一题无限加分问题
    if (this.data.current >= this.data.questionList.length - 1){
      //为最后一题时，值清零，
      this.setData({
        //多选值清零
        multiIndex:[{checked:false},{checked:false},{checked:false},{checked:false}],
        myChecked: 0,
        //当前选项值清0
        currentValue: this.data.currentValue,
        current:this.data.current
      })
      //弹出结果框
      wx.showModal({
        title: '答题结束',
        content: '将根据你的答题情况为你匹配',
        success(showModRes) {
          if (showModRes.confirm) {
            let result= that.data.nowAnswer.join("")     //将答案转换成字符串
            console.log(result)
            that.postAnswerResult();
           
          } else if (showModRes.cancel) {
            console.log('用户点击取消')
            that.data.nowAnswer.pop();
          }
        },
        fail(){
          wx.showToast({
            title: '请稍后再试，网络出问题啦',
            icon: 'loading',
            duration: 2000
          })
        }
      })
    } else if (this.data.current < this.data.questionList.length-1&&(this.data.myChecked!=0 )){
      this.setData({
        //清零当前多选值
        multiIndex:[{checked:false},{checked:false},{checked:false},{checked:false}],
        current: this.data.current + 1,
        //选项圆点清0
        myChecked :0,
        //当前选项值清0
        currentValue:0,
        
      })
      // //获取更新后下一题current的值来更新当前题目
      // var current=this.data.current;
      // this.setData({
      //   ////更新当前题目
      //   nowQuestion:this.data.questionList[current]
      // })
      // console.log("当前题号为"+this.data.current+"对应的nowQuestion为：");
      // console.log(this.data.nowQuestion);
   
    }
  },

  pre_question(){
    // 判断是第一题还是最后一题
    let Answer = this.data.nowAnswer;
    Answer.pop();
    this.setData({
      current :this.data.current - 1,
    })
    console.log(this.data.nowAnswer);
   
  },
  postAnswerResult(){
    console.log('请求后台')
    let that = this
    wx.request({
      url:postAnswerResult,
      method:"POST",
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId:app.globalData.weixinInfo.userId,
        answer: that.data.nowAnswer.join('')        //将答案转换成字符串提交到后台
      },
      success:function(reqRes){
        if(reqRes.data.code==0){
          if(reqRes.data.data){
            console.log('用户的答案提交成功')
            // app.globalData.answerFlag=true       //是否答过题并提交了答题结果
            wx.switchTab({
              url: '../my/my'
            })
          }else{
            console.log('请求成功但提交失败：',reqRes.data.msg)
          }
        }
      },
      fail:function(res){
        console.log('请求后台接口失败：',res.errMsg)
      }
    })
  },

  // //获取随机问题数列
  // getRandomQuestion(){
  //   //随机
  //   var randomQuestion = questionData.questionList;
  //   // console.log("未打乱前newQuestion");
  //   // console.log(randomQuestion);
  //   randomQuestion.sort(function () { return 0.5 - Math.random(); });
  //   console.log("打乱后newQuestion");
  //   console.log(randomQuestion);
  //   this.setData({
  //     questionList: randomQuestion
  //   })
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
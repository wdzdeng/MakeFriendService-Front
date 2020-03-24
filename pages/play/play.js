// pages/play/play.js
var questionData = require("../../questionData/questionData.js");
const postAnswerResult = require('../../config').postAnswerResult;
const app = getApp();
Page({

  data: {

     myChecked:0,
     currentValue:null,//当前选择答案
     current:0,        //当前题号
     qusLength: null,  //题列表的长度
     questionList:[],  //题的列表
     nowAnswer:[],      //当前答案的列表
    //  multiIndex:[{checked:false},{checked:false},{checked:false},{checked:false}],
    //  items:questionData.questionList[0].items
    //  nowQuestion:[],  
  },

  onLoad: function (options) {
    // this.getRandomQuestion();//获取随机问题序列
    this.setData({
      questionList:questionData.questionList,
      qusLength:questionData.questionList.length
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
      myChecked: selectId,   //目的使单选按钮为true or false
      currentValue: selectId   //当前选择的答案（ABCD用1234来代替）
    })
   },

  //上一题按钮  做的内容：1.将上一题的答案去除， 2.当前索引-1
   pre_question(){
    let Answer = this.data.nowAnswer;
    Answer.pop();
    this.setData({
      current :this.data.current - 1,
    })
    console.log(this.data.nowAnswer);
   
  },

  // 下一题按钮  做的内容：1.将当前答案放在答案列表里， 2.当前索引+1
  next_question(){
    let that = this;
    let Answer = that.data.nowAnswer;
    if(that.data.myChecked!=0){
      Answer.push(that.data.currentValue)
      this.setData({
        nowAnswer: Answer,     // 将当前题号的答案放入答案列表中
        current: this.data.current + 1,  //下标加1进入下一题
        myChecked :0,     //单选选项清0  （圆点）
        currentValue:0,      //当前选项值清0
      })
      console.log(this.data.nowAnswer);
    }
/*    if (this.data.current >= this.data.qusLength - 1){  //这些代码是在这里判断是否最后一题,解决最后一题无限加分问题
      //为最后一题时，值清零，
      this.setData({
        // multiIndex:[{checked:false},{checked:false},{checked:false},{checked:false}],   //多选值清零
        myChecked: 0,
        //当前选项值清0
        currentValue: this.data.currentValue,
        current:this.data.current
      })
    } else if (this.data.current < this.data.questionList.length-1&&(this.data.myChecked!=0 )){
 */   
  },

 
  submit_question(){               //首先判断是否最后一题,解决最后一题无限加分问题
    let that = this;
    let Answer = that.data.nowAnswer;
    if(Answer.length!==that.data.qusLength){  //方法：判断答案的长度与题长是否一样，如果一样，证明是点击过按钮，但是没有提交
      if(that.data.myChecked!=0){         //如果不一样，则最后一题的答案没有放进去，判断最后一题是否作答
        Answer.push(that.data.currentValue)           //如果作答，将答案放进答案列表中
        that.setData({
          nowAnswer: Answer     
        })
        console.log(this.data.nowAnswer);
      }
    }
    // console.log(this.data.nowAnswer);    //只是为了判断是否出错，
    wx.showModal({
      title: '答题结束',
      content: '将根据你的答题情况为你匹配',
      success (res) {                  //用户点击确认，提交答案，否则退回页面
        if (res.confirm) {
          let result= that.data.nowAnswer.join("")     //将答案转换成字符串,console出来自己看
          console.log(result)
          that.postAnswerResult();
        } 
      }
    })
  },
  postAnswerResult(){
    console.log('请求后台');
    let that = this;
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

  // 获取随机问题数列
 /* getRandomQuestion(){
      var randomQuestion = questionData.questionList;
      randomQuestion.sort(function () { return 0.5 - Math.random(); });
      console.log("打乱后newQuestion");
      console.log(randomQuestion);
      this.setData({
        questionList: randomQuestion
      })
    },
  */

  // 用户点击右上角分享
  onShareAppMessage: function () {

  }
})
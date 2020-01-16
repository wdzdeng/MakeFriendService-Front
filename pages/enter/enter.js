// // pages/start/index.js
// const app = getApp();
// const authorizeUrl = require('../../config').authorizeUrl;
// const uploadFileUrl = require('../../config').uploadFileUrl;


// const APP_ID ='wxbc7ad26fc22e64d8';//输入小程序appid  
// const APP_SECRET ='abd2a7ed9c5dd160a434efa8c6124288';//输入小程序app_secret  
// var OPEN_ID=''//储存获取到openid  
// var SESSION_KEY=''//储存获取到session_key 


// Page({

//     /**
//      * 页面的初始数据
//      */
//     data: {
//         userInfo: {},   // 用户信息
//         isLogin: wx.getStorageSync('loginFlag') ? true : false,     // 是否登录，根据后台返回的skey判断,
//         code:''
//         // openid:'',
//         // session_key:''

//     },


//      // 检查本地 storage 中是否有skey登录态标识
//      checkLoginStatus: function() {
//         let that = this;
//         let loginFlag = wx.getStorageSync('loginFlag');

//         if (loginFlag) {
//             // 检查 session_key 是否过期
//             wx.checkSession({
//                 // session_key 有效(未过期)
//                 success: function() {
//                     // 获取用户头像/昵称等信息
//                     // let userInfo = app.globalData.userInfo;
//                     let userStorageInfo = wx.getStorageSync('userInfo');
//                     if(userStorageInfo){
//                         let userinfo = JSON.parse(userStorageInfo);
//                         app.globalData.userInfo = userinfo;
//                         that.setData({
//                             isLogin: true,
//                             userInfo: userinfo
//                         });
//                     }
                   
//                 },

//                 // session_key 已过期
//                 fail: function() {
//                     console.log('session_key 已过期');
//                     that.setData({
//                         isLogin: false
//                     });
//                     that.doLogin();
//                 }
//             });

//         } else {
//             console.log('本地 storage 中没有skey登录态标识');
//             that.setData({
//                 isLogin: false
//             });
//             that.doLogin();
//         }
//     },
//     // 点击授权
//     bindGetUserInfo(e) {
//         wx.showLoading({
//             title: '登录中...',
//             mask: true
//         });
        
//         console.log('点击授权返回的数据',e);
//         this.doLogin(e);
//     },
//     // bindGetUserInfo(res, callback = () => {} ) {
//     //     let info = res.detail;
//     //     let that = this;
//     //     wx.showLoading({
//     //         title: '登录中...',
//     //         mask: true
//     //     });
//     //     app.doLogin2(info,that.getUserInfo);
//     // },

//     getUserInfo: function() {
//         let that = this;
//         let userInfo = app.globalData.userInfo;
//         console.info('userInfo is:', userInfo);
//         if (userInfo) {
//             that.setData({
//                 hasLogin: true,
//                 userInfo: userInfo
//             });
//             wx.hideLoading();
//         } else {
//             console.log('globalData中userInfo为空');
//         }
//     },

//     // // 点击授权
//     doLogin(e) {
//         // console.log(e)
//         // console.log('e.detai.',e.detail)
//         let info = e.detail;
//         let that = this;
//         if(info.userInfo){
//             console.log("同意授权，info：",info.userInfo);
//             wx.login({  
//                 success:function(loginRes){  
//                     console.log(loginRes.code);
//                     that.setData({
//                         code:loginRes.code
//                     })
//                     // wx.request({
//                     //     url: authorizeUrl,
//                     //     method:"GET",
//                     //     // header: {
//                     //     //     'Content-Type': 'application/x-www-form-urlencoded'
//                     //     // },
//                     //     data:{
//                     //         // code: loginRes.code,                    // 临时登录凭证
//                     //         // rawData: info.rawData,               // 用户非敏感信息
//                     //         // signature: info.signature,           // 签名
//                     //         // encryptedData: info.encryptedData,   // 用户敏感信息
//                     //         // iv: info.iv 
//                     //         code:loginRes.code, 
//                     //         // headUrl:info.userInfo.avatarUrl,
//                     //         // nickName:info.userInfo.nickName,
//                     //     },
//                     //     success:function(requestRes){
//                     //         console.log('login success');
//                     //         console.log(res);
                            
//                     //         // if(res.code == 0){
//                     //             app.globalData.userInfo = info.userInfo;
//                     //             that.setData({
//                     //                 userInfo: app.globalData.userInfo
//                     //             })
//                     //             wx.setStorageSync('userInfo',JSON.stringify(info.userInfo));
//                     //             wx.setStorageSync('loginFlag',requestRes.data.session_key);
//                     //             // callback();
//                     //             console.log('服务器请求后globalData:',app.globalData.userInfo)
//                     //         // }else{
//                     //         //     that.showInfo(res.errmsg);
//                     //         //     console.log("请求后台出错")
//                     //         // }
//                     //     },
//                     //     fail: function (msg) {
//                     //         // 调用服务端登录接口失败
//                     //         that.showInfo('调用服务器接口失败');
//                     //         console.log(msg);
//                     //     }
//                     // })


//                         app.globalData.userInfo =info.userInfo;
//                         wx.setStorageSync('userInfo',JSON.stringify(info.userInfo));
//                         wx.setStorageSync('loginFlag','loginFlag');
//                         that.setData({
//                             userInfo:info.userInfo
//                         })
//                         wx.hideLoading();
//                        console.log("Page.userInfo:",that.data.userInfo);

//                 },
//                 fail: function (error) {
//                     // 调用 wx.login 接口失败
//                     that.showInfo('login接口调用失败');
//                     console.log(error);
//                 }  
//             }) 
//         }else{
//             console.log('拒绝授权');
//             wx.showModal({
//                 title:'警告',
//                 content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
//                 showCancel:false,
//                 confirmText:'返回授权',
//                 success:function(res){
//                     if (res.confirm) {
//                         console.log('用户点击了“返回授权”');
//                         checkUserInfoPermission();
//                     } 
//                 }
//             })
//         }
//     },


//     // 检查用户信息授权设置
//     checkUserInfoPermission: function (callback = () => { }) {
//         wx.getSetting({
//             success: function (res) {
//                 if (!res.authSetting['scope.userInfo']) {
//                     wx.openSetting({
//                         success: function (authSetting) {
//                             console.log(authSetting)
//                         }
//                     });
//                 }
//             },
//             fail: function (error) {
//                 console.log(error);
//             }
//         });
//     },

//      // 封装 wx.showToast 方法
//      showInfo: function (info = 'error', icon = 'none') {
//         wx.showToast({
//             title: info,
//             icon: icon,
//             duration: 1500,
//             mask: true
//         });
//     },


//     goSign() {
//         // console.log(this.data.code)
//       wx.reLaunch({
//         url: '/pages/begin/begin',
//       })
//     },
    
//     goAnswer() {
//         wx.navigateTo({
//             url: '../play/play',
//         })
//     },

//     goMyInfo() {
//         console.log('点击')
//         wx.reLaunch({
//             url: '/pages/my/my',
//           })
//     },

  

//     onLoad: function() {
//         this.checkLoginStatus();
//     },

//     onShow: function() {
//         console.log("onshow前：globalData.userInfo：",app.globalData.userInfo)
//         console.log("onshow前：userInfo：",this.userInfo)
//         let that = this;
//         this.setData({
//             userInfo: app.globalData.userInfo
//         });
//         console.log("onshow后：globalData.userInfo：",app.globalData.userInfo)
//         console.log("onshow后：userInfo：",this.userInfo)
//         let uInfo = that.userInfo
//         if(uInfo){
//             wx.showTabBar({
//                 animation:true
//             })
//         }else{
//             wx.hideTabBar({
//                 // animation:false
//             })
//         }
//     }

//   })


// //   关于globalData：
// //   页面中：
// //   1、获得App：const app = getAPP();
// //   2、修改globalData的值：app.globalData.** =**;
// //   3、获取: var getAppInfo = app.globalData.**



// const app = getApp();
const app = getApp();
const silentLoginUrl = require('../../config').silentLoginUrl;
const checkInfoIntegrity = require('../../config').checkInfoIntegrity;
const loginUrl = require('../../config').loginUrl;

// avatarUrl: undefined
// city: "抚顺市"
// gender: 2
// headUrl: "https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132"
// nickName: "君。"
// openId: "onbGB4uML8CsX7nKF8res0sYI87k"
// province: "辽宁省"
// userId: 10006


// const APP_ID ='wxbc7ad26fc22e64d8';//输入小程序appid  
// const APP_SECRET ='abd2a7ed9c5dd160a434efa8c6124288';//输入小程序app_secret  
// var OPEN_ID=''//储存获取到openid  
// var SESSION_KEY=''//储存获取到session_key 
Page({
  data: {
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    //   canIUse: wx.canIUse('button.open-type.getUserInfo')
    isHide:true,
    weixinInfo:null,
    // userInfo:{
    //     city: "抚顺市",
    //     gender: 2,
    //     headUrl: "https://wx.qlogo.cn/mmopen/vi_32/MLFkN5riaDqoxic80icfWEO7EictwDPRubPNINXiaMwDslLw7022MEb4SuFicESW9iaE8YmkpVYNjibZfauO4ybJEKqBnA/132",
    //     nickName: "君。",
    //     openId: "onbGB4uML8CsX7nKF8res0sYI87k",
    //     province: "辽宁省",
    //     userId: 10006,
    // }
  },
  onLoad: function () {
    var that = this;
    console.log("enter.load")
    that.checkUserInfoPermission();
    // 查看是否授权
   
  },
//   checkUserInfoPermission:function(){
//     let that = this;
//     wx.getSetting({
//       success: function (res) {
//         if (res.authSetting['scope.userInfo']) {
//           wx.login({
//             success: function (loginRes) {
//               //从数据库获取用户信息
//               that.silentLogin(loginRes);
//             }
//           });
//         }else{
//             that.data.isHide = true
//         }
//       }
//     })
//   },
  checkUserInfoPermission:function(){
    let that = this;
    console.log('首先静默登录')
    wx.login({
        success: function (loginRes) {
            //从数据库获取用户信息
            that.silentLogin(loginRes);
        },
        fail:function(res){
          console.log("wx.login失败,msg:,",res.errMsg)
        }
    });
  },
  //静默登录，   获取用户信息接口
  silentLogin: function (loginRes) {
    let that = this;
    wx.request({
        url: silentLoginUrl,
        method:"GET",
        data: {
            code:loginRes.code
        },
        // header: {
        //     'content-type': 'application/x-www-form-urlencoded'
        // },
        success: function (res) {
            console.log(res)
            if(res.data.code==0){
                if(res.data.data.isSuccess){
                    // app.globalData.userInfo=res.data.data.data,
                    that.setData({
                        weixinInfo:res.data.data.data,    //所有信息
                        isHide:false
                    })
                    console.log("静默登录成功")
                }else{
                    // app.globalData.userInfo=res.data.data.data,
                    that.setData({
                        isHide:true
                    })
                    console.log("静默登录失败,重新登录")
                }
                app.globalData.weixinInfo=res.data.data.data,  //如果登录过isSuccess=true：返回所有用户信息，如果没登录过：返回用户openid
                console.log("app.weixinInfo:",app.globalData.weixinInfo,"isHide:",that.data.isHide)
            }else{
                console.log("静默登录request成功，code=2，返回msg：",res.data.msg)
                app.globalData.weixinInfo=res.data.data.data,
                that.setData({
                    isHide:true
                })
                console.log("app",app.globalData.weixinInfo)
            }
        },
        fail:function(res){
            console.log('静默登录fail，res：',res.errMsg)
        }
    })
  },
  bindGetUserInfo: function (userRes) {
    let that = this;
      if (userRes.detail.userInfo) {
        //用户按了允许授权按钮
        console.log("userRes.detail.userInfo",userRes.detail.userInfo),
            // app.globalData.userInfo=that.data.userInfo
            // that.setData({
            //     isHide:false,
            // })
        wx.login({
          success:function(loginRes){
            wx.request({
              url: loginUrl,
              method:"POST",
              header: { 'Content-Type': 'application/json' },
                // 'content-type': 'application/x-www-form-urlencoded'
              data: {
                // code:loginRes,
                openId: app.globalData.weixinInfo.openId,
                nickName: userRes.detail.userInfo.nickName,
                headUrl: userRes.detail.userInfo.avatarUrl,
                gender: userRes.detail.userInfo.gender,
                province:userRes.detail.userInfo.province,
                city: userRes.detail.userInfo.city
              },
              
              success: function (res) {
                console.log("登录返回：",res)
                if(res.data.code==0){
                    app.globalData.weixinInfo=res.data.data
                    that.setData({
                        isHide:false,
                        weixinInfo:app.globalData.weixinInfo
                    })
                    console.log("授权登录成功，code=0，app.userInfo:",app.globalData.weixinInfo)
                    console.log("授权登录成功，code=0，userInfo:",that.data.weixinInfo)
                }else{
                    console.log("授权登录，code=1",res.data.msg)
                }
              },
              fail:function(res){
                  console.log("登陆request失败",res.errMsg)
              }
            })
          },
          fail:function(res){
            console.log("login登录失败：",res.errMsg)
          }
        })
      } else {
        //用户按了拒绝按钮
        wx.showModal({
          title:'警告',
          content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel:false,
          confirmText:'返回授权',
          success:function(res){
            if (res.confirm) {
              console.log('用户点击了“返回授权”')
            } 
          }
        })
      }
  },
  
  goAnswer:function() {
    wx.request({
      url:checkInfoIntegrity,     //进入答题前校验，如果填写过信息，去答题；否则去填写信息
      data:{
        userId:app.globalData.weixinInfo.userId
      },
      method:"GET",
      success:function(RequstRes){
        console.log(RequstRes)
        if(RequstRes.data.code==0){
          wx.navigateTo({
            url: '../play/play'   //填写过信息，转答题
          })
        }else{
            wx.showToast({
              title: '请填写个人信息',
              icon: 'loading',
              duration: 1000
            })
            wx.switchTab({
              url: '../my/my'     //没有填写过信息，转去填写信息
            })
          }
      },
      fail:function(res){
        console.log(res.errMsg)
      }
    })
    
  },
  onShow: function() {
        // console.log("onshow前：globalData.userInfo：",app.globalData.userInfo)
        // console.log("onshow前：userInfo：",this.userInfo)
        let that = this;
        this.setData({
          weixinInfo: app.globalData.weixinInfo
        });
        // console.log("onshow后：globalData.userInfo：",app.globalData.userInfo)
        // console.log("onshow后：userInfo：",this.userInfo)
        let isHide = that.isHide
        if(!isHide){
            wx.showTabBar({
                animation:true
            })
        }else{
            wx.hideTabBar({
                // animation:false
            })
        }
    }
  
})


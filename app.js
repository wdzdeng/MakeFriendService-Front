// //app.js
// App({
//   onLaunch: function () {
//     // 展示本地存储能力
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)

//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       }
//     })
//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               // 可以将 res 发送给后台解码出 unionId
//               this.globalData.userInfo = res.userInfo

//               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//               // 所以此处加入 callback 以防止这种情况
//               if (this.userInfoReadyCallback) {
//                 this.userInfoReadyCallback(res)
//               }
//             }
//           })
//         }
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
// })
// const authorizeUrl = require('./config').authorizeUrl;
// const uploadFileUrl = require('./config').uploadFileUrl;

// const APP_ID ='wxbc7ad26fc22e64d8';//输入小程序appid  
// const APP_SECRET ='abd2a7ed9c5dd160a434efa8c6124288';//输入小程序app_secret  
// var OPEN_ID=''//储存获取到openid  
// var SESSION_KEY=''//储存获取到session_key 

App({
  onLaunch:function(){
    let that = this;
    console.log('检查登录状态');
    console.log('进入enter页');
    // 检查登录状态
    // that.checkLoginStatus();
  },

  // checkLoginStatus:function(){
  //   let that = this;
  //   // 检查本地storage中是否有登录态标识
  //   console.log('检查本地storage中是否有登录态标识');
  //   let loginFlag = wx.getStorageSync('loginFlag');
  //   if(loginFlag){
  //      // 若有，检查session_key是否过期
  //      wx.checkSession({
  //         // 若没有过期，从storage中获取用户信息
  //         success:function(){
  //           let userStorageInfo = wx.getStorageSync('userInfo');
  //           if(userStorageInfo){   
  //             // 若获得，设globalData
  //             that.globalData.userInfo = JSON.parse(userStorageInfo);
  //           }else{  
  //             // 若没有，设置showToast
  //             that.showInfo('缓存信息缺失');
  //             console.error('登录成功后将用户信息存在Storage的userStorageInfo字段中，该字段丢失')
  //           }
  //         },
  //         // 若过期，从新登录
  //         fail:function(){
  //           console.log('session_key过期，重新登录');
  //           that.doLogin();
  //         }
  //      });
  //   }else{
  //     // 若没有登录态，重新登录
  //     console.log('没有登录态loginFlag，重新登录');
  //     that.doLogin();
  //   }
  // },
  // // doLogin:function(){
  // //   let info = this.getUser().detail;
  // //   this.doLogin2(info);
  // // },
  // // getUser(){
  // //   wx.getUserInfo({
  // //     success(res){
  // //       // let res = res.detail;
  // //     }
  // //   })
  // // },
  // // doLogin2:function(info,callback = () => {}){
  // //   let that = this;
  // //   if(info.userInfo){
  // //     console.log("同意授权");
  // //     console.log("info.userInfo:",info.userInfo);
  // //     wx.login({  
  // //         success:function(loginRes){  
  // //           wx.request({  
  // //               //获取openid接口  
  // //             url: 'https://api.weixin.qq.com/sns/jscode2session',  
  // //             data:{  
  // //               appid:APP_ID,  
  // //               secret:APP_SECRET,  
  // //               js_code:loginRes.code,  
  // //               grant_type:'authorization_code'  
  // //             },  
  // //             method:'GET',  
  // //             success:function(openidRes){  
  // //             //   console.log("res:",openidRes)  
  // //             //   console.log("res.data:",openidRes.data)  
  // //               OPEN_ID = openidRes.data.openid;//获取到的openid  
  // //               SESSION_KEY = openidRes.data.session_key;//获取到session_key  
  // //             //   console.log("OPEN_ID:",OPEN_ID)  
  // //             //   console.log("SESSION_KEY:",SESSION_KEY) 
  // //               that.globalData.OPEN_ID=OPEN_ID;
  // //               that.globalData.SESSION_KEY=SESSION_KEY;
  // //             //   console.log("app.OPEN_ID:",app.globalData.OPEN_ID)  
  // //             //   console.log("app.SESSION_KEY:",app.globalData.SESSION_KEY) 
  // //               that.globalData.openid = openidRes.data.openid.substr(0, 10) + '********' + openidRes.data.openid.substr(openidRes.data.openid.length - 8, openidRes.data.openid.length),  
  // //               that.globalData.session_key = openidRes.data.session_key.substr(0, 8) + '********' + openidRes.data.session_key.substr(openidRes.data.session_key.length - 6, openidRes.data.session_key.length)  
  // //               //   console.log("openid:",that.data.openid)  
  // //                 //   console.log("session_key:",that.data.session_key)  
                
  // //               wx.request({
  // //                 url: authorizeUrl,
  // //                 method:"POST",
  // //                 header: {
  // //                   'Content-Type': 'application/x-www-form-urlencoded'
  // //                 },
  // //                 data:{
  // //                   code:loginRes.code, 
  // //                   headUrl:info.userInfo.avatarUrl,
  // //                   nickName:info.userInfo.nickName,
  // //                 },
  // //                 success:function(res){
  // //                   console.log('login success');
  // //                   console.log(res);
                    
  // //                   // if(res.code == 0){
  // //                     that.globalData.userInfo = info.userInfo;
  // //                       // that.setData({
  // //                       //     userInfo: app.globalData.userInfo
  // //                       // })
  // //                       wx.setStorageSync('userInfo',JSON.stringify(info.userInfo));
  // //                       wx.setStorageSync('loginFlag',that.globalData.session_key);
  // //                       wx.setStorageSync('unionIdLocal',res.data);
  // //                       callback();
  // //                       console.log('app.globalData.userInfo:',that.globalData.userInfo)
  // //                   // }else{
  // //                   //     that.showInfo(res.errmsg);
  // //                   //     console.log("请求后台出错")
  // //                   // }
  // //                 },
  // //                 fail: function (msg) {
  // //                   // 调用服务端登录接口失败
  // //                   that.showInfo('调用后台服务器接口失败');
  // //                   console.log(msg);
  // //                 }
  // //               })
  // //             },
  // //             fail:function(error){
  // //               that.showInfo('openid接口调用失败');
  // //               console.log(error);
  // //             }  
  // //           })  
  // //         },
  // //         fail: function (error) {
  // //           // 调用 wx.login 接口失败
  // //           that.showInfo('接口调用失败');
  // //           console.log(error);
  // //         }  
  // //       })
  // //     }else{
  // //       console.log('拒绝授权');
  // //       wx.showModal({
  // //           title:'警告',
  // //           content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
  // //           showCancel:false,
  // //           confirmText:'返回授权',
  // //           success:function(res){
  // //             if (res.confirm) {
  // //                 console.log('用户点击了“返回授权”');
  // //                 checkUserInfoPermission();
  // //             } 
  // //           }
  // //       })
  // //     }
  // //   },
  
  // doLogin:function(callback = () => {}){    //为什么会有回调函数
  //   let that = this;
  //   wx.login({
  //     success:function(loginRes){
  //       console.log('执行wx.login');
  //       if(loginRes.code){
  //         console.log('有code：',loginRes.code);
  //         /* 
  //           * @desc: 获取用户信息 期望数据如下 
  //           *
  //           * @param: userInfo       [Object]
  //           * @param: rawData        [String]
  //           * @param: signature      [String]
  //           * @param: encryptedData  [String]
  //           * @param: iv             [String]
  //           **/
  //         wx.getUserInfo({
  //           withCredentials: true,
  //           success:function(infoRes){
  //             console.log("infoRes:",infoRes,"执行wx.request");
  //             // 请求服务器端用户接口
  //             // wx.request({
  //             //   url: api.loginUrl,
  //             //   data: {
  //             //     code: loginRes.code,                    // 临时登录凭证
  //             //     rawData: infoRes.rawData,               // 用户非敏感信息
  //             //     signature: infoRes.signature,           // 签名
  //             //     encryptedData: infoRes.encryptedData,   // 用户敏感信息
  //             //     iv: infoRes.iv                       
  //             //   },
  //             //   success:function(res){
  //             //     console.log('login success');
  //             //     res = res.data;

  //             //     if(res.result == 0){     //?
  //             //       // that.golbalData.userInfo =res.userInfo;
  //             //       that.golbalData.userInfo =loginRes.userInfo;
  //             //       wx.setStarageSync('userInfo',JSON.stringify(loginRes.userInfo));
  //             //       wx.setStorageSync('loginFlag',res.skey);
  //             //       callback();                         //? wx.getUserInfo的cccess中有callback
  //             //     }else{
  //             //       that.showInfo(res.errmsg)
  //             //     }
  //             //   },
  //             //   fail: function (error) {
  //             //     // 调用服务端登录接口失败
  //             //     that.showInfo('调用接口失败');
  //             //     console.log(error);
  //             //   }
  //             // })

  //             that.globalData.userInfo =infoRes.userInfo;
  //             wx.setStorageSync('userInfo',JSON.stringify(infoRes.userInfo));
  //             wx.setStorageSync('loginFlag','loginFlag');
  //             console.log("globalData:",that.globalData.userInfo);

  //           },
  //           fail:function(){
  //             // 获取 userInfo 失败，去检查是否未开启权限
  //             // wx.hideLoading();
  //             that.checkUserInfoPermission();
  //             console.log('获取 userInfo 失败，去检查是否未开启权限')
  //           }
  //         })
  //       }else{
  //         // 获取code失败
  //         that.showInfo('登录失败');
  //         console.log('调用wx.login获取code失败');
  //       }
  //     },

  //     fail:function(error){
  //       // 调用wx.login接口失败
  //       that.showInfo('接口调用失败');
  //       console.log(error);
  //     }
  //   })
  // },
  // //   // 登录
  // //   //   成功：
  // //   //     如果存在code
  // //   //       获取用户信息如果成功：
  // //   //         如果成功：请求服务器端用户接口

  // //   //         如果失败：调用服务器端接口失败
  // //   //       如果失败：获取userInfo失败
  // //   //     如果失败：获取code失败
  // //   //   失败：调用wx.login接口失败


  //  // 检查用户信息授权设置
  // checkUserInfoPermission:function(){
  //   wx.getSetting({
  //     success:function(res){
  //       if(!res.authSetting['scope.userInfo']){
  //         wx.openSetting({
  //           success:function(authSetting){
  //             console.log(authSetting)
  //           }
  //         });
  //       }
  //     },
  //     fail:function(error){
  //       console.log(error);
  //     }
  //   });
  // },

  // // 获取用户登录标示 供全局调用
  // getLoginFlag:function(){
  //   return wx.getStorageSync('loginFlag');
  // },

  // // 封装 wx.showToast 方法
  // showInfo: function( info= 'error', icon = 'none'){
  //   wx.showToast({
  //     title: info,
  //     icon: icon,
  //     duration: 1500,
  //     mast: true
  //   });
  // },

  // app全局数据
  globalData:{
    weixinInfo:null,
    userInfo: null,
    rankList:{},   // 排行榜
    otherIndex:0,    //排行榜第几个人的索引
  }
})
const upPerInfoUrl = require('../../config').upPerInfoUrl;
const getPerInfoUrl = require('../../config').getPerInfoUrl;
const checkRankList = require('../../config').checkRankList;
const checkInfoIntegrity = require('../../config').checkInfoIntegrity;
var areaData = require("../../areaData/areaData.js");    //导入对方省市
var ageLimit = require("../../areaData/ageLimit.js");   //导入对方年龄限制   CommonJS
// import { expectAge } from "../../areaData/ageLimit.js";   //导入对方年龄限制  es6
var list =[]

const app = getApp();

Page({
    data: {
        // isLogin: wx.getStorageSync('loginFlag')
        // isLogin: wx.getStorageSync('userInfo')
        //     ? true 
        //     : false  ,   // 是否登录，根据后台返回的skey判断

        getInfoFlag:false,  //请求查看个人信息标识
        weixinInfo:{},       //从微信获取的用户数据
        // userInfo:{},         //从后台获取的用户数据 ，没有头像 
        headUrl:'',
        name:'',
        gender:"",      
        array: ['男', '女'],    //设置 picker 组件的性别属性
        genderIndex: 0,       
        date:"",                //设置 picker 组件的出生年月属性
        region:[],
        multiIndex: [null, null],
        multiArray:areaData.proviceList,
        objectMultiArray:areaData.cityList,
        expectAge:ageLimit.expectAge,    //关于对方的年龄限制  CommonJs
        // expectAge,    //关于对方的年龄限制                   ES6
        upperIndex:null,
        lowerIndex:null,
        weichat:null,
        qq:null,
        signature:null,
        expectProvince:null,
        expectCity:null,
        expectGender:null,
        expectCapYear:null,
        expectLowerYear:null,
        matchArray:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],   //关于匹配度
        matchIndex:0,
        expectMatch:null,          //要上传的匹配度值  matchIndex+'0'  10 20 30...
    },

    //预览头像。新页面中全屏预览图片
    previewImage:function(){
        let myheadUrl = this.data.weixinInfo.headUrl;
        let imglist =[];
        imglist.push(myheadUrl)
        wx.previewImage({
            current: myheadUrl,                   // 当前显示图片的http链接
            urls: imglist,                        // 需要预览的图片http链接列表
            // success:function(){              
            //     wx.saveImageToPhotosAlbum({       //保存头像
            //         success(res) { 
            //             console.log(res)
            //         }
            //     }),
            //     wx.chooseImage({                           //更改头像
            //         count: 1, // 默认9 
            //         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
            //         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
            //         success: function (res) {
            //           // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
            //           that.setData({
            //               headUrl: res.tempFilePaths
            //           })
            //         }
            //     })
            // }
        })
    },

    // checkLoginStatus: function() {
    //     console.log('检查storage中有是否有skey登录态标识');
    //     let that = this;

    //     let userStorageInfo = wx.getStorageSync('userInfo');
    //     if(userStorageInfo){   
    //         // 若获得，设globalData
    //         console.log("userStorageInfo:",userStorageInfo);
    //         that.setData({
    //             userInfo:JSON.parse(userStorageInfo)
    //         })
    //     }else{  
    //         // 若没有，设置showToast
    //         // that.showInfo('缓存信息缺失');
    //         console.error('登录成功后将用户信息存在Storage的userStorageInfo字段中，该字段丢失')
    //     }

    // },

    // 上半部分
/*    //点击查看排行榜，请求排行榜url，如有数据跳转显示，没有数据则显示提示框
    goRankList:function(){
        wx.request({
            url:checkRankList,
            data:{
              userId:this.data.weixinInfo.userId
            },
            method:"GET",
            success:function(res){
                if(res.data.code==0){
                    app.globalData.rankList=res.data.data  //如有数据，返回的是数组，里面每一个对象包含用户基本信息，有头像
                    wx.navigateTo({                  
                        url:'../rankList/rankList'
                    })
                    console.log("有排行榜信息，跳转：",res)
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1000
                      })
                }
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
  */
    goRankList:function(){
        wx.navigateTo({                  
            url:'../rankList/rankList'
        })
    },
    goAboutUs:function(){
        wx.showModal({
            title:"关于我们",
            content:"本程序仅供学习和参考，请勿用于商用，如有问题，请联系QQ：6666666,微信：8888",
            showCancel:false,

        })
    },


    // 下半部分---我的基本信息  
    // 主要是修改个人资料，这部分的数据先修改在页面变量内，最后一起post到服务器
    bindNameChange:function(e){
        this.setData({
            name:e.detail.value
        })
    },
    bindGenderChange:function(e){
        console.log(e.detail.value)
        this.setData({
            genderIndex:e.detail.value
        })
    },
    bindDateChange:function(e){
        console.log(e);
        this.setData({
            date:e.detail.value       //直接就是日期数，不是索引
        })
    },
    bindRegionChange:function(e){
        console.log(e.detail.value)
        this.setData({
            region:e.detail.value
        })
    },
    bindWeichat:function(e){
        console.log(e)
        this.setData({
            weichat:e.detail.value
        })
    },
    bindQQ:function(e){
        // if(typeof(e.detail.value)!=='number'){
        // 判断一串字符是不是全部是数字
        var rex = /^[0-9]+$/;//正则表达式
        var flag = rex.test(e.detail.value);//通过表达式进行匹配
        if(!flag){
            wx.showToast({
                title: '请输入正确的qq格式',
                icon: 'loading',
                duration: 1000,
                mask:true
            })
            this.setData({     //如果格式错误，清空输入框
                qq:null
            })
        }else{
            this.setData({
                qq:e.detail.value
            })
        }
    },
    bindTextarea:function(e){  //e是事件对象，包含关于这个元素的某些属性   e.detail 包含关于输入的相关内容
        // console.log(e)
        if(e.detail.cursor>12){              //e.detail.cursor 输入内容的长度，如果设maxlenght属性的话
            wx.showToast({
                title: '只能输入12个字哦~',
                icon: 'loading',
                duration: 1000,
                mask:true
            })
        }
        this.setData({
            signature:e.detail.value      //e.detail.value 输入内容
        })
    },
    bindExpectGender:function(e){
        var genderindex = parseInt(e.detail.value)
        this.setData({
            expectGender:genderindex
        })
        console.log(this.data.expectGender+1)
    },
    bindExpectProvince: function (e) {
        let that= this;
        that.setData({
            "multiIndex[0]": e.detail.value[0],
            "multiIndex[1]": e.detail.value[1]
        })
        that.setData({
            // expectProvince:this.data.multiArray[0][this.data.multiIndex[0]],
            // expectCity:this.data.multiArray[1][this.data.multiIndex[1]]    //存储的是城市名字，这样get后不容易得到索引值并显示在页面上
            expectProvince:this.data.multiIndex[0],
            expectCity:this.data.multiIndex[1]   //存储的是索引，这样get得到了索引，再根据multiIndex[0] 获得 multiArray[1] 就可以显示在页面上了
        }) 
        // console.log(this.data.multiArray) 
        // console.log(this.data.multiIndex) 
    },
    bindMultiPickerColumnChange: function (e) {
        let that= this;
        console.log(e)
        switch (e.detail.column) {
            case 0:
            list = []
            for (var i = 0; i < that.data.objectMultiArray.length; i++) {
                if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) {  //parid对象层级,regid对象索引 
                list.push(that.data.objectMultiArray[i].regname)   //regname对象名字
                }
            }
            that.setData({
                "multiArray[1]": list,
                "multiIndex[0]": e.detail.value,
                "multiIndex[1]": 0
            })

        }
    },
    //对方的年龄限制
    bindExpectUpperAge:function(e){
        this.setData({
            upperIndex: e.detail.value
        })
    },
    bindExpectLowerAge:function(e){
        this.setData({
            lowerIndex: e.detail.value
        })
    },
    bindExpectMatch:function(e){
        // console.log(e)
        var matchindex =e.detail.value
        this.setData({
            matchIndex:matchindex,
            expectMatch:matchindex+'0'     //以10 20 这种形式存储
        })
        // console.log(this.data.expectMatch)
    },

    submit:function(){
        let that = this
        console.log(that.data.date)
        if(!that.data.name){                      //检验必填信息是否填写了
            wx.showToast({
            title: '请输入昵称',
            icon: 'loading',
            duration: 1000
            })
        }
        else if(!that.data.date){
            wx.showToast({
            title: '请输入出生年月',
            icon: 'loading',
            duration: 1000
            })
        }

        // else if((that.data.genderIndex)!==0 || (that.data.genderIndex)!=1){
        //     console.log("that.data.genderIndex,",that.data.genderIndex)
        //     wx.showToast({
        //     title: '请选择性别',
        //     icon: 'loading',
        //     duration: 1000
        //     })
        // }
       
        else if(!that.data.region[0] && !that.data.region[0]){
            wx.showToast({
            title: '请输入地区',
            icon: 'loading',
            duration: 1000
            })
        }
        else{                              //必填信息都填写了，上传所有信息
            wx.request({
                url:upPerInfoUrl,
                method:"POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data:{
                    userId:app.globalData.weixinInfo.userId,
                    headUrl: that.data.headUrl,
                    name:that.data.name,
                    birthday:that.data.date,
                    gender:that.data.genderIndex+1,
                    province:that.data.region[0],
                    city:that.data.region[1],
                    signature:that.data.signature,
                    weichat:that.data.weichat,
                    qq:that.data.qq,
                    expectProvince:that.data.expectProvince,
                    expectCity:that.data.expectCity,
                    expectGender:that.data.expectGender+1,
                    expectCapYear:that.data.expectAge[that.data.upperIndex],
                    expectLowerYear:that.data.expectAge[that.data.lowerIndex],
                    expectMatch:that.data.expectMatch
                },
                success:function(res){
                    console.log(res)
                    if(res.data.code==0){
                        console.log('上传信息成功')
                        wx.showToast({
                            title: "保存成功啦",
                            icon: 'loading',
                            duration: 1000
                        })
                    }else{
                        console.log('长传信息失败，服务器发回提示信息：',res.data.msg)
                        wx.showToast({
                            title: "保存失败，再试试~",
                            icon: 'loading',
                            duration: 1000
                        })
                    }
                },
                fail:function(res){
                    console.log('请求上传信息失败',res.errMsg)
                    wx.showToast({
                        title: "网络出问题啦，稍后再试试~",
                        icon: 'none',
                        duration: 1000
                    })
                }
            })
        }
    },
    btnSubmit:function(){
        this.submit();
    },
    btnGoAnswer:function(){
        let that=this;
        wx.request({
          url:checkInfoIntegrity,     //进入答题前校验，如果填写过信息，去答题；否则去填写信息
          data:{
            userId:app.globalData.weixinInfo.userId
          },
          method:"GET",
          success:function(RequstRes){
            console.log("答题前校验返回的信息：",RequstRes)
            if(RequstRes.data.code==0){  //填写过信息且没有答题，转答题
              wx.navigateTo({
                url: '../play/play'   
              })
            }else if(RequstRes.data.code==-1){   //没有填写过信息，或完成答题
              that.showMessage(RequstRes.data.msg)
            }
          },
          fail:function(res){
            console.log(res.errMsg)
          }
        })
    },
    // btnGoAnswer:function(){
    //     wx.navigateTo({
    //         url: '../play/play'   
    //     })
    // },

    showMessage: function(message){
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 1000,
        })
      },

    // 请求服务器--获取用户信息
    getUserInfo:function(){
        let that = this;
        let upIndex =null;
        let lowIndex =null;
        let list =[];
        wx.request({
            url:getPerInfoUrl,
            method:"GET",
            data:{
                userId:that.data.weixinInfo.userId
            },
            success:function(res){
                 if(res.data.code==0){
                    app.globalData.userInfo=res.data.data
                    that.setData({
                        // headUrl: res.data.headUrl,     查看用户信息的请求返回数据中没有头像
                        headUrl:that.data.weixinInfo.headUrl,    //头像要在微信返回的数据中取出
                        name:res.data.data.name,
                        date:res.data.data.birthday,
                        genderIndex:res.data.data.gender-1,
                        'region[0]':res.data.data.province,
                        'region[1]':res.data.data.city,
                        signature:res.data.data.signature,
                        weichat:res.data.data.weichat,
                        qq:res.data.data.qq,
                        'multiIndex[0]':res.data.data.expectProvince,
                        'multiIndex[1]':res.data.data.expectCity,
                        // expectProvince:res.data.data.expectProvince,
                        // expectCity:res.data.data.expectCity,
                        expectGender:res.data.data.expectGender-1,
                        expectCapYear:res.data.data.expectCapYear,    //这里输入的数据为具体的出生日期，比如1995
                        expectLowerYear:res.data.data.expectLowerYear,
                        expectMatch:res.data.data.expectMatch,
                        getInfoFlag:true  //请求查看个人信息 过一次，后续不再请求(这个应该是有信息true 还是有没有都true)
                    })
                    that.data.expectAge.forEach( (val,index)=>{     //为了将其显示出来，将具体的出生日期转换为在出生日期列表中的索引，
                        if(val ==  that.data.expectCapYear) upIndex = index
                        if(val ==  that.data.expectLowerYear)  lowIndex = index
                    })
                    that.setData({
                        upperIndex:upIndex,
                        lowerIndex:lowIndex
                    })
                    // console.log(that.data.multiIndex[0])
                    // console.log(that.data.objectMultiArray[that.data.multiIndex[0]])
                    for (var i = 0; i < that.data.objectMultiArray.length; i++) {  //为了将期望住址显示出来，根据 multiIndex 索引获取 multiArray[1](省城的列表)
                        if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[that.data.multiIndex[0]].regid) {  //parid对象层级,regid对象索引 
                        list.push(that.data.objectMultiArray[i].regname)   //regname对象名字
                        }
                    }
                    that.setData({
                        "multiArray[1]": list,
                    })

                    console.log('请求个人信息成功',res)
                 }else{
                    console.log('第一次登录，后台没有个人信息',res)
                    that.setData({
                        // userInfo: app.globalData.userInfo,
                        name:app.globalData.weixinInfo.nickName,
                        headUrl:app.globalData.weixinInfo.headUrl,
                        'region[0]':app.globalData.weixinInfo.province,
                        'region[1]':app.globalData.weixinInfo.city,
                        genderIndex:app.globalData.weixinInfo.gender-1
                    });
                 }
                 
            },
            fail:function(res){
                console.log("请求个人信息失败",res.errMsg)
            }
            
        })
    },
    onLoad: function() {
    //    console.log("onLoad前App.info",app.globalData.userInfo);
       this.setData({
        weixinInfo:app.globalData.weixinInfo     //将微信返回的用户信息存储在本页内，（目的是取其中的头像）
       })
       this.getUserInfo();
    //    console.log("onLoad后App.info",app.globalData.userInfo);   这里还是null 因为请求是异步的
        // this.checkLoginStatus();//检查是否获取用户信息！！！！！！！！！！！！！！！！！！！！！！
    },

    onShow: function() {
    },

    onShareAppMessage:function(res){
        return {
            title:'有缘千里来答题',
            path:'pages/enter/enter',
            // imageUrl:''
            success:function(res){
                console.log('res:',res)
                console.log('转发成功')
            }
        }
    }
})
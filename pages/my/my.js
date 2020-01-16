const upPerInfoUrl = require('../../config').upPerInfoUrl;
const getPerInfoUrl = require('../../config').getPerInfoUrl;
const checkRankList = require('../../config').checkRankList;
var areaData = require("../../areaData/areaData.js");
var ageLimit = require("../../areaData/ageLimit.js");
var list =[]

const app = getApp();

Page({
    data: {
        // isLogin: wx.getStorageSync('loginFlag')
        isLogin: wx.getStorageSync('userInfo')
            ? true 
            : false  ,   // 是否登录，根据后台返回的skey判断

        getInfoFlag:false,  //请求查看个人信息标识
        weixinInfo:{},
        userInfo:{},
        headUrl:'',
        imageList:[],
        name:'',
        gender:"",
        region:[],
        array: ['男', '女'],
        date:"",
        genderIndex: 0,
        multiIndex: [null, null],
        multiArray:areaData.proviceList,
        objectMultiArray:areaData.cityList,
        upperAge:ageLimit.upperAge,
        lowerAge:ageLimit.lowerAge,
        upperIndex:-1,
        lowerIndex:-1,
        weichat:null,
        qq:null,
        signature:null,
        expectProvince:null,
        expectCity:null,
        expectGender:null,
        expectCapYear:null,
        expectLowerYear:null,
        expectMatch:null,
        submitPerInfoFlag:false     //上传信息成功过与否
    },
    otherInfo:function(){
        console.log('将查看他人信息')
        wx.navigateTo({
            url:"../otherInfo/otherInfo"
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
    goRankList:function(){
        wx.request({
            url:checkRankList,
            data:{
              userId:app.globalData.weixinInfo.userId
            },
            method:"GET",
            success:function(res){
                if(res.data.code==0){
                    app.globalData.rankList=res.data.data
                    wx.navigateTo({                  
                        url:'../rankList/rankList'
                    })
                    console.log("有排行榜信息，跳转：",res)
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'loading',
                        duration: 1000
                      })
                }
            },
            fail:function(res){
              console.log('请求排行榜后台失败')
            }
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
    previewImage:function(e){
        let that = this;
        var current = this.data.userInfo.avatarUrl;
        // that.data.imageList.push(current)
        // that.setData({
        //     imageList:that.data.imageList
        // }),
        console.log("imageList:",that.data.imageList),
        console.log("avatarUrl:",current)
        console.log("avatarUrl:",e.currentTarget);
        wx.previewImage({
            current: current,
            urls:that.data.imageList,
            success:function(res){
                console.log("imageList:",that.data.imageList),
                console.log("res:",res)
            },
            fail:function(res){
                console.log('res:',res)
            }
        })
    },
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
            date:e.detail.value
        })
        console.log(this.data.date);
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
            this.setData({
                qq:null
            })
            console.log(this.data.qq)
            
        }else{
            this.setData({
                qq:e.detail.value
            })
        }
    },
    bindTextarea:function(e){
        this.setData({
            signature:e.detail.value
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
        // console.log(this.data.multiArray[0][this.data.multiIndex[0]],this.data.multiArray[1][this.data.multiIndex[1]])
        that.setData({
            expectProvince:this.data.multiArray[0][this.data.multiIndex[0]],
            expectCity:this.data.multiArray[1][this.data.multiIndex[1]]
        })  
    },
    bindMultiPickerColumnChange: function (e) {
        let that= this;
        switch (e.detail.column) {
            case 0:
            list = []
            for (var i = 0; i < that.data.objectMultiArray.length; i++) {
                if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) {
                list.push(that.data.objectMultiArray[i].regname)
                }
            }
            that.setData({
                "multiArray[1]": list,
                "multiIndex[0]": e.detail.value,
                "multiIndex[1]": 0
            })

        }
    },
    bindExpectUpperAge:function(e){
        this.setData({
            upperIndex: e.detail.value
        })
        },
        bindExpectLowerAge:function(e){
        this.setData({
            lowerIndex: e.detail.value
        })
        console.log(this.data.lowerAge)
        console.log(this.data.lowerIndex)
    },
    bindExpectMatch:function(){
        this.setData({
            expectMatch:e.detail.value
        })
    },

    submit:function(){
        let that = this
        // app.globalData.userInfo.nickName=this.data.nickName,   //必须填写的信息
        // app.globalData.userInfo.avatarUrl=this.data.headUrl,
        // app.globalData.userInfo.gender=this.data.genderIndex+1
        // app.globalData.userInfo.province=this.data.region[0]
        // app.globalData.userInfo.city=this.data.region[1]
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
                expectCapYear:that.data.upperAge[that.data.upperIndex],
                expectLowerYear:that.data.lowerAge[that.data.lowerIndex],
                expectMatch:that.data.expectMatch
            },
            success:function(res){
                console.log(res)
                if(res.data.code==0){
                    console.log('上传信息成功')
                    that.setData({
                        submitPerInfoFlag:true
                    })
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
                    icon: 'loading',
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
        this.submit();
        if(this.data.submitPerInfoFlag){
            wx.navigateTo({
                url:'../play/play'
            })
        }
       
    },

    // 请求服务器--获取用户信息
    getUserInfo:function(){
        let that = this;
        wx.request({
            url:getPerInfoUrl,
            method:"GET",
            data:{
                userId:app.globalData.weixinInfo.userId
            },
            success:function(res){
                 if(res.data.code==0){
                    app.globalData.userInfo=res.data.data
                    that.setData({
                        headUrl: res.data.headUrl,
                        name:res.data.data.name,
                        date:res.data.data.birthday,
                        genderIndex:res.data.data.gender-1,
                        'region[0]':res.data.data.province,
                        'region[1]':res.data.data.city,
                        signature:res.data.data.signature,
                        weichat:res.data.data.weichat,
                        qq:res.data.data.qq,
                        expectProvince:res.data.data.expectProvince,
                        expectCity:res.data.data.expectCity,
                        expectGender:res.data.data.expectGender-1,
                        'upperAge[0]':res.data.data.expectCapYear,
                        'lowerAge[1]':res.data.data.expectLowerYear,
                        expectMatch:res.data.data.expectMatch,
                        getInfoFlag:true  //请求查看个人信息 过一次，后续不再请求(这个应该是有信息true 还是有没有都true)
                    })
                    console.log('请求个人信息成功',res)
                 }else{
                    console.log('第一次登录，后台没有个人信息',res)
                    that.setData({
                        // userInfo: app.globalData.userInfo,
                        name:app.globalData.weixinInfo.nickName,
                        headUrl:app.globalData.weixinInfo.headUrl,
                        // imageList:[],
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
       console.log("onLoad前App.info",app.globalData.userInfo);
       this.setData({
        weixinInfo:app.globalData.weixinInfo
       })
       this.getUserInfo();
    //    this.setData({
    //        userInfo: app.globalData.userInfo,
    //        nickName:app.globalData.userInfo.nickName,
    //        headUrl:app.globalData.userInfo.headUrl,
    //        imageList:[],
    //        'region[0]':app.globalData.userInfo.province,
    //        'region[1]':app.globalData.userInfo.city,
    //        genderIndex:app.globalData.userInfo.gender-1
    //    });
    //     if(!that.data.getInfoFlag){
    //         that.getUserInfo()
    //     };
       console.log("onLoad后App.info",app.globalData.userInfo);
        // this.checkLoginStatus();//检查是否获取用户信息！！！！！！！！！！！！！！！！！！！！！！
    },

    onShow: function() {
        // let that = this;
        // console.log("onShow前",app.globalData.userInfo);
        let myheadUrl = app.globalData.weixinInfo.headUrl;
        let imglist =[];
        imglist.push(myheadUrl)
        // this.data.imageList.splice(0,1,headUrl)
        this.setData({
            // userInfo: app.globalData.userInfo,
            imageList:imglist
        })
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
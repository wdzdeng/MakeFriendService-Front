const upPerInfoUrl = require('../../config').upPerInfoUrl;
var areaData = require("../../areaData/areaData.js");
var ageLimit = require("../../areaData/ageLimit.js");
const app = getApp();
var list =[]

Page({
    data:{
        userInfo:{},
        headUrl:'',
        imageList:[],
        nickName:'',
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
        expectLowerYear:null
    },
    


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
        nickName:e.detail.value
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
      this.setData({
        qq:e.detail.value
      })
    },
    bindTextarea:function(){
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
    btnSubmit:function(){
      let that = this
      app.globalData.userInfo.nickName=this.data.nickName,
      app.globalData.userInfo.avatarUrl=this.data.headUrl,
      app.globalData.userInfo.gender=this.data.genderIndex+1
      app.globalData.userInfo.province=this.data.region[0]
      app.globalData.userInfo.city=this.data.region[1]
      console.log(that.data.date)
      if(!that.data.nickName){
        wx.showToast({
          title: '请输入昵称',
          icon: 'loading',
          duration: 1000
        })
      }
      else if((that.data.genderIndex+1)!==1 && (that.data.genderIndex+1)!==2){
        wx.showToast({
          title: '请选择性别',
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
      else if(!that.data.region[0] && !that.data.region[0]){
        wx.showToast({
          title: '请输入地区',
          icon: 'loading',
          duration: 1000
        })
      }
      else{
        wx.request({
          url:upPerInfoUrl,
          method:"POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data:{
            userId:app.globalData.userInfo.userId,
            name:that.data.nickName,
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
            expectLowerYear:that.data.lowerAge[that.data.lowerIndex]
          },
          success:function(res){
            console.log(res)
            if(res.data.code==0){
              console.log('上传信息成功')
              wx.switchTab({
                url:'../enter/enter'
              })
            }else{
              console.log('长传信息失败，服务器发回提示信息：',res.data.msg)
            }
          },
          fail:function(res){
            console.log('请求上传信息失败',res.errMsg)
          }
        })
      }
    },
    onLoad:function(){
        // let that = this;
        console.log("onLoad前",app.globalData.userInfo);
        this.setData({
            userInfo: app.globalData.userInfo,
            nickName:app.globalData.userInfo.nickName,
            headUrl:app.globalData.userInfo.headUrl,
            imageList:[],
            'region[0]':app.globalData.userInfo.province,
            'region[1]':app.globalData.userInfo.city,
            genderIndex:app.globalData.userInfo.gender-1
        })
        console.log("onLoad后",app.globalData.userInfo);
    },
    onShow:function(){
        // let that = this;
        // console.log("onShow前",app.globalData.userInfo);
        let headUrl = app.globalData.userInfo.avatarUrl;
        let imglist =[];
        imglist.push(headUrl)
        // this.data.imageList.splice(0,1,headUrl)
        this.setData({
            userInfo: app.globalData.userInfo,
            // imageList:this.data.imageList
            imageList:imglist
        })

        // let gender = this.data.userInfo.gender;
        // if(gender==1){
        //     this.setData({
        //         gender:"男"
        //     })
        // }else if(gender==2){
        //     this.setData({
        //         gender:"女"
        //     })
        // }else{
        //     this.setData({
        //         gender:"其他"
        //     })
        // }
    },
    onUnload:function(){
        // 将这个页面的信息传入globalData中
        // 将golbalData上传
        console.log("app.Info",app.globalData.userInfo)
        
        app.globalData.userInfo.avatarUrl=this.data.userInfo.avatarUrl
        app.globalData.userInfo.gender=this.data.genderIndex+1
        app.globalData.userInfo.province=this.data.region[0]
        app.globalData.userInfo.city=this.data.region[1]
        //  wx.request({
        //     url: upPerInfoUrl,
        //     data: {
        //         nickName:app.globalData.userInfo.nickName,
        //         six:app.globalData.userInfo.gender,
        //         province:app.globalData.userInfo.province,
        //         city:app.globalData.userInfo.city,
        //     },
        //     header: {'content-type':'application/x-www-form-urlencoded'},
        //     method: 'POst',
        //     success: (res)=>{
        //         if(res.code==0){
        //             console.log('用户信息上传成功,code=0,')
        //         }else{
        //             console.log('用户信息上传失败,code=1,')
        //         }
        //     },
        //     fail: (res)=>{
        //         console.log('调用upPerInfoUrl接口失败，',res)
        //     },
        // });
    }
})
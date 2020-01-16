/**
 * 小程序配置文件
 */


var config = {

    // 静默登录
    silentLoginUrl:`http://47.111.254.241:8888/user/silent/login`,
    // silentLoginUrl:`http://192.168.157.29:8888/user/silent/login`,
    // 微信授权 
    // authorizeUrl:`192.168.1.104:8888/user/silent/login`,
    // authorizeUrl:`http://yapi.demo.qunar.com/mock/66187/authorize`,

    loginUrl:`http://47.111.254.241:8888/user/login`,

    // 提交用户信息
    upPerInfoUrl:`http://47.111.254.241:8888/info/save`,

    // 查看用户资料
    getPerInfoUrl:`http://47.111.254.241:8888/info/query`,

    //查看他人用户资料
    getOtherInfoUrl:`http://47.111.254.241:8888/info/query/other`,

    // 查看排行榜
    checkRankList:`http://47.111.254.241:8888/rank/list`,

    // 提交答题结果
    postAnswerResult:`http://47.111.254.241:8888/answer/save`,

    // 进入答题前校验
    checkInfoIntegrity:`http://47.111.254.241:8888/answer/check`
    
    // // 测试的请求地址，用于测试会话
    // requestUrl: `http://127.0.0.1:3003/request`,

    // // 测试的信道服务接口
    // tunnelUrl: `ws://127.0.0.1:3306`,

    // // 上传文件接口
    // // uploadFileUrl: `http://127.0.0.1:3003/upload`,192.168.157.108:8080/download/post
    // uploadFileUrl: `http://192.168.157.108:8080/download/post`,
    // // 下载文件接口
    // downloadFileUrl: `https://11.url.cn/now/h5/img/red_62ae947.png`
};

module.exports = config

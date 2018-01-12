// 使用 Mock
var Mock = require('mockjs')

exports.getCommonApi = function(app) {
    // 登陆接口
    app.post('/store/manager/login', function(req, res) {
        var result = {"errcode":"0","errmsg":"ok","data":{"id":3,"user_name":"manager","token":"store_manager_token_c265b86621710f6594847d1fe91e5375","merchantData":{"id":3,"name":"出票啦","brandLabel":"zhypw","tel":"15602326941","website":"","desc":"出票啦","bgImg":"","logo":"https://imgcache.vikduo.com/oss/bbe7b83a94e4e38fce98626a1d7e149c.jpg","addr":"","lng":0,"lat":0,"created":0,"modified":0,"deleted":1},"storeData":{"id":1,"merchantId":3,"name":"出票啦","mobile":"0755 - 587548785","area":"","address":"","lat":"","lng":"","type":1,"status":1,"created":1503334344,"modified":1503334344}}};
        res.send(result);
    })
    // 今日实时数据
    app.get('/store/data_order/get-today', function(req, res) {
        var result = {
            "errcode": "0",
            "errmsg": "ok",
            "data": {
                "finishOrder": 7,
                "payAmount": 1,
                "refundOrder": 0,
                "refundAmount": 0,
            }
        }
        res.send(result)
    })
}
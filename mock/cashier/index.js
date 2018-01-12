// 使用 Mock
var Mock = require('mockjs')

exports.getListApi = function (app) {
  // 结算数据汇总
  app.get('/store/data_order/get-total', function (req, res) {
    var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": {
            "finishOrder": 2,
            "payAmount": 0,
            "refundOrder": 0,
            "refundAmount": 0,
            "serviceCharge": 0,
            "accountAmount": 0
        }
    }
    res.send(result);
  });
  // 财务结算 结算明细
  app.get('/store/data_order/find-total', function (req, res) {
    var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": {
            "data": {
                "count": 2,
                "rows": [
                    {
                        "id": 794,
                        "merchantId": 1,
                        "storeId": 2,
                        "finishOrder": 1,
                        "payAmount": 0,
                        "refundOrder": 0,
                        "refundAmount": 0,
                        "rate": 0,
                        "serviceCharge": 0,
                        "accountAmount": 0,
                        "date": 1508947200,
                        "store": [
                            {
                                "id": 2,
                                "merchantId": 4,
                                "type": 0,
                                "name": "智慧景区票务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503333333,
                                "modified": 1503333333,
                                "merchant_id": 4
                            }
                        ]
                    },
                    {
                        "id": 793,
                        "merchantId": 1,
                        "storeId": 1,
                        "finishOrder": 1,
                        "payAmount": 0,
                        "refundOrder": 0,
                        "refundAmount": 0,
                        "rate": 0,
                        "serviceCharge": 0,
                        "accountAmount": 0,
                        "date": 1508947200,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    }
                ]
            },
            "page": {
                "currentPage": 1,
                "totalCount": 2,
                "totalPage": 1
            }
        }
    }
    res.send(result);
  });
  // 结算明细数据
  app.get('/store/data_order/find', function (req, res) {
    var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": {
            "data": {
                "count": 2,
                "rows": [
                    {
                        "id": 794,
                        "merchantId": 1,
                        "storeId": 2,
                        "finishOrder": 1,
                        "payAmount": 0,
                        "refundOrder": 0,
                        "refundAmount": 0,
                        "rate": 0,
                        "serviceCharge": 0,
                        "accountAmount": 0,
                        "date": 1508947200,
                        "store": [
                            {
                                "id": 2,
                                "merchantId": 4,
                                "type": 0,
                                "name": "智慧景区票务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503333333,
                                "modified": 1503333333,
                                "merchant_id": 4
                            }
                        ]
                    },
                    {
                        "id": 793,
                        "merchantId": 1,
                        "storeId": 1,
                        "finishOrder": 1,
                        "payAmount": 0,
                        "refundOrder": 0,
                        "refundAmount": 0,
                        "rate": 0,
                        "serviceCharge": 0,
                        "accountAmount": 0,
                        "date": 1508947200,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    }
                ]
            },
            "page": {
                "currentPage": 1,
                "totalCount": 2,
                "totalPage": 1
            }
        }
    }
    res.send(result);
  });

  app.get('/store/data_order/find-pay', function (req, res) {
    var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": {
            "data": {
                "count": 5,
                "rows": [
                    {
                        "id": 498,
                        "uid": 163,
                        "selfUid": 103,
                        "merchantId": 7,
                        "account": "2100043162",
                        "secret": "4o7ib7choveb55o73toycs078tmj8hfh",
                        "payType": 1,
                        "orderId": 945,
                        "orderNo": "012700002017102614352106557",
                        "outTransactionId": "",
                        "transactionId": "81020171026144310980281820161202",
                        "refundNo": "",
                        "body": "【正价票】张家界智慧票务体验区指定体验票",
                        "attach": "",
                        "ip": "10.100.100.35",
                        "goodTags": "",
                        "refundState": 1,
                        "notifyUrl": "https://dev2.tour.snsshop.net/applet/pay/notify",
                        "callbackUrl": "",
                        "rate": "0.000000",
                        "money": 1,
                        "payBank": 1,
                        "payMode": 1,
                        "state": 2,
                        "payTime": 1508999752,
                        "refundTime": 0,
                        "refundMoney": 0,
                        "storeId": 1,
                        "outRefundNo": "",
                        "created": 1508999725,
                        "modified": 0,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    },
                    {
                        "id": 497,
                        "uid": 163,
                        "selfUid": 103,
                        "merchantId": 7,
                        "account": "2100043162",
                        "secret": "4o7ib7choveb55o73toycs078tmj8hfh",
                        "payType": 1,
                        "orderId": 944,
                        "orderNo": "012700002017102614321394018",
                        "outTransactionId": "",
                        "transactionId": "81020171026144000031130027520202",
                        "refundNo": "",
                        "body": "【正价票】张家界智慧票务体验区指定体验票",
                        "attach": "",
                        "ip": "10.100.100.35",
                        "goodTags": "",
                        "refundState": 1,
                        "notifyUrl": "https://dev2.tour.snsshop.net/applet/pay/notify",
                        "callbackUrl": "",
                        "rate": "0.000000",
                        "money": 1,
                        "payBank": 1,
                        "payMode": 1,
                        "state": 2,
                        "payTime": 1508999564,
                        "refundTime": 0,
                        "refundMoney": 0,
                        "storeId": 1,
                        "outRefundNo": "",
                        "created": 1508999539,
                        "modified": 0,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    },
                    {
                        "id": 496,
                        "uid": 163,
                        "selfUid": 103,
                        "merchantId": 7,
                        "account": "2100043162",
                        "secret": "4o7ib7choveb55o73toycs078tmj8hfh",
                        "payType": 1,
                        "orderId": 943,
                        "orderNo": "012700002017102614292185212",
                        "outTransactionId": "",
                        "transactionId": "81020171026143708735658335232201",
                        "refundNo": "",
                        "body": "【正价票】张家界智慧票务体验区指定体验票",
                        "attach": "",
                        "ip": "10.100.100.35",
                        "goodTags": "",
                        "refundState": 1,
                        "notifyUrl": "https://dev2.tour.snsshop.net/applet/pay/notify",
                        "callbackUrl": "",
                        "rate": "0.000000",
                        "money": 1,
                        "payBank": 1,
                        "payMode": 1,
                        "state": 2,
                        "payTime": 1508999391,
                        "refundTime": 0,
                        "refundMoney": 0,
                        "storeId": 1,
                        "outRefundNo": "",
                        "created": 1508999363,
                        "modified": 0,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    },
                    {
                        "id": 495,
                        "uid": 163,
                        "selfUid": 103,
                        "merchantId": 7,
                        "account": "2100043162",
                        "secret": "4o7ib7choveb55o73toycs078tmj8hfh",
                        "payType": 1,
                        "orderId": 942,
                        "orderNo": "012700002017102614163246239",
                        "outTransactionId": "",
                        "transactionId": "81020171026142421176282551296202",
                        "refundNo": "tk78967098750769",
                        "body": "【正价票】张家界智慧票务体验区指定体验票",
                        "attach": "",
                        "ip": "10.100.100.35",
                        "goodTags": "",
                        "refundState": 1,
                        "notifyUrl": "https://dev2.tour.snsshop.net/applet/pay/notify",
                        "callbackUrl": "",
                        "rate": "0.000000",
                        "money": 1,
                        "payBank": 1,
                        "payMode": 1,
                        "state": 2,
                        "payTime": 1508998626,
                        "refundTime": 1509083727,
                        "refundMoney": 1,
                        "storeId": 1,
                        "outRefundNo": "",
                        "created": 1508998600,
                        "modified": 0,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    },
                    {
                        "id": 494,
                        "uid": 163,
                        "selfUid": 103,
                        "merchantId": 7,
                        "account": "2100043162",
                        "secret": "4o7ib7choveb55o73toycs078tmj8hfh",
                        "payType": 1,
                        "orderId": 941,
                        "orderNo": "012700002017102614041449446",
                        "outTransactionId": "",
                        "transactionId": "81020171026141156717799384064201",
                        "refundNo": "TK9414236436436",
                        "body": "【正价票】张家界智慧票务体验区指定体验票",
                        "attach": "",
                        "ip": "10.100.100.35",
                        "goodTags": "",
                        "refundState": 2,
                        "notifyUrl": "https://dev2.tour.snsshop.net/applet/pay/notify",
                        "callbackUrl": "",
                        "rate": "0.000000",
                        "money": 1,
                        "payBank": 1,
                        "payMode": 1,
                        "state": 2,
                        "payTime": 1508997883,
                        "refundTime": 1509000217,
                        "refundMoney": 1,
                        "storeId": 1,
                        "outRefundNo": "",
                        "created": 1508997856,
                        "modified": 0,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    }
                ]
            },
            "page": {
                "currentPage": 1,
                "totalCount": 5,
                "totalPage": 1
            }
        }
    }
    res.send(result);
  });
  
  // 退款明细
  app.get('/store/data_order/find-refund', function (req, res) {
      res.send({
        "errcode": "0",
        "errmsg": "ok",
        "data": {
            "data": {
                "count": 5,
                "rows": [
                    {
                        "id": 498,
                        "uid": 163,
                        "selfUid": 103,
                        "merchantId": 7,
                        "account": "2100043162",
                        "secret": "4o7ib7choveb55o73toycs078tmj8hfh",
                        "payType": 1,
                        "orderId": 945,
                        "orderNo": "012700002017102614352106557",
                        "outTransactionId": "",
                        "transactionId": "81020171026144310980281820161202",
                        "refundNo": "",
                        "body": "【正价票】张家界智慧票务体验区指定体验票",
                        "attach": "",
                        "ip": "10.100.100.35",
                        "goodTags": "",
                        "refundState": 1,
                        "notifyUrl": "https://dev2.tour.snsshop.net/applet/pay/notify",
                        "callbackUrl": "",
                        "rate": "0.000000",
                        "money": 1,
                        "payBank": 1,
                        "payMode": 1,
                        "state": 2,
                        "payTime": 1508999752,
                        "refundTime": 0,
                        "refundMoney": 0,
                        "storeId": 1,
                        "outRefundNo": "",
                        "created": 1508999725,
                        "modified": 0,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    },
                    {
                        "id": 497,
                        "uid": 163,
                        "selfUid": 103,
                        "merchantId": 7,
                        "account": "2100043162",
                        "secret": "4o7ib7choveb55o73toycs078tmj8hfh",
                        "payType": 1,
                        "orderId": 944,
                        "orderNo": "012700002017102614321394018",
                        "outTransactionId": "",
                        "transactionId": "81020171026144000031130027520202",
                        "refundNo": "",
                        "body": "【正价票】张家界智慧票务体验区指定体验票",
                        "attach": "",
                        "ip": "10.100.100.35",
                        "goodTags": "",
                        "refundState": 1,
                        "notifyUrl": "https://dev2.tour.snsshop.net/applet/pay/notify",
                        "callbackUrl": "",
                        "rate": "0.000000",
                        "money": 1,
                        "payBank": 1,
                        "payMode": 1,
                        "state": 2,
                        "payTime": 1508999564,
                        "refundTime": 0,
                        "refundMoney": 0,
                        "storeId": 1,
                        "outRefundNo": "",
                        "created": 1508999539,
                        "modified": 0,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    },
                    {
                        "id": 496,
                        "uid": 163,
                        "selfUid": 103,
                        "merchantId": 7,
                        "account": "2100043162",
                        "secret": "4o7ib7choveb55o73toycs078tmj8hfh",
                        "payType": 1,
                        "orderId": 943,
                        "orderNo": "012700002017102614292185212",
                        "outTransactionId": "",
                        "transactionId": "81020171026143708735658335232201",
                        "refundNo": "",
                        "body": "【正价票】张家界智慧票务体验区指定体验票",
                        "attach": "",
                        "ip": "10.100.100.35",
                        "goodTags": "",
                        "refundState": 1,
                        "notifyUrl": "https://dev2.tour.snsshop.net/applet/pay/notify",
                        "callbackUrl": "",
                        "rate": "0.000000",
                        "money": 1,
                        "payBank": 1,
                        "payMode": 1,
                        "state": 2,
                        "payTime": 1508999391,
                        "refundTime": 0,
                        "refundMoney": 0,
                        "storeId": 1,
                        "outRefundNo": "",
                        "created": 1508999363,
                        "modified": 0,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    },
                    {
                        "id": 495,
                        "uid": 163,
                        "selfUid": 103,
                        "merchantId": 7,
                        "account": "2100043162",
                        "secret": "4o7ib7choveb55o73toycs078tmj8hfh",
                        "payType": 1,
                        "orderId": 942,
                        "orderNo": "012700002017102614163246239",
                        "outTransactionId": "",
                        "transactionId": "81020171026142421176282551296202",
                        "refundNo": "tk78967098750769",
                        "body": "【正价票】张家界智慧票务体验区指定体验票",
                        "attach": "",
                        "ip": "10.100.100.35",
                        "goodTags": "",
                        "refundState": 1,
                        "notifyUrl": "https://dev2.tour.snsshop.net/applet/pay/notify",
                        "callbackUrl": "",
                        "rate": "0.000000",
                        "money": 1,
                        "payBank": 1,
                        "payMode": 1,
                        "state": 2,
                        "payTime": 1508998626,
                        "refundTime": 1509083727,
                        "refundMoney": 1,
                        "storeId": 1,
                        "outRefundNo": "",
                        "created": 1508998600,
                        "modified": 0,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    },
                    {
                        "id": 494,
                        "uid": 163,
                        "selfUid": 103,
                        "merchantId": 7,
                        "account": "2100043162",
                        "secret": "4o7ib7choveb55o73toycs078tmj8hfh",
                        "payType": 1,
                        "orderId": 941,
                        "orderNo": "012700002017102614041449446",
                        "outTransactionId": "",
                        "transactionId": "81020171026141156717799384064201",
                        "refundNo": "TK9414236436436",
                        "body": "【正价票】张家界智慧票务体验区指定体验票",
                        "attach": "",
                        "ip": "10.100.100.35",
                        "goodTags": "",
                        "refundState": 2,
                        "notifyUrl": "https://dev2.tour.snsshop.net/applet/pay/notify",
                        "callbackUrl": "",
                        "rate": "0.000000",
                        "money": 1,
                        "payBank": 1,
                        "payMode": 1,
                        "state": 2,
                        "payTime": 1508997883,
                        "refundTime": 1509000217,
                        "refundMoney": 1,
                        "storeId": 1,
                        "outRefundNo": "",
                        "created": 1508997856,
                        "modified": 0,
                        "store": [
                            {
                                "id": 1,
                                "merchantId": 7,
                                "type": 0,
                                "name": "智慧乡村服务",
                                "mobile": "0755 - 587548785",
                                "area": "",
                                "address": "",
                                "lng": "",
                                "lat": "",
                                "created": 1503334344,
                                "modified": 1503334344,
                                "merchant_id": 7
                            }
                        ]
                    }
                ]
            },
            "page": {
                "currentPage": 1,
                "totalCount": 5,
                "totalPage": 1
            }
        }
    });
  });

  // 交易汇总
  app.get('/store/analysis/find-total', function (req, res) {
    let result = Mock.mock({
        "errcode": "0",
        "errmsg": "ok",
        "data": {
            "finishOrder|1-10": 1,
            "payAmount|100-320": 1,
            "finishNum|0-11": 1,
            "orderNum|0-12": 1,
            "orderAmount|200-400": 1,
            "orderCount|20-40": 1,
            "visitor|90-200": 1
        }
    });
    res.send(result)
  });

  // 交易明细
  app.get('/store/analysis/find-date', function (req, res) {
    let current = Math.floor(Date.now() / 1000)
      let result = Mock.mock({
        "errcode": "0",
        "errmsg": "ok",
        "data|7": [
            {
                "finishOrder|1-10": 1,
                "payAmount|100-200": 1,
                "finishNum|1-20": 1,
                "orderNum|10-20": 1,
                "visitor|1": [0, 1],
                "date|+1": [current - 7 * 24 * 3600, current - 6 * 24 * 3600, current - 5 * 24 * 3600, current - 4 * 24 * 3600, current - 3 * 24 * 3600, current - 2 * 24 * 3600, current - 1 * 24 * 3600]
            }
        ]
      });
      res.send(result)
  })

  // 核销汇总
  app.get('/store/writeoff/find-total', function (req, res) {
    let result = Mock.mock({
        "errcode": "0",
        "errmsg": "ok",
        "data": {
            "writeoffCount|2-10": 1,
            "writeoffAmount|200-1000": 1
        }
    })
    res.send(result)
  })

  // 核销数据明细 by date
  app.get('/store/writeoff/find-total-all', function (req, res) {
    let current = Math.floor(Date.now() / 1000)
    let result = Mock.mock({
        "errcode": "0",
        "errmsg": "ok",
        "data|7": [{
            "writeoffCount|2-10": 1,
            "writeoffAmount|200-1000": 1,
            "date|+1": [current - 7 * 24 * 3600, current - 6 * 24 * 3600, current - 5 * 24 * 3600, current - 4 * 24 * 3600, current - 3 * 24 * 3600, current - 2 * 24 * 3600, current - 1 * 24 * 3600]
        }]
    })
    res.send(result)
  })

  // 核销明细
  app.get('/store/writeoff/find', function (req, res) {
    let result = Mock.mock({
        "errcode": "0",
        "errmsg": "ok",
        "data|10": [
            {
                "id|+1": 1,
                "sceneryTicketName": "xxxxxx门票",
                "checkTime": 1503334344,
                "checkStaffName": 3,
                "price": 1321,
                "sceneryOrderId": 43436465463,
                "storeName": "黄龙洞",
                "personalName": "@cname",
                "personalID": "513015199425164535",
            }
        ],
        "page": {
            "currentPage": 1,
            "totalCount": 28,
            "totalPage": 3
        }
    })
    result.page.currentPage = Number(req.query.page)
    res.send(result)
  })
}



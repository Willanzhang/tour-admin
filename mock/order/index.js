// 使用 Mock
var Mock = require('mockjs')

exports.getOrderApi = function(app) {
    // 订单列表数据
    app.post('/store/scenery_order/find', function(req, res) {
        let result = {
            "errcode": "0",
            "errmsg": "ok",
            "data": [{
                    "sceneryOrder": {
                        "id": 1093,
                        "merchantId": 8,
                        "storeId": 2,
                        "uid": 181,
                        "selfUid": 112,
                        "userName": "",
                        "orderNo": "012800002017113014254542213",
                        "ip": "10.100.100.35",
                        "totalPrice": 1,
                        "shouldPay": 1,
                        "orderStatus": 1,
                        "checkoutStatus": 1,
                        "afterSalesStatus": 2,
                        "refundStatus": 0,
                        "payTime": null,
                        "created": 1512023145,
                        "modified": 1512023145,
                        "platformType": 2,
                        "phoneNo": "13246641470",
                        "sceneryTicketSkuDayUseMin": 1512000000,
                        "autoClose": 1512109545,
                        "orderType": 1,
                        "otherOrderNo": "",
                        "SceneryOrderDetail": [{
                            "id": 1131,
                            "merchantId": 8,
                            "storeId": 2,
                            "sceneryOrderId": 1093,
                            "sceneryTicketId": 862,
                            "sceneryTicketName": "大索道下站检票点 A线天门山散客网络票（索道上山-公路下山）",
                            "sceneryTicketSkuId": 5511,
                            "sceneryTicketSkuDayUse": 1512000000,
                            "sceneryTicketSkuStartTime": "08:00",
                            "sceneryTicketSkuEndTime": "23:59",
                            "price": 1,
                            "num": 1,
                            "personalInfo": "{\"personalName\":\"刘平\",\"personalID\":\"440401199901019608\",\"travelerID\":287}",
                            "merchantCode": "",
                            "sceneryCode": "",
                            "created": 1512023145,
                            "modified": 1512023145,
                            "afterSalesStatus": 2,
                            "afterSalesHappend": 2,
                            "refundStatus": 0,
                            "checkoutStatus": 2,
                            "checkStatus": 2,
                            "checkStaffId": 0,
                            "checkStaffName": "",
                            "checkTime": 0
                        }],
                        "extStatus": 1,
                        "extStatusTxt": "待付款"
                    },
                    "store": {
                        "id": 2,
                        "merchantId": 8,
                        "name": "智慧云票务",
                        "mobile": "0755 - 587548785",
                        "area": "{\"province\":\"220000\",\"city\":\"220100\",\"district\":\"220101\"}",
                        "address": "",
                        "lat": "",
                        "lng": "",
                        "logo": "",
                        "type": 1,
                        "status": 1,
                        "created": 1503333333,
                        "modified": 1503333333
                    }
                },
                {
                    "sceneryOrder": {
                        "id": 1093,
                        "merchantId": 8,
                        "storeId": 2,
                        "uid": 181,
                        "selfUid": 112,
                        "userName": "",
                        "orderNo": "012800002017113014254542213",
                        "ip": "10.100.100.35",
                        "totalPrice": 1,
                        "shouldPay": 1,
                        "orderStatus": 1,
                        "checkoutStatus": 1,
                        "afterSalesStatus": 2,
                        "refundStatus": 0,
                        "payTime": null,
                        "created": 1512023145,
                        "modified": 1512023145,
                        "platformType": 2,
                        "phoneNo": "13246641470",
                        "sceneryTicketSkuDayUseMin": 1512000000,
                        "autoClose": 1512109545,
                        "orderType": 1,
                        "otherOrderNo": "",
                        "SceneryOrderDetail": [{
                            "id": 1131,
                            "merchantId": 8,
                            "storeId": 2,
                            "sceneryOrderId": 1093,
                            "sceneryTicketId": 862,
                            "sceneryTicketName": "大索道下站检票点 A线天门山散客网络票（索道上山-公路下山）",
                            "sceneryTicketSkuId": 5511,
                            "sceneryTicketSkuDayUse": 1512000000,
                            "sceneryTicketSkuStartTime": "08:00",
                            "sceneryTicketSkuEndTime": "23:59",
                            "price": 1,
                            "num": 1,
                            "personalInfo": "{\"personalName\":\"刘平\",\"personalID\":\"440401199901019608\",\"travelerID\":287}",
                            "merchantCode": "",
                            "sceneryCode": "",
                            "created": 1512023145,
                            "modified": 1512023145,
                            "afterSalesStatus": 2,
                            "afterSalesHappend": 2,
                            "refundStatus": 0,
                            "checkoutStatus": 2,
                            "checkStatus": 2,
                            "checkStaffId": 0,
                            "checkStaffName": "",
                            "checkTime": 0
                        }],
                        "extStatus": 1,
                        "extStatusTxt": "待付款"
                    },
                    "store": {
                        "id": 2,
                        "merchantId": 8,
                        "name": "智慧云票务",
                        "mobile": "0755 - 587548785",
                        "area": "{\"province\":\"220000\",\"city\":\"220100\",\"district\":\"220101\"}",
                        "address": "",
                        "lat": "",
                        "lng": "",
                        "logo": "",
                        "type": 1,
                        "status": 1,
                        "created": 1503333333,
                        "modified": 1503333333
                    }
                },
                {
                    "sceneryOrder": {
                        "id": 1093,
                        "merchantId": 8,
                        "storeId": 2,
                        "uid": 181,
                        "selfUid": 112,
                        "userName": "",
                        "orderNo": "012800002017113014254542213",
                        "ip": "10.100.100.35",
                        "totalPrice": 1,
                        "shouldPay": 1,
                        "orderStatus": 1,
                        "checkoutStatus": 1,
                        "afterSalesStatus": 2,
                        "refundStatus": 0,
                        "payTime": null,
                        "created": 1512023145,
                        "modified": 1512023145,
                        "platformType": 2,
                        "phoneNo": "13246641470",
                        "sceneryTicketSkuDayUseMin": 1512000000,
                        "autoClose": 1512109545,
                        "orderType": 1,
                        "otherOrderNo": "",
                        "SceneryOrderDetail": [{
                            "id": 1131,
                            "merchantId": 8,
                            "storeId": 2,
                            "sceneryOrderId": 1093,
                            "sceneryTicketId": 862,
                            "sceneryTicketName": "大索道下站检票点 A线天门山散客网络票（索道上山-公路下山）",
                            "sceneryTicketSkuId": 5511,
                            "sceneryTicketSkuDayUse": 1512000000,
                            "sceneryTicketSkuStartTime": "08:00",
                            "sceneryTicketSkuEndTime": "23:59",
                            "price": 1,
                            "num": 1,
                            "personalInfo": "{\"personalName\":\"刘平\",\"personalID\":\"440401199901019608\",\"travelerID\":287}",
                            "merchantCode": "",
                            "sceneryCode": "",
                            "created": 1512023145,
                            "modified": 1512023145,
                            "afterSalesStatus": 2,
                            "afterSalesHappend": 2,
                            "refundStatus": 0,
                            "checkoutStatus": 2,
                            "checkStatus": 2,
                            "checkStaffId": 0,
                            "checkStaffName": "",
                            "checkTime": 0
                        }],
                        "extStatus": 1,
                        "extStatusTxt": "待付款"
                    },
                    "store": {
                        "id": 2,
                        "merchantId": 8,
                        "name": "智慧云票务",
                        "mobile": "0755 - 587548785",
                        "area": "{\"province\":\"220000\",\"city\":\"220100\",\"district\":\"220101\"}",
                        "address": "",
                        "lat": "",
                        "lng": "",
                        "logo": "",
                        "type": 1,
                        "status": 1,
                        "created": 1503333333,
                        "modified": 1503333333
                    }
                }
            ],
            "page": {
                "currentPage": 1,
                "totalCount": 1,
                "totalPage": 1
            }
        }
        res.send(result);
    });

    // 售后订单列表数据
    app.post('/store/after_sales/find', function(req, res) {
        let result = {
            "errcode": "0",
            "errmsg": "ok",
            "data": [{
                "afterSales": {
                    "id": 41,
                    "serviceNo": "TK20171131633981799",
                    "sceneryOrderId": 1048,
                    "type": 1,
                    "refundReason": 2,
                    "content": "",
                    "userPhone": "13246641470",
                    "refundMoney": 1,
                    "applyRefundMoney": 1,
                    "created": 1509697989,
                    "extStatus": 2,
                    "extStatusTxt": "退款完成"
                },
                "store": {
                    "name": "智慧云票务"
                },
                "orderInfo": [{
                    "id": 1048,
                    "orderNo": "012800002017110316241447243",
                    "sceneryTicketName": "大索道下站检票点 A线天门山散客网络票（索道上山-公路下山）"
                }]
            }],
            "page": {
                "currentPage": 1,
                "totalCount": 1,
                "totalPage": 1
            }
        }
        res.send(result);

    });


    // 订单详情数据
    app.post('/store/scenery_order/detail', function(req, res) {
        let result = {
            "errcode": "0",
            "errmsg": "ok",
            "data": {
                "order": {
                    "id": 1061,
                    "merchantId": 8,
                    "storeId": 1,
                    "uid": 112,
                    "selfUid": 0,
                    "userName": "刘平",
                    "orderNo": "012800002017110710495786688",
                    "ip": "10.100.100.35",
                    "totalPrice": 1,
                    "shouldPay": 1,
                    "orderStatus": 3,
                    "checkoutStatus": 0,
                    "afterSalesStatus": 2,
                    "refundStatus": 0,
                    "payTime": 1510023522,
                    "created": 1510022997,
                    "modified": 1510022997,
                    "platformType": 2,
                    "phoneNo": "13246641470",
                    "sceneryTicketSkuDayUseMin": 1510156800,
                    "autoClose": 1510109397,
                    "orderType": 1,
                    "otherOrderNo": "",
                    "extStatus": 2,
                    "extStatusTxt": "已完成"
                },
                "orderDetail": [{
                    "id": 1098,
                    "merchantId": 8,
                    "storeId": 1,
                    "sceneryOrderId": 1061,
                    "sceneryTicketId": 865,
                    "sceneryTicketName": "黄龙洞成人票",
                    "sceneryTicketSkuId": 5543,
                    "sceneryTicketSkuDayUse": 1510156800,
                    "sceneryTicketSkuStartTime": "00:00",
                    "sceneryTicketSkuEndTime": "23:59",
                    "price": 1,
                    "num": 1,
                    "personalInfo": {
                        "personalName": "刘平",
                        "personalID": "440401199901011884",
                        "travelerID": 273
                    },
                    "merchantCode": "",
                    "sceneryCode": "01211071058429QdoN",
                    "created": 1510022997,
                    "modified": 1510022997,
                    "afterSalesStatus": 2,
                    "afterSalesHappend": 2,
                    "refundStatus": 0,
                    "checkoutStatus": 1,
                    "checkStatus": 2,
                    "checkStaffId": 0,
                    "checkStaffName": "",
                    "checkTime": 0,
                    "extStatus": 4,
                    "extStatusTxt": "未使用"
                }],
                "orderPayInfo": {
                    "tradeNo": "81020171107110636952507571200201"
                },
                "store": {
                    "name": "智慧乡村服务"
                }
            }
        }
        res.send(result);
    });

    // 售后订单详情数据
    app.post('/store/after_sales/detail', function(req, res) {
        let result = {
            "errcode": "0",
            "errmsg": "ok",
            "data": {
                "afterSales": {
                    "serviceNo": "TK2017113014251684964",
                    "created": 1512023116,
                    "refundReason": 3,
                    "content": "第三方出票失败",
                    "refundMoney": 1,
                    "applyRefundMoney": 1,
                    "extraMoney": 0,
                    "extStatus": 2,
                    "extStatusTxt": "退款完成"
                },
                "order": {
                    "orderNo": "012800002017113014203769078",
                    "otherOrderNo": "",
                    "orderType": 1,
                    "userName": "",
                    "phoneNo": "13246641470"
                },
                "orderPayInfo": {
                    "tradeNo": "81020171130143357411487511040201"
                },
                "store": {
                    "name": "智慧乡村服务"
                },
                "afterSalesDetail": [{
                    "id": 59,
                    "afterSalesServiceId": 50,
                    "sceneryOrderId": 1092,
                    "sceneryOrderDetailId": 1130,
                    "merchantId": 8,
                    "storeId": 1,
                    "num": 1,
                    "thirdStatus": 1,
                    "retmsg": "",
                    "created": 1512023116,
                    "modified": 1512023244,
                    "price": 1,
                    "extStatus": 2,
                    "extStatusTxt": "已退款",
                    "refundMoney": 2,
                    "extraMoney": 1,
                    "sceneryOrderDetail": {
                        "id": 22,
                        "sceneryTicketName": "sdgdfgdfgdfgdgdfggdgdfg",
                        "sceneryTicketSkuDayUse": 1512023116,
                        "sceneryTicketSkuStartTime": '10:00',
                        "sceneryTicketSkuEndTime": "18:00"
                    },
                    "personalInfo": {
                        "personalName": '张三',
                        "personalID": '44521547541215454515',
                        "travelerID": 212
                    }
                }]
            }
        }
        res.send(result);
    });


}
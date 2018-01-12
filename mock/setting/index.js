// 使用 Mock
var Mock = require('mockjs')

exports.getSettingApi = function (app) {
  app.get('/store/store/info', function (req, res) {
    var result = {
      "errcode": "0",
      "errmsg": "ok",
      "data": {
        "id": 14,
        "merchantId": 4,
        "type": 1,
        "name": "test1223344",
        "mobile": "13456789645",
        "area": {
          "province": "001544",
          "city": "110021",
          "district": "254412",
          "fullAddress": "第一平行宇宙本星系群银河系太阳系"
        },
        "address": "比克科技大厦",
        "lng": "133.554884",
        "lat": "25.5545515",
        "status": 1,
        "created": 1509093096,
        "modified": 1509095886
      }
    };
    res.send(result);
  });
  // 获取用户信息
  app.get('/store/manager/current', function (req, res) {
    var result = {
      "errcode": "0",
      "errmsg": "ok",
      "data": {
        "id": 3,
        "userName": "manager",
        "merchantId": 4,
        "storeId": 14,
        "roleId": 0,
        "name": "默认管理员",
        "mobile": "13456789645",
        "status": 1,
        "created": 1509093096,
        "modified": 1509095886
      }
    };
    res.send(result);
  });

  app.post('/store/after_sales_setting/get_setting', function (req, res) {
    var result = {
      data: {
        id: '', // 获取独有
        endTime: '1111',
        deleted: 1,
        endType: 1,
        endDate: '23:10',
        feeStatus: 1,
        maxLimit: { maxHour: 16, amount: 16 },
        minLimit: [
          {
            minHour: 12,
            amount: 12
          }, {
            minHour: 10,
            amount: 10
          }, {
            minHour: 8,
            amount: 8
          }, {
            minHour: 6,
            amount: 6
          }]
      }
    };
    res.send(result);
  });

  app.post('/store/after_sales_setting/save_setting', function (req, res) {
    var result = {
      "errcode": "0",
      "errmsg": "ok",
      "data": [
        1
      ]
    };
    res.send(result);
  });

  app.post('/store/manager/list', function (req, res) {
    let result = Mock.mock({
      "errcode": "0",
      "errmsg": "ok",
      "data|10": [
        {
          "id|+1": 1,
          "userName": "@last",
          "password": "",
          "salt": "",
          "merchantId": 8,
          "roleId|1": [1, 2, 110],
          "status": 1,
          "name": "@cname",
          "mobile|1": [13543336218, 13465464646, 17846465814, 15844641547],
          "created|1513355305-1513655305": 1,
          "modified": 1509537539
        }
      ],
      "page": {
        "currentPage": 1,
        "totalCount": 30,
        "totalPage": 2
      }
    });
    result.page.currentPage = req.body.page
    res.send(result);
  });

  app.post('/store/manager/get-root-info', function (req, res) {
    let result = {
      "errcode": "0",
      "errmsg": "ok",
      "data": {
        "id": 6,
        "userName": "manager4",
        "password": "",
        "salt": "",
        "merchantId": 8,
        "roleId": 110,
        "status": 1,
        "name": "",
        "mobile": "18665807162",
        "created": 1508738626,
        "modified": 1509537539
      }
    }
    res.send(result);
  });

  app.post('/store/manager/username-check', function (req, res) {
    let result = {
      "errcode": "0",
      "errmsg": "ok",
      "data": 1
    }
    res.send(result);
  });

  app.post('/store/manager/send-mobile-code', function (req, res) {
    let result = {
      "errcode": "0",
      "errmsg": "ok",
      "data": {
        "key": "root_mobile_check_L1wBk2"
      }
    }
    res.send(result);
  });

  app.post('/store/manager/mobile-code-check', function (req, res) {
    let result = {
      "errcode": "0",
      "errmsg": "ok",
      "data": true
    }
    res.send(result);
  });

  app.post('/store/manager/add', function (req, res) {
    let result = {
      "errcode": "0",
      "errmsg": "ok",
      "data": {
        "id": 9,
        "merchantId": 8,
        "name": "管理员123",
        "userName": "test_manager_default",
        "roleId": 1,
        "mobile": "13456789645",
        "status": 1,
        "created": 1513585964,
        "modified": 1513585964,
        "salt": "",
        "password": ""
      }
    }
    res.send(result);
  });

  app.post('/store/manager/detail', function (req, res) {
    let result = Mock.mock({
      "errcode": "0",
      "errmsg": "ok",
      "data": {
        "id|1-20": 1,
        "userName": "@first",
        "password": "15436215",
        "salt": "",
        "merchantId": 8,
        "roleId|1": [1, 2],
        "status": 1,
        "name": "@cname",
        "mobile": "13546464646",
        "created": 1508738626,
        "modified": 1509537539
      }
    })
    res.send(result);
  });

  app.post('/store/manager/delete', function (req, res) {
    let result = {
      "errcode": "0",
      "errmsg": "ok",
      "data": 1
    }
    res.send(result);
  });

}



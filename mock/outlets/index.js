// 使用 Mock
var Mock = require('mockjs')

exports.getOutletsApi = function (app) {
  // 网点列表
  app.get('/store/outlets/list', function (req, res) {
    let result = [{
      id: 1,
      name: '湖南张家界天门山风景区',
      type: '旅游景区',
      address: '湖南省张家界市永定区天门山索道站',
      contact: '0744-8369999'
    }, {
      id: 2,
      name: '湖南张家界黄龙洞',
      type: '旅游景区',
      address: '湖南省张家界市永定区天门山索道站',
      contact: '0744-8369999'
    }]
    res.send(result)
  });
  // 网点数据看板
  app.get('/store/outlets/overall', function (req, res) {
    var result = [
      {
        name: '网点数',
        value: 3
      },
      {
        name: '成交总笔数',
        value: 666
      },
      {
        name: '成交总额',
        type: 1, // 1代表价格
        value: 52000000
      },
      {
        name: '退款总笔数',
        value: 3
      },
      {
        name: '退款总额',
        type: 1, // 1代表价格
        value: 52000000
      },
      {
        name: '总交易净额',
        type: 1, // 1代表价格
        value: 52000000
      },
      {
        name: '总手续费用',
        type: 1, // 1代表价格
        value: 52000000
      },
      {
        name: '总划账金额',
        type: 1, // 1代表价格
        value: 52000000
      },
    ];
    res.send(result);
  });
}
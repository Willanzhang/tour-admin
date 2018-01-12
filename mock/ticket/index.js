// 使用 Mock
var Mock = require('mockjs')

exports.getTicketApi = function(app) {
    // 票列表
    app.post('/store/scenery_ticket/find', function(req, res) {
        var result = {
          "data": [
            {
              "id": 1, 
              "marketPrice": 17, 
              "salesTotal": 99, 
              "sort": 84, 
              "ticketGroup": {
                  "name": "成人票"
              }, 
              "modeType": 1, 
              "created": 1513230279, 
              "name": "mock", 
              "statusNum": 1
            },{
              "id": 2, 
              "marketPrice": 17, 
              "salesTotal": 99, 
              "sort": 84, 
              "ticketGroup": {
                  "name": "儿童票"
              }, 
              "modeType": 1, 
              "created": 1513230279, 
              "name": "mock2", 
              "statusNum": 2
            },{
              "id": 3, 
              "marketPrice": 17, 
              "salesTotal": 99, 
              "sort": 84, 
              "ticketGroup": {
                  "name": "儿童票"
              }, 
              "modeType": 2, 
              "created": 1513230279, 
              "name": "mock2", 
              "statusNum": 1
            },{
              "id": 4, 
              "marketPrice": 17, 
              "salesTotal": 99, 
              "sort": 84, 
              "ticketGroup": {
                  "name": "儿童票"
              }, 
              "modeType": 2, 
              "created": 1513230279, 
              "name": "mock2", 
              "statusNum": 2
            }
          ], 
          "page": {
              "currentPage": 1, 
              "totalCount": 4, 
              "totalPage": 1
          }
        }
        res.send(result);
      })
    // 创建票（自主创建）
    app.post('/store/scenery_ticket/create', function(req, res) {
      var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": {
          id: 1
        }
      };
      res.send(result);
    })
    // 票详情
    app.post('/store/scenery_ticket/detail', function(req, res) {
      var result = {
    "errcode": "0",
    "errmsg": "ok",
    "data": {
        "id": 862,
        "name": "大索道下站检票点 A线天门山散客网络票（索道上山-公路下山）",
        "subtitle": "大索道下站检票点 2017-11-02~2017-12-02",
        "keyword": "大索道下站检票点",
        "ticketNo": "",
        "marketPrice": 1,
        "highPrice": 1,
        "lowPrice": 1,
        "merchantId": 8,
        "storeId": 17,
        "hits": 0,
        "salesTotal": 0,
        "buyLimit": 0,
        "sort": 0,
        "showSaleNum": 2,
        "created": 1509593598,
        "modified": 1513237572,
        "statusNum": 1,
        "timeEnd": 1512185598,
        "buyDayLimited": 30,
        "needPersonalInfo": 1,
        "thirdLineId": "be94ce6cce0a4a888af6a2de85f593df",
        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
        "groupId": 1,
        "modelType": 1,
        "retailPrice": 0,
        "sceneryTicketInfo": {
            "id": 860,
            "merchantId": 8,
            "storeId": 2,
            "sceneryTicketId": 862,
            "detailContent": " <div><br />\n7500米的观光索道，180度转弯的通天大道，还有贴壁悬空的玻璃栈道。<br />\n天门山，位于湖南省张家界市，距市区仅8公里，海拔1518.6米，是张家界海拔最高山，也是张家界的文化圣地，留有大量赞咏天门山的诗词，更有众多神闻传说，被尊为“张家界之魂”，有“湘西第一神山”的美誉。天门山是国家5A级旅游区，更有着“中国最值得外国人去的50个地方、中国最令人向往的地方、湖南新潇湘八景、中国自驾游百强景区、中国网民最关注的十大景区”等多项荣称。<br />\n<br />\n<img src=\"https://imgcache.vikduo.com/oss/798a9409f155181c837eb4e900ad062e.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/3b91bb977a80f166ad2bbe1b07a97172.png\" /><br />\n   <br />\n玻璃栈道<br />\n悬于天门山顶西线，长60米，宽1.6米，最高处海拔1430米，是张家界天门山景区继悬于峭壁之上的鬼谷栈道、凭空伸出的玻璃眺望台。玻璃栈道是张家界天门山景区继悬于峭壁之上的鬼谷栈道、凭空伸出的玻璃眺望台、横跨峡谷的木质吊桥后打造的又一试胆新景点，这条看着就让人腿软的玻璃栈道给人带来的刺激震撼感可与举世闻名的美国大峡谷玻璃走廊“天空之路”媲美。晴天时，蓝天和白云的倒影铺满了整条栈道，让人在对脚下的透明战战兢兢之余，更乐享于踏云而行的快感;云雾天气，玻璃栈道则在雾中若隐若现，天上人间的美景更是让人惊叹不已。<br />\n<img src=\"https://imgcache.vikduo.com/oss/934fe600ecc75071b1af1537b9ae3ed7.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/4618adf7373bf44aab72dd63853dc2dd.png\" /><br />\n   <br />\n鬼谷栈道<br />\n栈道全长1600米，平均海拔为1400米，起点是倚虹关，终点到小天门。与其他栈道不同的是，鬼谷栈道全线既不在悬崖之巅，也不在悬崖之侧，而是全线都立于万丈悬崖的中间，给人以与悬崖共起伏同屈的感觉。站在栈道上俯瞰群山，古人\"会当凌绝顶，一览众山小\"的感觉油然而生。由于天门山是国家森林公园，植被特别丰富，加上典型的喀斯特地貌，所以，在这条栈道上更能找到一种在乘坐直升飞机飞越热带雨林大峡谷的感觉，这平时只能在电影里看到的场景，在这里能让你身临其境。<br />\n<img src=\"https://imgcache.vikduo.com/oss/d8419b50c068103f99047b34637357d5.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/6d1dadafd6a65c42009b7461b677bdca.png\" />  <br />\n天门洞<br />\n世界高海拔天然穿山溶洞天门洞堪称传奇的代表。天门洞悬于海拔1300余米的峭壁之上，高131.5米，宽57米，深60米，终年吐云纳雾，震世撼俗。古往今来，无论是帝王将相还是平民百姓都把天门洞作为祈福许愿的灵地。而天门洞，就像一首无声的诗，承载了无数人的梦想，也给人无限的想象!从1999年世界特技飞行大师穿越天门开始，天门山注定成为一个永远被世界所聚焦的传奇之地!2006年，俄罗斯最高飞行战将含泪吻别天门，让天门洞一度成为了一个不可逾越的神话；2007年，法国著名蜘蛛人打破神话，成功徒手攀越天门，将生与死的绝壁芭蕾如花绽放，天门洞由此成为了奇迹诞生地的代名词。<br />\n<img src=\"https://imgcache.vikduo.com/oss/28b2317ce7d08f53693b722d62c9856f.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/e0deea26055f60d1360591b262e376ab.png\" /> <br />\n通天大道<br />\n通天大道是位于张家界天门山国家森林公园的一条盘山公路，蜿蜒逡巡于高山绝壁，是祈福朝圣天门的唯一通道。公路全长10.77公里，海拔落差近1100米，共有99个弯，其中180度的旋转急弯比比皆是，环环相扣，层层叠叠，犹如飘扬的玉带萦绕苍穹。通天大道，扶摇直上九重云霄，沿途可领略天门山的惊险奇崛，荡气回肠，被世人称为“天下第一公路奇观”。<br />\n<img src=\"https://imgcache.vikduo.com/oss/f53b137d90a27fc14b39b8ea34d76e17.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/391f9b7ef18c0efb49d9a8ffd09717e0.png\" /> <br />\n天门山索道<br />\n天门山索道位于张家界市天门山国家森林公园内。游客游览天门山时，上山必须坐观光索道。它是世高山观光客运索道，全长7454米，高差1277米，共有轿厢98个，单程运行时间约30分钟。其中站到上站之间的局部斜度高达37度，世界罕见，是国内局部斜度大的索道。<br />\n<img src=\"https://imgcache.vikduo.com/oss/84e005de804cd42b212cca770ebba4eb.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/fb250173050ffa5c80d7470056f06b69.png\" /><br />\n</div>\n",
            "additionalContent": "<div>\n费用包含\n<br />\n1.天门山分A、B两条路线，A线为索道上山、公路下山；B线为公路上山、索道山下。同一家价格，都为258元（门票价格：75，交通费：183），另外还包括代收3元保险费用，合计261元。不含天门洞扶梯，玻璃栈道鞋套，山顶森林小缆车费用。<br />\n<br />\n入园须知<br />\n1.入园时间：当天有效。天门山入园分时段，请自行协调好游玩时间。<br />\n2.入园地点：张家界市永定区大庸路天门山索道下站天门山国家森林公园景区入口<br />\n3.入园方式：1. 无需取票，凭预定门票二维码直接入园。   2.凭预定人身份证直接入园<br />\n4.有效期限： (有效期内可入园1次) 指定游玩日当天内有效<br />\n<br />\n优待政策<br />\n免费人群： 对身高1.3米(含1.3米)以下的儿童实行免票。 <br />\n优惠人群：<br />\na、对现役士兵、残疾人和年满70周岁以上（含70周岁）老年人凭有效证件实行92元/人次优惠票价。<br />\nb、对未成年人、24周岁（不含24周岁）以下的全日制大学本科及以下学历的学生、60周岁以上（含60周岁）70周岁以下（不含70周岁）的老年人、现役军人(军官、文职人员、士官、不含现役士兵)、军队离退休干部、烈士直系家属、持有民政部门颁发的《城乡居民最低生活保障金领取证》的人员，均凭有效证件享受130元/人次的优惠票价。<br />\nc、山顶吊椅索道执行单程挂牌价25元/人次。对未成年人、24周岁以下（不含24周岁）的全日制大学本科及以下学历的学生、60周岁以上（含60周岁）老年人、现役军人、残疾人、军队离退休干部、烈士直系家属、持民政部门颁发的《城乡居民最低生活保障金领取证》人员，均凭有效证件享受15元/人次的优惠票价。 <br />\n以上优惠人群均持相应的有效证件，前往景区现场购票。以上信息仅供参考，以张家界天门山国家森林公园景区当天披露为准。<br />\n预订限制<br />\n本产品仅限成人身份证预订，儿童票及优惠人群、护照，港澳通行证等其他证件，请自行前往张家界天门山国家森林公园景区购买。 <br />\n一个身份证号只能预定一张票，如购买超过一张，请提供不同的出行人身份证号预定下单。多人出行请在一个订单添加多位出行人，可提高景区验票效率，快速入园，且同一个订单中的所有出行人必须一起出行。为保证您顺利出行游玩，请保证预定身份证号真实有效（门票当日有效）。 <br />\n天门山门票实行严格的实名制订票，游客需持本人有效二代身份证取网络门票，不接受临时身份证及驾驶证等证件预定！游客取票游玩请携带好自身证件，如因自身原因未携带身份证取不了票所产生的损失，由游客自身承担，感谢您的配合。<br />\n退改规则<br />\n只要预定成功，凡是退票均产生手续费，在门票生效日期（预定的门票日期）前24小时内退款，扣除100元/张，提前24小时以上扣除30元/张，超过生效日期当日的下午5点仍没有发起退票的不再受理退票，全款扣除。例如：张三10月1日预定的10月3日的票，10月1日23:59前退款扣手续费30元，如果2日或者3日当天退票，均扣除100元。超过3日的17:00仍未发起退款，扣全部票款。<br />\n如需改期，请申请退款后重新预定<br />\n<br />\n温馨提示<br />\n张家界天门山国家森林公园和张家界国家森林公园是不同的，张家界国家森林公园是在武陵源区，2地相距大约32公里。游客预订时请注意您出游的目的地，以免订错！<br />\n景区出具的所有门票单据请务必保留至离开景区后，以免遗漏票据造成的不必要损失。<br />\n因高空栈道景点较刺激，请年长者根据自己的身体情况决定是否可以游览，有心脏病、高血压、恐高症等一切不适宜高空游览疾病或患病史的，均不建议游览。<br />\n安全指南<br />\n旅游安全是旅游的生命线，为保障游客“住得安心、吃得放心、玩的舒心”，从出行常识、旅游活动和特殊人群三方面为您提供旅游安全指南。出行前，提醒您仔细阅读相关内容，重视旅游安全，使您的出游真正成为“快乐之游、难忘之游、收获之游”。<br />\n<br />\n</div>\n ",
            "created": 1509593598,
            "modified": 1509593598,
            "enterTime": "08:00-18:00",
            "enterNotice": ""
        },
        "sceneryTicketSku": [
            {
                "date": "20171102",
                "details": [
                    {
                        "id": 5483,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1509580800,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "10:00",
                        "endTime": "11:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171103",
                "details": [
                    {
                        "id": 5484,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1509667200,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "12:00",
                        "endTime": "13:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171104",
                "details": [
                    {
                        "id": 5485,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1509753600,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "15:00",
                        "endTime": "16:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171105",
                "details": [
                    {
                        "id": 5486,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1509840000,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "14:00",
                        "endTime": "15:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171106",
                "details": [
                    {
                        "id": 5487,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1509926400,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "09:00",
                        "endTime": "10:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171107",
                "details": [
                    {
                        "id": 5488,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510012800,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "11:00",
                        "endTime": "12:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171108",
                "details": [
                    {
                        "id": 5489,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510099200,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "13:00",
                        "endTime": "14:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171109",
                "details": [
                    {
                        "id": 5490,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510185600,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "14:00",
                        "endTime": "15:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171110",
                "details": [
                    {
                        "id": 5491,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510272000,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "12:00",
                        "endTime": "13:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171111",
                "details": [
                    {
                        "id": 5492,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510358400,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "13:00",
                        "endTime": "14:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171112",
                "details": [
                    {
                        "id": 5493,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510444800,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "15:00",
                        "endTime": "16:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171113",
                "details": [
                    {
                        "id": 5494,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510531200,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "08:00",
                        "endTime": "09:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171114",
                "details": [
                    {
                        "id": 5495,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510617600,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "15:00",
                        "endTime": "16:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171115",
                "details": [
                    {
                        "id": 5496,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510704000,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "08:00",
                        "endTime": "09:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171116",
                "details": [
                    {
                        "id": 5497,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510790400,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "14:00",
                        "endTime": "15:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171117",
                "details": [
                    {
                        "id": 5498,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510876800,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "11:00",
                        "endTime": "12:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171118",
                "details": [
                    {
                        "id": 5499,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1510963200,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "14:00",
                        "endTime": "15:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171119",
                "details": [
                    {
                        "id": 5500,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511049600,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "10:00",
                        "endTime": "11:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171120",
                "details": [
                    {
                        "id": 5501,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511136000,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "10:00",
                        "endTime": "11:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171121",
                "details": [
                    {
                        "id": 5502,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511222400,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "13:00",
                        "endTime": "14:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171122",
                "details": [
                    {
                        "id": 5503,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511308800,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "13:00",
                        "endTime": "14:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171123",
                "details": [
                    {
                        "id": 5504,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511395200,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "09:00",
                        "endTime": "10:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171124",
                "details": [
                    {
                        "id": 5505,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511481600,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "12:00",
                        "endTime": "13:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171125",
                "details": [
                    {
                        "id": 5506,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511568000,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "11:00",
                        "endTime": "12:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171126",
                "details": [
                    {
                        "id": 5507,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511654400,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "09:00",
                        "endTime": "10:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171127",
                "details": [
                    {
                        "id": 5508,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511740800,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "13:00",
                        "endTime": "14:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171128",
                "details": [
                    {
                        "id": 5509,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511827200,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "14:00",
                        "endTime": "15:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171129",
                "details": [
                    {
                        "id": 5510,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1511913600,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "08:00",
                        "endTime": "09:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            },
            {
                "date": "20171130",
                "details": [
                    {
                        "id": 5511,
                        "merchantId": 8,
                        "storeId": 2,
                        "sceneryTicketId": 862,
                        "dayUse": 1512000000,
                        "price": 1,
                        "sales": 0,
                        "quota": 200,
                        "timeSpanNo": "-1",
                        "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                        "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                        "startTime": "11:00",
                        "endTime": "12:00",
                        "sort": 0,
                        "created": 1509593598,
                        "modified": 1509593598
                    }
                ]
            }
        ],
        "ticketGroup": {
            "id": 1,
            "name": "分组1",
            "sort": 0,
            "ticketNum": 0,
            "isDefault": 2,
            "merchantId": 8,
            "storeId": 2,
            "created": 0,
            "modified": 1513219022
        }
    }
}
      res.send(result);
    })
    // 编辑票
    app.post('/store/scenery_ticket/update', function(req, res) {
      var result = {
    "id":12345,
    "name": "大索道下站检票点 A线天门山散客网络票（索道上山-公路下山）",
    "subtitle": "大索道下站检票点 2017-11-02~2017-12-02",
    "keyword": "大索道下站检票点",
    "marketPrice": 1,
    "highPrice": 1,
    "lowPrice": 1,
    "hits": 0,
    "salesTotal": 0,
    "buyLimit": 0,
    "sort": 0,
    "showSaleNum": 2,
    "statusNum": 1,
    "timeEnd": 1512185598,
    "buyDayLimited": 30,
    "needPersonalInfo": 1,
    "groupId": 1,
    "modelType": 1,
    "retailPrice": 0,
    "sceneryTicketInfo": {
        "detailContent": " <div><br />\n7500米的观光索道，180度转弯的通天大道，还有贴壁悬空的玻璃栈道。<br />\n天门山，位于湖南省张家界市，距市区仅8公里，海拔1518.6米，是张家界海拔最高山，也是张家界的文化圣地，留有大量赞咏天门山的诗词，更有众多神闻传说，被尊为“张家界之魂”，有“湘西第一神山”的美誉。天门山是国家5A级旅游区，更有着“中国最值得外国人去的50个地方、中国最令人向往的地方、湖南新潇湘八景、中国自驾游百强景区、中国网民最关注的十大景区”等多项荣称。<br />\n<br />\n<img src=\"https://imgcache.vikduo.com/oss/798a9409f155181c837eb4e900ad062e.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/3b91bb977a80f166ad2bbe1b07a97172.png\" /><br />\n   <br />\n玻璃栈道<br />\n悬于天门山顶西线，长60米，宽1.6米，最高处海拔1430米，是张家界天门山景区继悬于峭壁之上的鬼谷栈道、凭空伸出的玻璃眺望台。玻璃栈道是张家界天门山景区继悬于峭壁之上的鬼谷栈道、凭空伸出的玻璃眺望台、横跨峡谷的木质吊桥后打造的又一试胆新景点，这条看着就让人腿软的玻璃栈道给人带来的刺激震撼感可与举世闻名的美国大峡谷玻璃走廊“天空之路”媲美。晴天时，蓝天和白云的倒影铺满了整条栈道，让人在对脚下的透明战战兢兢之余，更乐享于踏云而行的快感;云雾天气，玻璃栈道则在雾中若隐若现，天上人间的美景更是让人惊叹不已。<br />\n<img src=\"https://imgcache.vikduo.com/oss/934fe600ecc75071b1af1537b9ae3ed7.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/4618adf7373bf44aab72dd63853dc2dd.png\" /><br />\n   <br />\n鬼谷栈道<br />\n栈道全长1600米，平均海拔为1400米，起点是倚虹关，终点到小天门。与其他栈道不同的是，鬼谷栈道全线既不在悬崖之巅，也不在悬崖之侧，而是全线都立于万丈悬崖的中间，给人以与悬崖共起伏同屈的感觉。站在栈道上俯瞰群山，古人\"会当凌绝顶，一览众山小\"的感觉油然而生。由于天门山是国家森林公园，植被特别丰富，加上典型的喀斯特地貌，所以，在这条栈道上更能找到一种在乘坐直升飞机飞越热带雨林大峡谷的感觉，这平时只能在电影里看到的场景，在这里能让你身临其境。<br />\n<img src=\"https://imgcache.vikduo.com/oss/d8419b50c068103f99047b34637357d5.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/6d1dadafd6a65c42009b7461b677bdca.png\" />  <br />\n天门洞<br />\n世界高海拔天然穿山溶洞天门洞堪称传奇的代表。天门洞悬于海拔1300余米的峭壁之上，高131.5米，宽57米，深60米，终年吐云纳雾，震世撼俗。古往今来，无论是帝王将相还是平民百姓都把天门洞作为祈福许愿的灵地。而天门洞，就像一首无声的诗，承载了无数人的梦想，也给人无限的想象!从1999年世界特技飞行大师穿越天门开始，天门山注定成为一个永远被世界所聚焦的传奇之地!2006年，俄罗斯最高飞行战将含泪吻别天门，让天门洞一度成为了一个不可逾越的神话；2007年，法国著名蜘蛛人打破神话，成功徒手攀越天门，将生与死的绝壁芭蕾如花绽放，天门洞由此成为了奇迹诞生地的代名词。<br />\n<img src=\"https://imgcache.vikduo.com/oss/28b2317ce7d08f53693b722d62c9856f.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/e0deea26055f60d1360591b262e376ab.png\" /> <br />\n通天大道<br />\n通天大道是位于张家界天门山国家森林公园的一条盘山公路，蜿蜒逡巡于高山绝壁，是祈福朝圣天门的唯一通道。公路全长10.77公里，海拔落差近1100米，共有99个弯，其中180度的旋转急弯比比皆是，环环相扣，层层叠叠，犹如飘扬的玉带萦绕苍穹。通天大道，扶摇直上九重云霄，沿途可领略天门山的惊险奇崛，荡气回肠，被世人称为“天下第一公路奇观”。<br />\n<img src=\"https://imgcache.vikduo.com/oss/f53b137d90a27fc14b39b8ea34d76e17.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/391f9b7ef18c0efb49d9a8ffd09717e0.png\" /> <br />\n天门山索道<br />\n天门山索道位于张家界市天门山国家森林公园内。游客游览天门山时，上山必须坐观光索道。它是世高山观光客运索道，全长7454米，高差1277米，共有轿厢98个，单程运行时间约30分钟。其中站到上站之间的局部斜度高达37度，世界罕见，是国内局部斜度大的索道。<br />\n<img src=\"https://imgcache.vikduo.com/oss/84e005de804cd42b212cca770ebba4eb.png\" /><br />\n<img src=\"https://imgcache.vikduo.com/oss/fb250173050ffa5c80d7470056f06b69.png\" /><br />\n</div>\n",
        "additionalContent": "<div>\n费用包含\n<br />\n1.天门山分A、B两条路线，A线为索道上山、公路下山；B线为公路上山、索道山下。同一家价格，都为258元（门票价格：75，交通费：183），另外还包括代收3元保险费用，合计261元。不含天门洞扶梯，玻璃栈道鞋套，山顶森林小缆车费用。<br />\n<br />\n入园须知<br />\n1.入园时间：当天有效。天门山入园分时段，请自行协调好游玩时间。<br />\n2.入园地点：张家界市永定区大庸路天门山索道下站天门山国家森林公园景区入口<br />\n3.入园方式：1. 无需取票，凭预定门票二维码直接入园。   2.凭预定人身份证直接入园<br />\n4.有效期限： (有效期内可入园1次) 指定游玩日当天内有效<br />\n<br />\n优待政策<br />\n免费人群： 对身高1.3米(含1.3米)以下的儿童实行免票。 <br />\n优惠人群：<br />\na、对现役士兵、残疾人和年满70周岁以上（含70周岁）老年人凭有效证件实行92元/人次优惠票价。<br />\nb、对未成年人、24周岁（不含24周岁）以下的全日制大学本科及以下学历的学生、60周岁以上（含60周岁）70周岁以下（不含70周岁）的老年人、现役军人(军官、文职人员、士官、不含现役士兵)、军队离退休干部、烈士直系家属、持有民政部门颁发的《城乡居民最低生活保障金领取证》的人员，均凭有效证件享受130元/人次的优惠票价。<br />\nc、山顶吊椅索道执行单程挂牌价25元/人次。对未成年人、24周岁以下（不含24周岁）的全日制大学本科及以下学历的学生、60周岁以上（含60周岁）老年人、现役军人、残疾人、军队离退休干部、烈士直系家属、持民政部门颁发的《城乡居民最低生活保障金领取证》人员，均凭有效证件享受15元/人次的优惠票价。 <br />\n以上优惠人群均持相应的有效证件，前往景区现场购票。以上信息仅供参考，以张家界天门山国家森林公园景区当天披露为准。<br />\n预订限制<br />\n本产品仅限成人身份证预订，儿童票及优惠人群、护照，港澳通行证等其他证件，请自行前往张家界天门山国家森林公园景区购买。 <br />\n一个身份证号只能预定一张票，如购买超过一张，请提供不同的出行人身份证号预定下单。多人出行请在一个订单添加多位出行人，可提高景区验票效率，快速入园，且同一个订单中的所有出行人必须一起出行。为保证您顺利出行游玩，请保证预定身份证号真实有效（门票当日有效）。 <br />\n天门山门票实行严格的实名制订票，游客需持本人有效二代身份证取网络门票，不接受临时身份证及驾驶证等证件预定！游客取票游玩请携带好自身证件，如因自身原因未携带身份证取不了票所产生的损失，由游客自身承担，感谢您的配合。<br />\n退改规则<br />\n只要预定成功，凡是退票均产生手续费，在门票生效日期（预定的门票日期）前24小时内退款，扣除100元/张，提前24小时以上扣除30元/张，超过生效日期当日的下午5点仍没有发起退票的不再受理退票，全款扣除。例如：张三10月1日预定的10月3日的票，10月1日23:59前退款扣手续费30元，如果2日或者3日当天退票，均扣除100元。超过3日的17:00仍未发起退款，扣全部票款。<br />\n如需改期，请申请退款后重新预定<br />\n<br />\n温馨提示<br />\n张家界天门山国家森林公园和张家界国家森林公园是不同的，张家界国家森林公园是在武陵源区，2地相距大约32公里。游客预订时请注意您出游的目的地，以免订错！<br />\n景区出具的所有门票单据请务必保留至离开景区后，以免遗漏票据造成的不必要损失。<br />\n因高空栈道景点较刺激，请年长者根据自己的身体情况决定是否可以游览，有心脏病、高血压、恐高症等一切不适宜高空游览疾病或患病史的，均不建议游览。<br />\n安全指南<br />\n旅游安全是旅游的生命线，为保障游客“住得安心、吃得放心、玩的舒心”，从出行常识、旅游活动和特殊人群三方面为您提供旅游安全指南。出行前，提醒您仔细阅读相关内容，重视旅游安全，使您的出游真正成为“快乐之游、难忘之游、收获之游”。<br />\n<br />\n</div>\n ",
        "enterTime": "08:00-18:00",
        "enterNotice": ""
    },
    "sceneryTicketSku": [
        {
            "date": "20171102",
            "details": [
                {
                    "dayUse": 1509580800,
                    "price": 1,
                    "sales": 0,
                    "quota": 200,
                    "startTime": "10:00",
                    "endTime": "11:00",
                    "sort": 0
                },
                {
                    "dayUse": 1509580800,
                    "price": 1,
                    "sales": 0,
                    "quota": 200,
                    "startTime": "12:00",
                    "endTime": "14:00",
                    "sort": 0
                }
            ]
        },
        {
            "date": "20171103",
            "details": [
                {
                    "dayUse": 1509667200,
                    "price": 1,
                    "sales": 0,
                    "quota": 200,
                    "timeSpanNo": "-1",
                    "otherProductNo": "9e5d08ccac0649269099d548536b0b93",
                    "otherProductName": "A线天门山散客网络票（索道上山-公路下山）",
                    "startTime": "12:00",
                    "endTime": "13:00",
                    "sort": 0,
                    "created": 1509593598,
                    "modified": 1509593598
                }
            ]
        }
    ]
}

      res.send(result);
    })

    // 删除票
    app.post('/store/scenery_ticket/delete', function(req, res) {
      var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": [
          1
        ]
      };
      res.send(result);
    })

    // 启用票
    app.post('/store/scenery_ticket/open', function(req, res) {
      var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": [
          1
        ]
      };
      res.send(result);
    })

    // 禁用票
    app.post('/store/scenery_ticket/close', function(req, res) {
      var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": [
          1
        ]
      };
      res.send(result);
    })

    // 分组列表
    app.post('/store/ticket_group/find', function(req, res) {
      var result = {
        "data": [
            {
                "id": 75, 
                "name": "mock", 
                "sort": 23, 
                "is_default": 1, 
                "ticketNum": 63, 
                "created": 1513304435, 
                "modified": 25, 
                "storeId": 48, 
                "merchantId": 2332
            },{
              "id": 23, 
              "name": "gafg", 
              "sort": 24, 
              "is_default": 2, 
              "ticketNum": 63, 
              "created": 1513304435, 
              "modified": 25, 
              "storeId": 48, 
              "merchantId": 2346
            },{
              "id": 24, 
              "name": "gfdhj", 
              "sort": 25, 
              "is_default": 2, 
              "ticketNum": 63, 
              "created": 1513304435, 
              "modified": 25, 
              "storeId": 48, 
              "merchantId": 2334
            }
          ],
          "page": {
            "currentPage": 1, 
            "totalCount": 4, 
            "totalPage": 1
          }
      }
      res.send(result);
    })

    // 创建分组
    app.post('/store/ticket_group/create', function(req, res) {
      var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": [
          1
        ]
      };
      res.send(result);
    })

    // 更新分组
    app.post('/store/ticket_group/update', function(req, res) {
      var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": [
          1
        ]
      };
      res.send(result);
    })

    // 删除票分组
    app.post('/store/ticket_group/delete', function(req, res) {
      var result = {
        "errcode": "0",
        "errmsg": "ok",
        "data": [
          1
        ]
      };
      res.send(result);
    })
}
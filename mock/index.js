let express = require('express');
let app = express();
const bodyParser = require('body-parser');
let common = require('./common/index');
let outlets = require('./outlets/index');
let setting = require('./setting/index');
let cashier = require('./cashier/index');
let order = require('./order/index');
let ticket = require('./ticket/index');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

common.getCommonApi(app);
outlets.getOutletsApi(app);
setting.getSettingApi(app);
cashier.getListApi(app)
order.getOrderApi(app)
ticket.getTicketApi(app)

app.listen(5000, function () {
  console.log('HTTP server at localhost: 5000');
})
const router = require('express').Router();
const {preventRoute} = require('./preventRoute');
const {updateStatus,getOrders} = require('../controllers/orderController')
 router.get('/getOrders', getOrders)
 router.put('/updateStatus',preventRoute,updateStatus)
module.exports = router;
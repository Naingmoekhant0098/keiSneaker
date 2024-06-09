const router = require('express').Router();
const {preventRoute} = require('./preventRoute');
const {getComments,getOrders,getReview,getProducts,getUsers} = require('../controllers/dashController')
router.get('/getOrders',preventRoute , getOrders)
router.get('/getReview',getReview);
router.get('/getProducts', getProducts)
router.get('/getUsers', getUsers)
router.get('/getComments', getComments)

module.exports = router;
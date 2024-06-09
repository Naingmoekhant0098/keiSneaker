const {preventRoute} = require('./preventRoute');
const router = require('express').Router();
const {checkoutSec,editReply,deleteReply,unLikeReply,likeReply,getReply,addReply,editComment,deleteComment,unLikeComment,likeComment,getComments,addComment,unLikeReview,likeReview,updateStatus,getReview,addProduct,getProducts,addDiscount,deleteProduct,stockProduct,editProduct,addReview} = require('../controllers/productController')
 
router.post('/addProduct',preventRoute, addProduct)
router.get('/getProducts', getProducts)
router.put('/addDiscount',preventRoute, addDiscount)
router.delete('/deleteProduct/:id',preventRoute, deleteProduct)
router.get('/stockProduct/:id',preventRoute, stockProduct)
router.put('/editProduct/:id',preventRoute, editProduct)
router.post('/addReview',preventRoute,addReview);
router.get('/getReview',getReview);
router.put('/updateStatus',preventRoute,updateStatus)
router.put('/likeReview',preventRoute,likeReview)
router.put('/unLikeReview',preventRoute,unLikeReview)
router.post('/addComment',preventRoute,addComment)
router.get('/getComments/:id',preventRoute,getComments)
router.put('/likeComment',preventRoute,likeComment)
router.put('/unLikeComment',preventRoute,unLikeComment)
router.get('/deleteComment/:id',preventRoute,deleteComment)
router.put('/editComment',preventRoute,editComment)
router.post('/addReply',preventRoute,addReply)
router.get('/getReply/:id',preventRoute,getReply)
router.put('/likeReply',preventRoute,likeReply)
router.put('/unLikeReply',preventRoute,unLikeReply)
router.get('/deleteReply/:id',preventRoute,deleteReply)
router.put('/editReply',preventRoute,editReply)
router.post('/checkout-session',checkoutSec)
module.exports = router;
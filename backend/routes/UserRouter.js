const {preventRoute} = require('./preventRoute');
const router = require('express').Router();
const {getUsers,deleteUser,addWatchList} = require('../controllers/userController')
router.get('/getUsers', getUsers)
router.delete('/deleteUser/:id',preventRoute, deleteUser)
router.put('/addWatchlist' , addWatchList)
module.exports = router;
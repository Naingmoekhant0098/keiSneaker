const router = require('express').Router();
const {signUp,signIn,signWithGoogle} = require('../controllers/authController')

router.post('/sign-up',signUp)
router.post('/sign-in',signIn)
router.post('/sign-with-google',signWithGoogle)
module.exports = router;
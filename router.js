const router = require('express').Router(),
authController =  require('./controller/authController'),
roomController = require('./controller/roomController'),
profileController = require('./controller/profileController'),
isLogginMiddleware = require('./middleware/isLogginMiddleware'),
partnerController = require('./controller/partnerController')

router.get('/', isLogginMiddleware, function(req, res) {
    res.send('im the home page!') 
});

router.use('/room', roomController)
router.use('/auth', authController)
router.use('/profile', profileController)
router.use('/partner', partnerController)

module.exports = router;
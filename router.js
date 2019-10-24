const router = require('express').Router()
const authController =  require('./controller/authController')
const roomController = require('./controller/roomController')
const isLogginMiddleware = require('./middleware/isLogginMiddleware')

router.get('/', isLogginMiddleware, function(req, res) {
    res.send('im the home page!') 
});

router.use('/room', roomController)
router.use('/auth', authController)
module.exports = router;
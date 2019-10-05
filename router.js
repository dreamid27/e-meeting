const router = require('express').Router()
const authController =  require('./controller/authController')

router.get('/', function(req, res) {
    res.send('im the home page!') 
});
router.use('/auth', authController)

// app.use('/auth', authRoutes)

module.exports = router;
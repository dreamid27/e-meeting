const express = require('express'), 
router = express.Router(), 
profileService = require('../services/profileService'),
authService = require('../services/authService');

router.put('/', async function (req, res) {
    const tempBody = req.body;
    let tempUser = await authService.getUser(req.headers.authorization);
    tempBody['user_id'] = tempUser['_id'];
    let tempProfile = await profileService.updateProfile(tempBody);
    res.send(tempProfile);
});

router.get('/userid/:user_id', async function (req, res) {
    let userId = req.params.user_id
    let tempProfile = await profileService.getProfile(userId);
    res.send(tempProfile);
});

router.get('/me', async function (req, res) {
    let tempUser = await authService.getUser(req.headers.authorization);
    let tempProfile = await profileService.getProfile(tempUser['_id']);
    res.send(tempProfile);
})

module.exports = router



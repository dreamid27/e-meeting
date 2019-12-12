const express = require('express'), 
router = express.Router(), 
partnerService = require('../services/partnerService'),
profileService = require('../services/profileService'),
authService = require('../services/authService'),
mailService = require('../services/mailService');

router.put('/', async function (req, res)  {
    const tempBody = req.body;
    let tempUser = await authService.getUser(req.headers.authorization);
    tempBody['user_id'] = tempUser['_id'];
    tempBody['date'] = new Date();

    //update partnert 
    partnerService.updatePartner(tempBody).then(
        msg => {
            res.send(msg);
        }
    )
});

router.post('/add', async function(req, res) {
    try {
        let tempUser = await checkUserIsAvailable(req, res);
        const tempBody = req.body;
        tempBody['user_id'] = tempUser['_id']
        let checkUserAlreadyReq = await partnerService.getPartner({
            'user_id': tempUser['_id'],
            'partner_id': tempBody['partner_id'],
            'status': 0
        });

        if (checkUserAlreadyReq && checkUserAlreadyReq.length > 0) throw ({'code': 400, 'msg': 'Ta\'aruf kepada calon pasangan ini sudah pernah di ajukan.'});

        partnerService.updatePartner(tempBody).then(
            msg => {
                res.send(msg);
            }
        )
    } catch (error) {
        res.status(error['code'] || 500);
        res.send(error['msg'] || error);
    }
});

router.get('/get', async function(req, res) {
    let tempParams = req.params;
    let tempUser = await authService.getUser(req.headers.authorization);
    let tempProfile = await profileService.getProfile(tempUser['_id']);
    let dataPartnerts = await profileService.getAllProfile({
        'gender':  {$ne : tempProfile.gender},
        'in_relation': 0,
        'user_id': { $ne: tempProfile._id }
    }, {'limit': tempParams.limit || 0, 'skip': (tempParams.page || 0) * (tempParams.limit || 0) });
    res.send(dataPartnerts)
});

router.post('/status', async function(req, res) {
    try {
        let tempBody = req.body;
        tempBody['status'] = parseInt(tempBody['status']);
        console.log(tempBody, 'tempPartnert')
        const tempPartner = await partnerService.updatePartner(tempBody);
        if (tempPartner['status'] == 1) {
            let tempUserId = tempPartner['user_id'], 
            tempPartnerId = tempPartner['partner_id'];
            let tempProfile = await profileService.updateProfile({'user_id': tempUserId, 'in_relation': 1, 'detail_relation': {'type': tempPartner['type'], 'partner_id': tempPartnerId}})
            let tempProfilePartner = await profileService.updateProfile({'user_id': tempPartnerId, 'in_relation': 1, 'detail_relation': {'type': tempPartner['type'], 'partner_id': tempUserId}})
        }
        mailService.sendMessage();
        res.send(tempPartner);
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan')
    }
    
});

router.post('/cancel', async function(req, res) {
    let tempUser = await authService.getUser(req.headers.authorization);
    console.log(tempUser)
    let tempProfile = await profileService.getProfile(tempUser['_id']);
    let tempData = {
        'in_relation': 0,
        'user_id': tempUser['_id'],
        'detail_relation':  null
    };

    let tempUserId = tempProfile['user_id'];
    let tempPartnerId = tempProfile['detail_relation'].partner_id;
    await profileService.updateProfile({'user_id': tempUserId, 'in_relation': 0, 'detail_relation': undefined })
    await profileService.updateProfile({'user_id': tempPartnerId, 'in_relation': 0, 'detail_relation': undefined })
    // profileService.updateProfile(tempData).then(
    //     msg => res.send(msg)
    // )
    res.send('Berhasil ubah')
})

router.get('/request/me', async function(req, res) {
    let tempUser = await authService.getUser(req.headers.authorization);
    const isAccepted = req.query['isAccepted'];
    const filter = isAccepted && isAccepted === 'true' ? 
    {'user_id': tempUser['_id']} : 
    {'partner_id': tempUser['_id'], 'status': 0}
    console.log(filter, 'filter')
    let dataPartners = await partnerService.getPartner(filter);
    res.send(dataPartners);
});




const checkUserIsAvailable = (async function(req, res){
    const tempBody = req.body;
    let tempUser = await authService.getUser(req.headers.authorization);
    let tempPartnerUser = tempBody['partner_id'];

    let tempProfile = await profileService.getProfile(tempUser['_id']);
    let tempPartnerProfile = await profileService.getProfile(tempPartnerUser);
    if (tempProfile['in_relation'] == 1) res.send('Anda sedang dalam proses taaruf');
    if (tempPartnerProfile['in_relation' == 1]) res.send('Calon yang anda ajukan sedang dalam proses taaruf');

    return tempUser;
})

module.exports = router



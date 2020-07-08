const express = require('express'), 
router = express.Router(),
saleService = require('../../services/POS/saleService');


router.post('/', async function(req, res) {
    try {
        const tempBody = req.body;
        console.log(tempBody, 'tempbody')
        saleService.updateSale(tempBody).then(
            msg => {
                res.send(msg);
            }
        )
    } catch (error) {
        res.status(error['code'] || 500);
        res.send(error['msg'] || error);
    }
});

module.exports = router



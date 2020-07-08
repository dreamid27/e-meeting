const express = require('express'), 
router = express.Router(),
inventoryService = require('../../services/POS/inventoryService');


router.post('/', async function(req, res) {
    try {
        const tempBody = req.body;
        inventoryService.updateInventory(tempBody).then(
            msg => {
                res.send(msg);
            }
        )
    } catch (error) {
        res.status(error['code'] || 500);
        res.send(error['msg'] || error);
    }
});

router.get('/', async function(req, res) {
    let tempParams = req.query;
    // let tempUser = await authService.getUser(req.headers.authorization);
    // let tempProfile = await profileService.getProfile(tempUser['_id']);
    let skipItems = (tempParams.page && tempParams.page - 1) * (tempParams.limit || 0);
    let limitItems = parseFloat(tempParams.limit || 0);
    let dataInventories = await inventoryService.getInventories({}, {'limit': limitItems, 'skip': skipItems});
    let countInventories = await inventoryService.countInventories();

    let totalPage = Math.ceil(parseFloat(countInventories) / parseFloat(tempParams.limit));
    let tempObj = {'items': dataInventories, 'paginatiion': {'total_page': +totalPage, 'page': +tempParams.page, 'total_data': +countInventories, 'limit': +tempParams.limit}}
    res.send(tempObj)
});

router.get('/:inventoryId', async function(req, res) {
    let inventoryId = req.params && req.params['inventoryId'];
    if (inventoryId) { 
        let dataInventory = await inventoryService.getInventory(inventoryId); 
        res.send(dataInventory);
    } else {
        res.send(req.params)
    }
})


module.exports = router



const inventoryModel = require('../../model/POS/inventoryModel');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_API, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind('Connection error:'))
.then(obj => console.log('Connected'))
.catch(obj => console.log('not connected'));
var ObjectId = require('mongoose').Types.ObjectId; 

const updateInventory = async (_inventoryData) => {
    try {
        let tempObj = _inventoryData;

        if (tempObj['_id']) {
            let resInventory = await inventoryModel.findOneAndUpdate(
                {_id: tempObj['_id'] },
                tempObj,
                { new: true }
            );

            return resInventory;
        } else {
            let objInventory = new inventoryModel(tempObj);
            let resInventory = await objInventory.save();
            return resInventory;
        }
    } catch (error) {
        console.error(error);
        return `Inventory gagal di update`;
    }
}

const getInventories = async(_filter, _pagination) => {
    try {
        let resInventories = await inventoryModel.find(_filter).limit(_pagination.limit || 10).skip(_pagination.skip || 0);
        return resInventories;
    } catch (err) {
        console.error(err);
        return err;        
    }
}

const getInventory = async(_inventoryId) => {
    try {
        let resInventory = await inventoryModel.findOne({
            _id:_inventoryId
        });
        return resInventory;
    } catch (err) {
        console.error(err);
        return err;
    }
}

const countInventories = async(_filter) => {
    try {
        let resInventory = await inventoryModel.count(_filter).exec();
        return resInventory
    } catch (err) {
        console.error(err);
        return err;
    }
}


module.exports = {updateInventory, getInventories, countInventories, getInventory};

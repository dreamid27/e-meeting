const saleModel = require('../../model/POS/saleModel');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_API, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind('Connection error:'))
.then(obj => console.log('Connected'))
.catch(obj => console.log('not connected'));
var ObjectId = require('mongoose').Types.ObjectId; 

const updateSale = async (_saleData) => {
    try {
        let tempObj = _saleData;
        console.log(tempObj, 'tempObj')
        if (tempObj['_id']) {
            let resSales = await saleModel.findOneAndUpdate(
                {_id: tempObj['_id'] },
                tempObj,
                { new: true }
            );

            return resSales;
        } else {
            let objSales = new saleModel(tempObj);
            let resSales = await objSales.save();
            return resSales;
        }
    } catch (error) {
        console.error(error);
        return `Sales gagal di update`;
    }
}

const getSales = async(_filter, _pagination) => {
    try {
        let resSales = await saleModel.find(_filter).limit(_pagination.limit || 10).skip(_pagination.skip || 0);
        return resSales;
    } catch (err) {
        console.error(err);
        return err;        
    }
}

const getSale = async(_saleId) => {
    try {
        let resSales = await saleModel.findOne({
            _id:_saleId
        });
        return resSales;
    } catch (err) {
        console.error(err);
        return err;
    }
}

const countSale = async(_filter) => {
    try {
        let resSales = await saleModel.count(_filter).exec();
        return resSales
    } catch (err) {
        console.error(err);
        return err;
    }
}


module.exports = {updateSale, getSale, countSale, getSales};

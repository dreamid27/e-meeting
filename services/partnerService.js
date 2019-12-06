const partnerModel = require('../model/partnerModel');
const profileModel = require('../model/profileModel');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_API, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind('Connection error:'))
.then(obj => console.log('Connected'))
.catch(obj => console.log('not connected'));
var ObjectId = require('mongoose').Types.ObjectId; 

const updatePartner = async (_partnerData) => {
    try {
        let tempObj = _partnerData;

        if (tempObj['id']) {
            let resPartner = await partnerModel.findOneAndUpdate(
                {_id: tempObj['id'] },
                tempObj,
                { new: true }
            );

            return resPartner;

            // let tempRelation = 0;
            // if (tempObj['status'] == 1) tempRelation = 1;
            
            //  //update status partner
            //  let resUser = await profileModel.findOneAndUpdate(
            //     {user_id: resPartner['user_id']},
            //     {in_relation: tempRelation})
            
            // let resPartnersss = await profileModel.findOneAndUpdate(
            //     {user_id: resPartner['partner_id']},
            //     {in_relation: tempRelation});
    
            // if (resPartner)
            //     return `Partner berhasil di update`;
        } else {
            let objPartner = new partnerModel(tempObj);
            let resPartner = await objPartner.save();
            return resPartner;
        }
    } catch (error) {
        console.error(error);
        return `Partner gagal di update`;
    }
}

const getPartner = async (_filter) => {
    try {
        let objProfile = await partnerModel.find(_filter);
        return objProfile;
    } catch (error) {
        return error;
    }
}


module.exports = {updatePartner, getPartner}
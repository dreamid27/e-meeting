const profileModel = require('../model/profileModel');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_API, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind('Connection error:'))
.then(obj => console.log('Connected'))
.catch(obj => console.log('not connected'));
var ObjectId = require('mongoose').Types.ObjectId; 


const updateProfile = async (_profileData) => {
    // let nameObject = ['full_name', 'religion', 'manhaj', 'date_birth', 'gender', 'user_id', 'in_relation', 'detail_relation', 'ds'];
    let tempObj = _profileData;

    // nameObject.forEach(el => {
    //     if (typeof _profileData[el] != 'undefined') tempObj[el] = _profileData[el];
    // });


    let resProfile = profileModel.findOneAndUpdate(
        {user_id: new ObjectId(_profileData['user_id'])}, 
        tempObj, 
        {upsert: true, new: true, runValidators: false},
        function (err, doc) { // callback
            if (err) {
                console.log(err, doc)
                // handle error
            } else {
                // handle document
            }
        }
    )
    return resProfile;
}

const getAllProfile = async (_filter, _pagination) => {
    let objProfile = await profileModel.find(_filter).limit(_pagination.limit || 10).skip(_pagination.skip || 0);
    return objProfile;
}

const getProfile = async (_user_id) => {
    let objProfile = await profileModel.findOne({
        user_id: _user_id
    });
    return objProfile;
}
module.exports = {updateProfile, getAllProfile, getProfile}
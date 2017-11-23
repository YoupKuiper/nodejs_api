module.exports = {

    putSetting: function (db, setting, userId, callback) {
        //TODO: implement changing a setting for a user
        db.collection('settings').findOneAndUpdate({"userId": userId}, {$set: setting},{ returnOriginal: false}, (error, consultants) => {
            if(error){
                callback(error);
            }else{
                callback(consultants);
            }
        })
    }
};

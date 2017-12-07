module.exports = {

    putSetting: function (db, setting, userId, callback) {
        //TODO: implement changing a setting for a user
        db.collection('settings').findOneAndUpdate({"userId": userId}, {$set: setting},{ returnOriginal: false}, (error, setting) => {
            if(error){
                callback(error);
            }else{
                callback(setting);
            }
        })
    },

    getSettings: function (db, userId, callback) {
        db.collection('settings').findOne({"userId": userId}, (error, settings) => {
            if(error){
                callback(error);
            }else{
                callback(settings);
            }
        })
    }
};

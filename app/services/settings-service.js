const settingsProvider = require('../dataproviders/settings-provider');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    putSetting: function (db, setting, userId, callback) {
        userId = ObjectId(userId);

        //Convert string "true" or "false" to boolean
        for(var i in setting){
            if(setting[i] === "true"){
                setting[i] = true;
            }else{
                setting[i] = false;
            }
        }
        settingsProvider.putSetting(db, setting, userId, (error, result) => {
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        })
    },
    
    getSettings: function (db, userId, callback) {
        userId = ObjectId(userId);

        settingsProvider.getSettings(db, userId, (error, result) => {
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        })
    }
};
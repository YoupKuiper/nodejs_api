const settingsProvider = require('../dataproviders/settings-provider');

module.exports = {
    putSetting: function (db, setting, callback) {
        settingsProvider.putSetting(db, setting, (error, result) => {
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        })
    }
};
module.exports = {

    putSetting: function (db, setting, callback) {
        //TODO: implement changing a setting for a user
        db.collection('settings').find().toArray((error, consultants) => {
            if(error){
                callback(error);
            }else{
                callback(consultants);
            }
        })
    }
};

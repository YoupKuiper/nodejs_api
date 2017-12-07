const measurementProvider = require('../dataproviders/measurement-provider');

module.exports = {
    postMeasurement: function (db, measurement, userId, callback) {
        measurementProvider.postMeasurement(db, measurement, userId, (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null, result);
            }
        })
    },
    
    getMeasurements: function (db, userId, callback) {
        measurementProvider.getMeasurements(db, userId, (error, measurements) => {
            if(error){
                callback(error);
            }else{
                callback(null, measurements)
            }
        })
    }
}
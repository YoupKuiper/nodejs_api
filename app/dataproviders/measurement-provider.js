const ObjectId = require('mongodb').ObjectID;

module.exports = {
    postMeasurement: function (db, measurement, userId, callback) {
        let date = new Date();
        date.setDate(date.getDate());
        userId = ObjectId(userId);
        measurement.userId = userId;
        measurement.measurementDateTime = date;

        db.collection('measurements').insertOne(measurement, (error, result)=> {
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        })
    },
    
    getMeasurements: function (db, userId, callback) {
        userId = ObjectId(userId);
        let startDate = new Date();
        startDate.setDate(startDate.getDate() -31);
        db.collection('measurements').find({ $and: [{"userId": userId}, {"measurementDateTime": {$gte: startDate}}]}).toArray(function (error, measurements) {
            if(error){
                callback(error);
            }else{
                callback(null, measurements);
            }
        })
    }
}
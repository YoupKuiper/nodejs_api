var ObjectId = require('mongodb').ObjectID;

module.exports = {
    postMeasurement: function (db, measurement, callback) {
        let date = new Date();
        date.setDate(date.getDate()-20)
        measurement = null;
        let userId = "5a0ad4ac9b582a11641e12fa";
        userId = ObjectId(userId);
        measurement = {
            userId: userId,
            measurementDateTime: date
        };
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
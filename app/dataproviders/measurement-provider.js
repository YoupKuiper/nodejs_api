const ObjectId = require('mongodb').ObjectID;

module.exports = {
    postMeasurement: function (db, measurement, userId, callback) {
        let date = new Date();
        date.setDate(date.getDate());
        userId = ObjectId(userId);
        measurement.userId = userId;
        measurement.measurementDateTime = date;

        if (parseInt(measurement.bloodPressureUpper) >= 159 || parseInt(measurement.bloodPressureLower) >= 109) {
            measurement.feedback = "Uw bloeddruk is erg hoog, neem contact op met uw consulent.";
            measurement.result = 2;
        }else if(parseInt(measurement.bloodPressureUpper) > 139 || parseInt(measurement.bloodPressureLower)
            > 89){
            measurement.feedback = "Uw bloeddruk is iets hoger dan gemiddeld, \nmaar u hoeft zich geen zorgen te maken.";
            measurement.result = 1;
        }else{
            measurement.feedback = "Uw bloeddruk is prima.";
            measurement.result = 0
        }
        db.collection('measurements').insertOne(measurement, (error, result)=> {
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        })
    },

    putMeasurement: function (db, measurement, userId, callback) {
        measurement._id = ObjectId(measurement._id);
        measurement.userId = ObjectId(measurement.userId);
        measurement.comment = measurement.comment ? measurement.comment : "";

        if (parseInt(measurement.bloodPressureUpper) >= 159 || parseInt(measurement.bloodPressureLower) >= 109) {
            measurement.feedback = "Uw bloeddruk is erg hoog, neem contact op met uw consulent.";
            measurement.result = 2;
        }else if(parseInt(measurement.bloodPressureUpper) > 139 || parseInt(measurement.bloodPressureLower)
            > 89){
            measurement.feedback = "Uw bloeddruk is iets hoger dan gemiddeld, \nmaar u hoeft zich geen zorgen te maken.";
            measurement.result = 1;
        }else{
            measurement.feedback = "Uw bloeddruk is prima.";
            measurement.result = 0
        }

        db.collection('measurements').findOneAndUpdate({"_id": measurement._id},
            {$set:
                {
                    "bloodPressureUpper": measurement.bloodPressureUpper,
                    "bloodPressureLower": measurement.bloodPressureLower,
                    "healthIssueIds": measurement.healthIssueIds,
                    "healthIssueOther": measurement.healthIssueOther,
                    "comment": measurement.comment,
                    "feedback": measurement.feedback,
                    "result": measurement.result
                }}, (error, result)=> {
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
        db.collection('measurements').find({ $and: [{"userId": userId}, {"measurementDateTime": {$gte: startDate}}]}).sort({"measurementDateTime": -1}).toArray(function (error, measurements) {
            if(error){
                callback(error);
            }else{
                callback(null, measurements);
            }
        })
    }
}
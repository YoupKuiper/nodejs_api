const measurementProvider = require('../dataproviders/measurement-provider');
const authorizationService = require('./authorization-service');
const async = require('async');

module.exports = {
    
    postMeasurement: function (db, measurement, headers, callback) {
        async.waterfall([
            function (callback) {
                authorizationService.validateAuthtoken(db, headers, (error, result) => {
                    if(error){
                        callback(error);
                    }else{
                        callback(null, result);
                    }
                })
            },
            function (user, callback) {
                measurementProvider.postMeasurement(db, measurement, user._id, (error, result) => {
                    if (error) {
                        callback(error);
                    } else {
                        callback(null, result);
                    }
                })
            }
        ], function (error, result) {
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        })

    },
    
    getMeasurements: function (db, headers, callback) {
        async.waterfall([
            function (callback) {
                authorizationService.validateAuthtoken(db, headers, (error, result) => {
                    if(error){
                        callback(error);
                    }else{
                        callback(null, result);
                    }
                })
            },
            function (user, callback) {
                measurementProvider.getMeasurements(db, userId, (error, measurements) => {
                    if(error){
                        callback(error);
                    }else{
                        callback(null, measurements)
                    }
                })
            }
        ], function (error, result) {
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        })
    }
}
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
                measurementProvider.getMeasurements(db, user._id, (error, measurements) => {
                    if(error){
                        callback(error);
                    }else{
                        callback(null, measurements)
                    }
                })
            },
            function (measurements, callback) {
                for(let i = 0; i < measurements.length; i++){
                    measurements[i].measurementDateFormatted = formatDate(measurements[i].measurementDateTime);
                }
                callback(null, measurements);
            }
        ], function (error, result) {
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        })
    }
};

function formatDate(date) {
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDay();
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }

    switch(month) {
        case 1:
            month = 'jan';
            break;
        case 2:
            month = 'feb';
            break;
        case 3:
            month = 'maa';
            break;
        case 4:
            month = 'apr';
            break;
        case 5:
            month = 'mei';
            break;
        case 6:
            month = 'jun';
            break;
        case 7:
            month = 'jul';
            break;
        case 8:
            month = 'aug';
            break;
        case 9:
            month = 'sept';
            break;
        case 10:
            month = 'okt';
            break;
        case 11:
            month = 'nov';
            break;
        case 12:
            month = 'dec';
            break;
        default:
    }

    switch(day) {
        case 0:
            day = 'zo';
            break;
        case 1:
            day = 'ma';
            break;
        case 2:
            day = 'di';
            break;
        case 3:
            day = 'wo';
            break;
        case 4:
            day = 'do';
            break;
        case 5:
            day = 'vr';
            break;
        case 6:
            day = 'za';
            break;
        default:
    }
    console.log(day + ', ' + dt + ' ' + month + ' ' + year);

    return day + ', ' + dt + ' ' + month + ' ' + year;
}
const healthIssueProvider = require('../dataproviders/health-issue-provider');
const authorizationService = require('./authorization-service');
const async = require('async');

module.exports = {

    getAllHealthIssues: function (db, headers, callback) {
        async.waterfall([
            function (callback) {
                authorizationService.validateAuthtoken(db, headers, (error, result) => {
                    if(error){
                        callback(error);
                    }else{
                        callback(null);
                    }
                })
            },
            function (callback) {
                healthIssueProvider.getAllHealthIssues(db, (error, result) => {
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

    }
}
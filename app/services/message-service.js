const messageProvider = require('../dataproviders/message-provider');
const authorizationService = require('./authorization-service');
const ObjectId = require('mongodb').ObjectID;
const async = require('async');
const sendmail = require('sendmail')({
    logger: {
        debug: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error
    },
    silent: false
});


module.exports = {
    postMessage: function (db, message, headers, callback) {
        async.waterfall([
            function (callback) {
                authorizationService.validateAuthtokenAndGetUserConsultant(db, headers, (error, user) => {
                    if(error){
                        callback(error);
                    }else{
                        callback(null, user);
                    }
                })
            },
            function (user, callback) {
                sendmail({
                    from: user.emailAddress,
                    to: user.consultant[0].emailAddress,
                    subject: message.subject,
                    text: message.message,
                }, function(err, reply) {
                    console.log(err && err.stack);
                    if(reply){
                        console.dir(reply);
                        callback(null, 'Bericht succesvol verzonden!');
                    }else{
                        callback('Error');
                    }
                });
            }
        ], function (error, result) {
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        });
    }
};
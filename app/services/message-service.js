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
                });
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
                        callback(null, user);
                    }else{
                        callback('Bericht versturen mislukt.');
                    }
                });
            },
            function (user, callback) {

                message.userId = user._id;
                message.consultantId = user.consultant[0]._id;
                let date = new Date();
                date.setDate(date.getDate());
                message.dateTime = date.toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -3);

                callback(null, message);

            },
            function (message, callback) {
                messageProvider.postMessage(db, message, (error, message) => {
                    if(error){
                        callback(error);
                    }else{
                        callback(null, message);
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
    },

    getMessages: function (db, headers, callback) {
        async.waterfall([
            function (callback) {
                authorizationService.validateAuthtokenAndGetUserConsultant(db, headers, (error, user) => {
                    if(error){
                        callback(error);
                    }else{
                        callback(null, user);
                    }
                });
            },
            function (user, callback) {
                messageProvider.getMessages(db, user, (error, messages) => {
                    if(error){
                        callback(error);
                    }else{
                        callback(null, messages);
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
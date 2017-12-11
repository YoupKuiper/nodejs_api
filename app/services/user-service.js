const userProvider = require('../dataproviders/user-provider');
const authorizationService = require('./authorization-service');
const async = require('async');
const passwordHash = require('password-hash');
const sendmail = require('sendmail')({
    logger: {
        debug: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error
    },
    silent: false
});
const randtoken = require('rand-token');

module.exports = {
    postUser: function (db, user, callback) {
        async.waterfall([
            function (callback) {
            //Generate a registration token for the user to register with
            const token = randtoken.generate(16);

            sendmail({
                    from: 'info@zorgvoorhethart.nl',
                    to: user.emailAddress,
                    subject: 'Bedankt voor uw registratie',
                    html: 'Beste ' + user.firstname + ", bedankt voor uw registratie. Klik op de volgende link om uw account te activeren: " + token,
                }, function(err, reply) {
                    console.log(err && err.stack);
                    if(reply){
                        console.dir(reply);
                        callback(null, token);
                    }
                });
            },
            function (token, callback) {
                if(user){
                    //Set activated to false, generate a password hash and the activation token
                    user.isActivated = false;
                    user.password = passwordHash.generate(user.password);
                    user.activationToken = token;
                }
                userProvider.postUser(db, user, (error, user) => {
                    if(error){
                        callback(error)
                    }else{
                        callback(null, user);
                    }
                })
            }
        ], function (error, user) {
            if(error){
                callback(error)
            }else{
                callback(null, user)
            }
        })
    },
    
    activateUser: function (db, token, callback) {
        userProvider.activateUser(db, token, (error, result) =>{
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        })
    },

    updateUser: function (db, measurements, headers, callback) {
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
                userProvider.updateUser(db, user._id, measurements, (error, result) => {
                    if(error){
                        callback(error);
                    }else{
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
    
    loginUser: function (db, credentials, callback) {
        async.waterfall([
            function (callback) {
                if(isEmpty(credentials.emailAddress) || isEmpty(credentials.password)){
                    callback("Email address or password missing");
                }else{
                    callback(null)
                }
            },
            function (callback) {
                userProvider.getUserByEmailAddress(db, credentials, (error, user) => {
                    if(error){
                        callback(error);
                    }else{
                        if(user){
                            callback(null,user);
                        }else{
                            callback("User not found");
                        }
                    }
                })
            }, function (user, callback) {
                if(user.isActivated){
                    user.authToken = randtoken.generate(16);
                    callback(null, user);
                }else{
                    callback("User hasn't been activated yet. Please activate the account first by clicking the link in the email that has been sent to your email address.");
                }
            }, function (user, callback) {
                if(passwordHash.verify(credentials.password, user.password)){
                    callback(null, user);
                }else{
                    callback("Wrong password");
                }
            },
            function (user, callback) {
                userProvider.loginUser(db, user, (error, user) => {
                    if(error){
                        callback(error);
                    }else{
                        callback(null, user);
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
};

function isEmpty(str) {
    return(!str || 0 === str.length);
}
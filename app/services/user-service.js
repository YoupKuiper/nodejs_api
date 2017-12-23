const userProvider = require('../dataproviders/user-provider');
const authorizationService = require('./authorization-service');
const nodemailer = require('nodemailer');
const ObjectId = require('mongodb').ObjectID;
const async = require('async');
const passwordHash = require('password-hash');
const randtoken = require('rand-token');

module.exports = {
    postUser: function (db, user, callback) {
        async.waterfall([
            function (callback) {
            //Generate a registration token for the user to register with
            const token = randtoken.generate(16);

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: process.env.EMAIL_ADDRESS, // sender address
                to: user.emailAddress, // list of receivers
                subject: 'Uw registratie bij zorg voor het hart applicatie', // Subject line
                text: 'Ga naar deze URL om uw account te activeren: zvh-api.herokuapp://.com/Users?token=' + token // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        callback("Email versturen mislukt")
                    }else {
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                    callback(null, token);
                }
            });

            },
            function (token, callback) {
                if(user){
                    //Set activated to false, generate a password hash and the activation token
                    user.consultantId = ObjectId(user.consultantId);
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
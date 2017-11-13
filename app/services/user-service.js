const userProvider = require('../dataproviders/user-provider');
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

module.exports = {
    postUser: function (db, user, callback) {
        async.waterfall([
            function (callback) {
            sendmail({
                    from: 'info@zorgvoorhethart.nl',
                    to: user.emailAddress,
                    subject: 'Bedankt voor uw registratie',
                    html: 'Beste ' + user.firstname + ", bedankt voor uw registratie. Klik op de volgende link om uw account te activeren: ",
                }, function(err, reply) {
                    console.log(err && err.stack);
                    if(reply){
                        console.dir(reply);
                        callback(null);
                    }
                });
            },
            function (callback) {
                if(user){
                    user.isActivated = false;
                    user.password = passwordHash.generate(user.password);
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
    }
}
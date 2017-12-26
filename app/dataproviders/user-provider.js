module.exports = {

    postUser: function (db, user, callback) {
        db.collection('users').insert(user, (error, user)=> {
            if(error){
                callback(error);
            }else{
                callback(null, user.ops[0]);
            }
        })
    },
    
    activateUser: function (db, token, callback) {
        db.collection('users').findOneAndUpdate({"activationToken": token}, {$set: {"isActivated":true}}, {returnOriginal:false}, (error, result) => {
            if(error){
                callback(error);
            }else{
                if(result.value){
                    callback(null,
                        '<head>\n' +
                        '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n' +
                        '    <meta name="viewport" content="width=device-width,minimum-scale=1.0, maximum-scale=1.0" />\n' +
                        '    <title>Site Name</title>\n' +
                        '    <style>@media screen and (max-device-width:480px){body{-webkit-text-size-adjust:none}}</style>\n' +
                        ' \n' +
                        '    <!-- implement javascript on web page that first first tries to open the deep link\n' +
                        '        1. if user has app installed, then they would be redirected to open the app to specified screen\n' +
                        '        2. if user doesn\'t have app installed, then their browser wouldn\'t recognize the URL scheme\n' +
                        '        and app wouldn\'t open since it\'s not installed. In 1 second (1000 milliseconds) user is redirected\n' +
                        '        to download app from app store.\n' +
                        '     -->\n' +
                        '    <script>\n' +
                        '    window.onload = function() {\n' +
                        '    <!-- Deep link URL for existing users with app already installed on their device -->\n' +
                        '        window.location = "zvh-app://login";\n' +
                        '    }\n' +
                        '    </script>\n' +
                        '</head>\n' +
                        '<body>\n' +
                        '<p>Uw account is geactiveerd, u kunt nu naar de app gaan om in te loggen.</p>\n' +
                        '</body>'

                    )
                }else{
                    callback('Gebruiker niet gevonden')
                }
            }
        })
    },
    
    updateUser: function (db, userId, measurements, callback) {
        db.collection('users').findOneAndUpdate({"_id": userId}, {$set: {"length": measurements.length, "weight": measurements.weight}}, {upsert: true}, (error, result) => {
            if(error){
                callback(error);
            }else{
                callback(null, result);
            }
        })
    },

    getUserByEmailAddress: function (db, credentials, callback) {
        db.collection('users').findOne({"emailAddress": credentials.emailAddress}, (error, user) => {
            if(error){
                callback(error);
            }else{
                callback(null, user);
            }
        })
    },

    loginUser: function (db, user, callback) {
        db.collection('users').findOneAndUpdate({"_id": user._id}, {$set: {authToken: user.authToken}},{returnOriginal:false}, (error, result) => {
            if(error){
                callback(error);
            }else{
                callback(null, result.value);
            }
        })
    },
    
    getUserConsultantByAuthToken: function (db, authtoken, callback) {
        db.collection('users').aggregate([
            { $match: {"authToken": authtoken} },
            { $lookup: {
                from: 'consultants',
                localField: 'consultantId',
                foreignField: '_id',
                as: 'consultant'
            }},
            { $limit: 1 }
        ], (error, user) => {
            if(error){
                callback(error);
            }else{
                if(user[0]){
                    if(user[0].consultant[0]){
                        callback(null, user[0]);
                    }else{
                        callback('Consultant not found');
                    }
                }else{
                    callback("Unauthorized");
                }
            }
        })
    },

    putUserResetPasswordToken: function (db, emailAddress, resetPasswordToken, callback) {
        db.collection('users').findOneAndUpdate({"emailAddress": emailAddress}, {$set: {"resetPasswordToken": resetPasswordToken}}, {returnOriginal: false}, (error, user) => {
            if(error){
                callback(error);
            }else{
                if(user.value){
                    callback(null, user.value);
                }else{
                    callback("No user found with this email address");
                }
            }
        })
    }
};

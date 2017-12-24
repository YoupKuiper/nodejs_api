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
                    callback(null, 'Uw account is succesvol geactiveerd, u kunt nu inloggen in de applicatie')
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

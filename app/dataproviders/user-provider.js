module.exports = {

    postUser: function (db, user, callback) {
        db.collection('users').insert(user, (error, user)=> {
            if(error){
                callback(error);
            }else{
                callback(user.ops[0]);
            }
        })
    },
    
    activateUser: function (db, token, callback) {
        db.collection('users').findOneAndUpdate({"activationToken": token}, {$set: {isActivated:true}}, null, (error, result) => {
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
        db.collection('users').findOneAndUpdate({"_id": user._id}, {$set: {authToken: user.authToken}}, null, (error, result) => {
            if(error){
                callback(error);
            }else{
                callback(null, result.value);
            }
        })
    }
};

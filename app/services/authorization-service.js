const userProvider = require('../dataproviders/user-provider');

module.exports = {
    validateAuthtoken: function (db, headers, callback) {
        if(headers["x-authtoken"]){
            userProvider.getUserByAuthToken(db, headers["x-authtoken"], (error, user) => {
                if(error){
                    callback(error);
                }else{
                    callback(null, user)
                }
            })
        }else{
            callback("Authtoken required!");
        }
    }
}
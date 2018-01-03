module.exports = {

    postMessage: function (db, message, callback) {
        db.collection('messages').insertOne(message, (error, message) => {
            if(error){
                callback(error);
            }else{
                callback(null, 'Bericht verzonden');
            }
        })
    },

    getMessages: function (db, user, callback) {
        db.collection('messages').find({"userId": user._id}).toArray((error, results) => {
            if(error){
                callback(error);
            }else{
                callback(null, results);
            }
        });
    }

};

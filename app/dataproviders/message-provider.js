module.exports = {

    postMessage: function (db, message, callback) {
        db.collection('messages').insertOne(message, (error, message) => {
            if(error){
                callback(error);
            }else{
                callback(null, 'Bericht verzonden');
            }
        })
    }
};

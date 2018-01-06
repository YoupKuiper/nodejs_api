module.exports = {

    getAllFaq: function (db, callback) {
        db.collection('faq').find().toArray((error, faq) => {
            if(error){
                callback(error);
            }else{
                callback(null, faq);
            }
        })
    }
};

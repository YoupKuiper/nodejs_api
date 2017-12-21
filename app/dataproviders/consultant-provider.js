module.exports = {

    getAllConsultants: function (db, callback) {
        db.collection('consultants').find().toArray((error, consultants) => {
            if(error){
                callback(error);
            }else{
                callback(null, consultants);
            }
        })
    }
};

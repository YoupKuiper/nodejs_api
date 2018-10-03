module.exports = {

    getAllConsultants: function (db, callback) {
        console.log(db)
        db.collection('consultants').find().sort({"firstname": 1}).toArray((error, consultants) => {
            if (error) {
                callback(error);
            } else {
                callback(null, consultants);
            }
        })
    }
};

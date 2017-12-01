module.exports = {

    getAllHealthIssues: function (db, callback) {
        db.collection('healthissues').find().toArray((error, healthIssues) => {
            if(error){
                callback(error);
            }else{
                callback(healthIssues);
            }
        })
    }
};

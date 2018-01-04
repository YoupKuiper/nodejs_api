module.exports = {

    getAllHealthIssues: function (db, callback) {
        db.collection('healthissues').find().sort({"name": 1}).toArray((error, healthIssues) => {
            if(error){
                callback(error);
            }else{
                callback(null, healthIssues);
            }
        })
    }
};

module.exports = {

    postUser: function (db, user, callback) {
        db.collection('users').insert(user, (error, user)=> {
            if(error){
                callback(error);
            }else{
                callback(user.ops[0]);
            }
        })
    }
};

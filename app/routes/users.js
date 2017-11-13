const userService = require('../services/user-service')

module.exports = function (app, db) {

    app.post('/Users/register', (req, res) => {
        userService.postUser(db, req.body, (error, user) => {
            if(error){
                res.send(error)
            }else{
                res.send(user);
            }
        })
    })
};
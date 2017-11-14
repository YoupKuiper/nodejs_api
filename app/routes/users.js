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
    });

    app.put('/Users/activate', (req, res) => {
        userService.activateUser(db, req.query.token, (error, user) => {
            if(error){
                res.send(error);
            }else{
                res.send(user);
            }
        })
    });

    app.post('/Users/login', (req,res) => {
        userService.loginUser(db, req.body, (error, user) => {
            if(error){
                res.send(error);
            }else{
                res.send(user);
            }
        })
    })
};
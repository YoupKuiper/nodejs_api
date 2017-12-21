const userService = require('../services/user-service')

module.exports = function (app, db) {

    app.post('/Users/register', (req, res) => {

        userService.postUser(db, req.body, (error, user) => {
            if(error){
                res.status(400);
                res.send({error})
            }else{
                res.send(user);
            }
        })
    });

    app.get('/Users/activate', (req, res) => {
        if(!req.query.token){
            res.status(400);
            res.send({"error":"No token supplied!"})
        }else{
        userService.activateUser(db, req.query.token, (error, user) => {
            if(error){
                res.status(400);
                res.send({error});
            }else{
                res.send(user);
            }
        })
    }
    });

    app.post('/Users/login', (req,res) => {
        userService.loginUser(db, req.body, (error, user) => {
            if(error){
                res.status(400);
                res.send({error});
            }else{
                res.send(user);
            }
        })
    })

    app.put('/Users', (req, res) => {
        userService.updateUser(db, req.body, req.headers, (error, user) => {
            if(error){
                res.status(400);
                res.send({error});
            }else{
                res.send(user);
            }
        })
    })

    app.post('/Users/forgotPassword', (req, res) => {
        userService.sendForgotPasswordEmail(db, req.query.emailAddress, (error, result) => {
            if(error){
                res.status(400);
                res.send({error});
            }else{
                res.send(result);
            }
        })
    })
};
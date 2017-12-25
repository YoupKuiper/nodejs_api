const messageService = require('../services/message-service');

module.exports = function (app, db) {
    app.post('/Messages', (req, res) => {
        messageService.postMessage(db, req.body, req.headers, (error, result) => {
            if(error){
                res.status(400);
                res.send({error});
            }else{
                res.send(result);
            }
        })
    });
};
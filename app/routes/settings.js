const settingsService = require('../services/settings-service');

module.exports = function (app, db) {
    app.put('/Settings', (req, res) =>{

        settingsService.putSetting(db, req.body, req.query.userId, (error, settings) => {
            if(error){
                res.status(400);
                res.send({error});
            }else{
                res.send(settings);
            }
        })
    });

    app.get('/Settings', (req, res) => {
        settingsService.getSettings(db, req.query.userId, (error, settings) => {
            if(error){
                res.status(400);
                res.send({error});
            }else{
                res.send(settings);
            }
        })
    })
};
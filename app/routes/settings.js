const settingsService = require('../services/settings-service');

module.exports = function (app, db) {
    app.put('/Settings', (req, res) =>{
        settingsService.putSetting(db, req.body, req.query.userId, (error, result) => {
            if(error){
                res.send(error);
            }else{
                res.send(result);
            }
        })
    })
};
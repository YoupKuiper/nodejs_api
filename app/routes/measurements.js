const measurementService = require('../services/measurement-service');

module.exports = function (app, db) {

    app.post('/Measurements', (req, res) => {
        measurementService.postMeasurement(db, req.body, req.query.userId,  (error, result) => {
            if(error){
                res.send(error);
            }else{
                res.send(result);
            }
        })
    });

    app.get('/Measurements', (req, res) => {
        measurementService.getMeasurements(db, req.query.userId, (error, result) => {
            if(error){
                res.send(error);
            }else{
                res.send(result);
            }
        })
    });
};
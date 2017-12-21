const measurementService = require('../services/measurement-service');

module.exports = function (app, db) {

    app.post('/Measurements', (req, res) => {
        measurementService.postMeasurement(db, req.body, req.headers, (error, result) => {
            if(error){
                res.status(400);
                res.send(error);
            }else{
                res.send(result);
            }
        })
    });

    app.get('/Measurements', (req, res) => {
        measurementService.getMeasurements(db, req.headers, (error, result) => {
            if(error){
                res.status(400);
                res.send(error);
            }else{
                res.send(result);
            }
        })
    });
};
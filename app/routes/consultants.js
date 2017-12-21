const consultantService = require('../services/consultant-service');

module.exports = function(app, db){

    app.get('/Consultants', (req, res) => {
        consultantService.getAllConsultants(db, (error, consultants) => {
            if(error){
                res.status(400);
                res.send(error);
            }else{
                res.send(consultants)
            }
        });
    });

}
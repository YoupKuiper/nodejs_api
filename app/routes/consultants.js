const consultantService = require('../services/consultant-service');

module.exports = function(app, db){

    app.get('/Consultants', (req, res) => {
        consultantService.getAllConsultants(db, (error, consultants) => {
            if(error){
                res.send(error);
            }else{
                res.send(consultants)
            }
        });
    });

}
const consultantService = require('../services/consultant-service');

module.exports = function(app, db){

    app.get('/consultants', (req, res) => {
        consultantService.getAllConsultants(db, (error, consultants) => {
            if(error){
                res.send(error);
            }else{
                res.send(consultants)
            }
        });
    });

    app.post('/consultants', (req, res) => {
        const consultant = { firstname: req.body.firstname, lastname: req.body.lastname, emailAddress: req.body.emailAddress};

    db.collection('consultants').insert(consultant, (err, result) => {
        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            res.send(result.ops[0]);
}
});
    })

}
const consultantService = require('../services/consultant-service');

module.exports = function(app, db){

    app.get('/consultants', (req, res) => {
        db.collection('consultants').find().toArray(function (mongoError, results) {
            if(mongoError){
                res.send(mongoError);
            }else{
                res.send(results);
            }
        })
    });

    app.post('/consultants', (req, res) => {
        console.log("asd");
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
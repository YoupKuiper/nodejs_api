const faqService = require('../services/faq-service');

module.exports = function(app, db){

    app.get('/faq', (req, res) => {
        faqService.getAllFaq(db, (error, faq) => {
            if(error){
                res.status(400);
                res.send({error});
            }else{
                res.send(faq)
            }
        });
    });

}
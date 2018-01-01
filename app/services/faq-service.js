const faqProvider = require('../dataproviders/faq-provider');

module.exports = {

    getAllFaq: function (db, callback) {
        faqProvider.getAllFaq(db, (error, faq) => {
            if(error){
                callback(error);
            }else{
                callback(null, faq);
            }
        })
    }
};

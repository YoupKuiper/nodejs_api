const consultantProvider = require('../dataproviders/consultant-provider');

module.exports = {

   getAllConsultants: function (db, callback) {
        consultantProvider.getAllConsultants(db, (error, consultants) => {
            if(error){
                callback(error);
            }else{
                callback(null, consultants);
            }
        })
    }
};

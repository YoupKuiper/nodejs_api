const healthIssueService = require('../services/health-issue-service');

module.exports = function (app, db) {

    app.get('/healthissues', (req, res) => {
        healthIssueService.getAllHealthIssues(db, (error, healthIssues) => {
            if(error){
                res.send(error);
            }else{
                res.send(healthIssues)
            }
        });
    });
};
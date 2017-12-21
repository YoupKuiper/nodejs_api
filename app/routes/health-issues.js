const healthIssueService = require('../services/health-issue-service');

module.exports = function (app, db) {

    app.get('/healthissues', (req, res) => {
        healthIssueService.getAllHealthIssues(db, req.headers, (error, healthIssues) => {
            if(error){
                res.status(400);
                res.send(error);
            }else{
                res.send(healthIssues)
            }
        });
    });
};
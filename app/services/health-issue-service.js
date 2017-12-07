const healthIssueProvider = require('../dataproviders/health-issue-provider');

module.exports = {

    getAllHealthIssues: function (db, callback) {
        healthIssueProvider.getAllHealthIssues(db, (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null, result);
            }
        })
    }
}
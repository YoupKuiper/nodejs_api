const consultantRoutes = require('./consultants');
const healthIssueRoutes = require('./health-issues');
const measurementRoutes = require('./measurements');
const messageRoutes = require('./messages');
const settingsRoutes = require('./settings');
const userRoutes = require('./users');


module.exports = function(app, db) {

    consultantRoutes(app, db);
    healthIssueRoutes(app, db);
    measurementRoutes(app, db);
    messageRoutes(app, db);
    settingsRoutes(app, db);
    userRoutes(app, db);

};
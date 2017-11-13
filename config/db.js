const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

module.exports = {
    url : "mongodb://" + dbUser + ":" + dbPassword + "@ds151024.mlab.com:51024/zorgvoorjehart"
};
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');

const port = process.env.PORT || 8000;

var options = {
    inflate: true,
    limit: '100kb',
    strict: false,
    type: '*/*'
};

app.use(bodyParser.json(options));

MongoClient.connect(db.url, (err, database) => {
    if(err) return console.log(err);

    require('./app/routes')(app, database);

    app.listen(port, () => {
        console.log("We are live on port: " + port);
    })
});
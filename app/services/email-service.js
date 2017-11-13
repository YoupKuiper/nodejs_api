const sendmail = require('sendmail')();
module.exports = sendmail;
sendmail({
    from: 'info@zorgvoorhethart.nl',
    to: 'youpkuiper@gmail.com ',
    subject: 'bedankt voor uw registratie',
    html: 'Mail of test sendmail ',
}, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
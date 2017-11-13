module.exports = function (app, db) {

    app.post('/users', (req, res) => {
        const user = { firstname: req.body.firstname, lastname: req.body.lastname, emailAddress: req.body.emailAddress}
        db.collection('users').insert(user, (error, result) => {
            if (error) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ok);
            }
        })
    })
}
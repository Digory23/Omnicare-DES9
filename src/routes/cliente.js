module.exports = (app, passport) => {


//login select view
app.get('/Login-Cliente', (req, res) => {
    res.type('text/html');
    res.render('paciente-doctor/login', {
        message: req.flash('loginMessage')
    });
});


app.post('/Login-Cliente', passport.authenticate('cliente-login', {

    successRedirect: '/',
    failureRedirect: '/Login-Cliente',
    failureFlash: true // allow flash messages
}));


}





function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/Login');
}
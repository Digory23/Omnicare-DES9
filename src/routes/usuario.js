module.exports = (app, passport) => {


    //login
    app.get('/Login', (req, res) => {
        res.type('text/html');
        res.render('paciente-doctor/login', {
            message: req.flash('loginMessage')
        });
    });

    //ruta donde validaremos el usuario para logearnos (paciente-login es el tipo de autenticacion que creamos en passport)
    app.post('/Login', passport.authenticate('user-login', {

        successRedirect: '/',
        failureRedirect: '/Login',
        failureFlash: true // allow flash messages
    }));


    // signup view
    app.get('/Registro', (req, res) => {
        res.type('text/html');
        res.render('paciente-doctor/register', {
            message: req.flash('signupMessage')
        });
    });


    //ruta donde creamos un nuevo usuario (paciente-signup lo creamos en passport)
    app.post('/Registro', passport.authenticate('user-signup', {
        successRedirect: '/',
        failureRedirect: '/Registro',
        failureFlash: true // allow flash messages
    }));


    //profile view
    app.get('/Perfil', isLoggedIn, IsPaciente, (req, res) => {
        res.render('index-paciente-doctor', {
            user: req.user
        });
    });

    // logout
    app.get('/Logout', (req, res) => {
        req.logout();
        res.redirect('/Login');
    });

};


function IsPaciente(req, res, next) {
    if (req.user.acceso) {
        return next();
    }
    res.redirect('/');
}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/Login');
}
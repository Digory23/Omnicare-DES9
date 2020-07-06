module.exports = (app, passport) => {


    //login view
    app.get('/Login', (req, res) => {
        res.type('text/html');
        res.render('paciente-doctor/login', {
            message: req.flash('loginMessage')
        });
    });


    //ruta donde 
    app.post('/Login', passport.authenticate('paciente-login', {
        successRedirect: '/Perfil-Paciente',
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


    //ruta donde creamos un nuevo usuario
    app.post('/Registro', passport.authenticate('paciente-signup', {
        successRedirect: '/Perfil-Paciente',
        failureRedirect: '/Registro',
        failureFlash: true // allow flash messages
    }));


    //profile view
    app.get('/Perfil-Paciente', isLoggedIn, (req, res) => {
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/Login');
}
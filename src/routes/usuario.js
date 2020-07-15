module.exports = (app, passport) => {

    const Referencia = require('../models/referencia');
    const User = require('../models/user');
    //login
    app.get('/Login', (req, res) => {
        res.type('text/html');
        res.render('paciente-doctor/login', {
            message: req.flash('loginMessage')
        });
    });

    //ruta de solicitud de numero de referencia para acceder a la clinica
    app.get('/Verificacion', isLoggedIn,(req, res) => {
        res.type('text/html');
        res.render('paciente-doctor/num-referencia');
    });

    app.post('/Verificacion', async (req, res) => {
        
        /*const reference = await Referencia.find(
           {numero: req.body.numero}
        )
        console.log(reference);
        if(reference.length == 1){
            res.redirect('/Datos-Paciente');
        }*/
        res.redirect('/Datos-Paciente');
        
    });

    //ruta de solicitud de datos del paciente para mostrar en dashboard
    app.get('/Datos-Paciente', (req, res) => {
        res.type('text/html');
        res.render('paciente-doctor/datos-paciente');
    });

    //aqui se supone que deberia funcionanr esta MIERDA
    app.post('/Datos-Paciente', async (req, res, next) => {
        
    await User.update({email_user: req.user.email_user},
        {
            $set:
            {
                tipo_sangre: req.body.tipo_sangre,

            }
        })

        
        
        res.redirect('/');
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
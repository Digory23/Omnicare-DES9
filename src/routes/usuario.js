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

    app.post('/Verificacion', isLoggedIn, async (req, res) => {
        
        res.redirect('/Datos-Paciente');
        
    });

    //ruta de solicitud de datos del paciente para mostrar en dashboard
    app.get('/Datos-Paciente',isLoggedIn, (req, res) => {
        res.type('text/html');
        res.render('paciente-doctor/datos-paciente');
    });


       //esta ruta inserta los datos del paciente
        app.post('/Datos-Paciente', async (req, res, next) => {
        const email = req.user.email_user;
        const tipo_san =  req.body.tipo_sangre;
        const ced = req.body.cedula;
        const dir = req.body.direccion;
        const tel = req.body.telefono;
        const sex = req.body.sexo;
        const img = "user.png";
        console.log(email)
        await User.update({email_user: email},
            {
                $set:
                { 
                    acceso: true,
                    tipo_user: 1,
                    tipo_sangre: tipo_san,
                    cedula: ced,
                    direccion: dir,
                    telefono: tel,
                    sexo: sex,
                    img_user: img
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


    // vista de registro
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


    app.get('/Recuperar-Contrasena', (req, res) => {
        res.type('text/html');
        res.render('paciente-doctor/forgot-password', {
            message: req.flash('signupMessage')
        });
    });
    
    

    // logout
    app.get('/Logout', (req, res) => {
        req.logout();
        res.redirect('/');
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
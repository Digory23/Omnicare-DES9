const rateLimit = require('express-rate-limit');

const usuario = require('../controllers/usuarioController');
const { isLoggedIn } = require('../middlewares/auth');
const validators = require('../middlewares/validators');

// limita intentos de login/registro por IP para dificultar fuerza bruta
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Demasiados intentos, intenta de nuevo más tarde.'
});

module.exports = (app, passport) => {

    // Login
    app.get('/Login', usuario.getLogin);
    app.post('/Login',
        authLimiter,
        validators.login,
        validators.handleValidation('/Login', 'loginMessage'),
        passport.authenticate('user-login', {
            successRedirect: '/',
            failureRedirect: '/Login',
            failureFlash: true
        })
    );

    // Verificación de paciente
    app.get('/Verificacion', isLoggedIn, usuario.getVerificacion);
    app.post('/Verificacion', isLoggedIn, usuario.postVerificacion);

    // Datos del paciente
    app.get('/Datos-Paciente', isLoggedIn, usuario.getDatosPaciente);
    app.post('/Datos-Paciente',
        isLoggedIn,
        validators.datosPaciente,
        validators.handleValidation('/Datos-Paciente'),
        usuario.postDatosPaciente
    );

    // Registro
    app.get('/Registro', usuario.getRegistro);
    app.post('/Registro',
        authLimiter,
        validators.registro,
        validators.handleValidation('/Registro', 'signupMessage'),
        passport.authenticate('user-signup', {
            successRedirect: '/',
            failureRedirect: '/Registro',
            failureFlash: true
        })
    );

    // Recuperación de contraseña
    app.get('/Recuperar-Contrasena', usuario.getRecuperar);

    // Logout
    app.get('/Logout', usuario.logout);
};

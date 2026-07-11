const User = require('../models/user');

// Vista de login
exports.getLogin = (req, res) => {
    res.type('text/html');
    res.render('paciente-doctor/login', {
        message: req.flash('loginMessage')
    });
};

// Vista de solicitud de número de referencia
exports.getVerificacion = (req, res) => {
    res.type('text/html');
    res.render('paciente-doctor/num-referencia');
};

// Continúa el flujo de verificación hacia los datos del paciente
exports.postVerificacion = (req, res) => {
    res.redirect('/Datos-Paciente');
};

// Vista del formulario de datos del paciente
exports.getDatosPaciente = (req, res) => {
    res.type('text/html');
    res.render('paciente-doctor/datos-paciente');
};

// Inserta/actualiza los datos del paciente y marca su acceso
exports.postDatosPaciente = async (req, res, next) => {
    try {
        await User.updateOne(
            { email_user: req.user.email_user },
            {
                $set: {
                    acceso: true,
                    tipo_user: 1,
                    tipo_sangre: req.body.tipo_sangre,
                    cedula: req.body.cedula,
                    direccion: req.body.direccion,
                    telefono: req.body.telefono,
                    sexo: req.body.sexo,
                    img_user: 'user.png'
                }
            }
        );
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};

// Vista de registro
exports.getRegistro = (req, res) => {
    res.type('text/html');
    res.render('paciente-doctor/register', {
        message: req.flash('signupMessage')
    });
};

// Vista de recuperación de contraseña
exports.getRecuperar = (req, res) => {
    res.type('text/html');
    res.render('paciente-doctor/forgot-password', {
        message: req.flash('signupMessage')
    });
};

// Cierre de sesión (passport 0.6+ exige callback)
exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};

const Solicitud = require('../models/solicitud_cita');
const User = require('../models/user');
const Cita = require('../models/cita');

// Middleware: redirige al perfil correcto según el tipo de usuario.
exports.redirectPorTipo = (req, res) => {
    if (req.user.tipo_user == '1') {
        return res.redirect('/Perfil-Paciente');
    }
    res.redirect('/Perfil-Doctor');
};

// Dashboard del paciente
exports.perfilPaciente = async (req, res, next) => {
    try {
        const [doctores, citas] = await Promise.all([
            User.find({ tipo_user: '2' }),
            Cita.find({ email_pac: req.user.email_user })
        ]);
        res.render('index-paciente-doctor', {
            user: req.user,
            tipo_usuario: '1',
            doctores,
            citas
        });
    } catch (err) {
        next(err);
    }
};

// Dashboard del doctor
exports.perfilDoctor = async (req, res, next) => {
    try {
        const [solicitud, citas] = await Promise.all([
            Solicitud.find({ doctor: req.user.nombre_user }),
            Cita.find({ doctor: req.user.email_user })
        ]);
        res.render('index-paciente-doctor', {
            solicitud,
            citas,
            user: req.user,
            tipo_usuario: '2'
        });
    } catch (err) {
        next(err);
    }
};

// Inserta una solicitud de cita hecha por el paciente
exports.solicitud = async (req, res, next) => {
    try {
        const cita = new Solicitud(req.body);
        cita.ced_paciente = req.user.cedula;
        cita.paciente = req.user.nombre_user + ' ' + req.user.apellido_user;
        await cita.save();
        res.redirect('/Perfil-Paciente');
    } catch (err) {
        next(err);
    }
};

// Vista de agendar cita (doctor) a partir de una solicitud
exports.getAgendarCita = async (req, res, next) => {
    try {
        res.type('text/html');
        const solicitudcita = await Solicitud.findById(req.params.id);
        const pac = await User.findOne({ cedula: solicitudcita.ced_paciente });
        res.render('index-paciente-doctor', {
            tipo_usuario: '3',
            user: req.user,
            solicitudcita,
            pac
        });
    } catch (err) {
        next(err);
    }
};

// Agenda la cita (doctor)
exports.postAgendarCita = async (req, res, next) => {
    try {
        const cita = new Cita(req.body);
        cita.doctor = req.user.email_user;
        cita.nombre_doctor = req.user.nombre_user;
        await cita.save();
        res.redirect('/Perfil-Doctor');
    } catch (err) {
        next(err);
    }
};

// Citas pendientes del doctor
exports.citasPendientes = (req, res) => {
    res.type('text/html');
    res.render('index-paciente-doctor', {
        tipo_usuario: '4',
        user: req.user
    });
};

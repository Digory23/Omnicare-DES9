const clinica = require('../controllers/clinicaController');
const { isLoggedIn, isPaciente } = require('../middlewares/auth');
const validators = require('../middlewares/validators');

module.exports = (app) => {

    // Redirige al perfil correcto según el tipo de usuario
    app.get('/Perfil-Validate', isLoggedIn, isPaciente, clinica.redirectPorTipo);

    // Dashboards
    app.get('/Perfil-Paciente', isLoggedIn, clinica.perfilPaciente);
    app.get('/Perfil-Doctor', isLoggedIn, clinica.perfilDoctor);

    // Solicitud de cita (paciente)
    app.post('/Solicitud',
        isLoggedIn,
        validators.solicitud,
        validators.handleValidation('/Perfil-Paciente'),
        clinica.solicitud
    );

    // Agendar cita (doctor)
    app.get('/AgendarCita/:id', isLoggedIn, clinica.getAgendarCita);
    app.post('/AgendarCita',
        isLoggedIn,
        validators.agendarCita,
        validators.handleValidation('/Perfil-Doctor'),
        clinica.postAgendarCita
    );

    // Citas pendientes (doctor)
    app.get('/CitasPendientes', isLoggedIn, clinica.citasPendientes);
};

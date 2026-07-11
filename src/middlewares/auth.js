// Middleware de autenticación/autorización compartido.
// Antes existían tres copias duplicadas de estas funciones en cada archivo de rutas.

// Verifica que exista una sesión activa. Si no, envía al login.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/Login');
}

// Verifica que el paciente ya completó su verificación/datos (campo acceso).
// Si no, lo envía a la pantalla de verificación.
function isPaciente(req, res, next) {
    if (req.user && req.user.acceso) {
        return next();
    }
    res.redirect('/Verificacion');
}

module.exports = { isLoggedIn, isPaciente };

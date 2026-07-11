// Validación de entrada con express-validator.
// Antes, todos los req.body.* se pasaban directo a Mongoose sin validar ni sanear.
const { body, validationResult } = require('express-validator');

// Factory: devuelve un middleware que corta la petición si hay errores de validación,
// guarda el primer mensaje en flash y redirige de vuelta al formulario indicado.
function handleValidation(redirectTo, flashKey = 'errorMessage') {
    return (req, res, next) => {
        const errores = validationResult(req);
        if (errores.isEmpty()) {
            return next();
        }
        req.flash(flashKey, errores.array()[0].msg);
        return res.redirect(redirectTo);
    };
}

// --- Cadenas de validación por formulario ---

const registro = [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').trim().notEmpty().withMessage('El apellido es obligatorio'),
    body('email').trim().isEmail().withMessage('Email inválido').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

const login = [
    body('email').trim().notEmpty().withMessage('El email es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
];

const datosPaciente = [
    body('tipo_sangre').trim().notEmpty().withMessage('El tipo de sangre es obligatorio'),
    body('cedula').trim().notEmpty().withMessage('La cédula es obligatoria'),
    body('direccion').trim().notEmpty().withMessage('La dirección es obligatoria'),
    body('telefono').trim().notEmpty().withMessage('El teléfono es obligatorio'),
    body('sexo').trim().notEmpty().withMessage('El sexo es obligatorio')
];

const addProducto = [
    body('codigo').trim().notEmpty().withMessage('Código de producto inválido'),
    body('nombre').trim().notEmpty().withMessage('Nombre de producto inválido'),
    body('precio').isFloat({ gt: 0 }).withMessage('Precio inválido'),
    body('cantidad').isInt({ min: 1 }).withMessage('Cantidad inválida')
];

const solicitud = [
    body('doctor').trim().notEmpty().withMessage('Debes seleccionar un doctor')
];

const agendarCita = [
    body('fecha').trim().notEmpty().withMessage('La fecha es obligatoria'),
    body('hora').trim().notEmpty().withMessage('La hora es obligatoria')
];

module.exports = {
    handleValidation,
    registro,
    login,
    datosPaciente,
    addProducto,
    solicitud,
    agendarCita
};

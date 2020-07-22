const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    doctor: String,
    nombre_doctor: String,
    nombre_pac: String,
    apellido_pac: String,
    email_pac: String,
    motivo: String,
    fecha: String,
    hora: String
});


module.exports = mongoose.model('citas', citaSchema);
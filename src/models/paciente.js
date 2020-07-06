const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre_pac: String,
    apellido_pac: String,
    email_pac: String,
    pass_pac: String
});

module.exports = mongoose.model('pacientes', userSchema);
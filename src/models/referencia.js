const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   numero:String,
   paciente_email: String,
   valid: Boolean
});

module.exports = mongoose.model('numeros-referencia', userSchema);
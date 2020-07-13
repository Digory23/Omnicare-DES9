const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   doctor:String,
   paciente: String,
   razon: String
});

module.exports = mongoose.model('solicitud-citas', userSchema);
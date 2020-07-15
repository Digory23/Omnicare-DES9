const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    nombre_user: String,
    email_user: String,
    pass_user: String,
    tipo_user: String,
    acceso: Boolean,
    datos_paciente:{
        tipo_sangre: String,
        cedula: String,
        telefono: String,
        sexo: String
    },
    datos_doctor:{
      cedula: String,
      telefono: String,
      sexo: String,
      especialidad: String
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

// para verificar si la contraseña es valida
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.pass_user);
  };

  

module.exports = mongoose.model('usuarios', userSchema);
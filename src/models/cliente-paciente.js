const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    nombre_cli: String,
    email_cli: String,
    pass_cli: String,
    tipo_user: String,
    paciente: Boolean,
    datos_paciente:{
        tipo_sangre: String
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

// para verificar si la contraseña es valida
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.pass_cli);
  };

  

module.exports = mongoose.model('clientes', userSchema);
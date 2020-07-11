const mongoose = require('mongoose');

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

// para verificar si la contraseña es valida
userSchema.methods.validPassword = function (password) {
    return (password, this.pass_cli);
  };

  userSchema.methods.validCli = function(){
      
      return (this.paciente)
  }

module.exports = mongoose.model('clientes', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email_pac: String,
    pass_pac: String
});

// para verificar si la contraseña es valida
userSchema.methods.validPassword = function (password) {
    return (password, this.pass_pac);
  };

module.exports = mongoose.model('pacientes', userSchema);
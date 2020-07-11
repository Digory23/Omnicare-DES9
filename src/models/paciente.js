const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({

    email_pac: String,
    pass_pac: String
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// para verificar si la contraseña es valida
userSchema.methods.validPassword = function (password) {
    return  bcrypt.compareSync(password, this.pass_pac);
  };

module.exports = mongoose.model('pacientes', userSchema);
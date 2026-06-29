const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombre_user: String,
    apellido_user:String,
    email_user: String,
    pass_user: String,
    tipo_user: String,
    acceso: Boolean,
    tipo_sangre: String,
    cedula: String,
    direccion: String,
    telefono: String,
    sexo: String,
    img_user: String,
    especialidad: String
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

// para verificar si la contraseña es valida
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.pass_user);
  };

  

module.exports = mongoose.model('usuarios', userSchema);
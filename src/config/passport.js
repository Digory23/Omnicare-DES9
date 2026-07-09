const LocalStrategy = require('passport-local').Strategy;//Indicamos el tipo de estrategia


const User = require('../models/user');

module.exports = function (passport) {
  // requerido para sesiones
  
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // usado para deserializar al usuario
  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });



  // Signup de paciente
  passport.use('user-signup', new LocalStrategy({
    
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true 
  },
  async function (req, email, password, done) {
    try {
      const user = await User.findOne({'email_user': email});
      if (user) {
        return done(null, false, req.flash('signupMessage', 'Este email ya existe'));
      }

      var newUser = new User();

      newUser.nombre_user = req.body.nombre;
      newUser.apellido_user = req.body.apellido;
      newUser.email_user = email;
      newUser.pass_user = newUser.generateHash(password);
      newUser.acceso = false;
      newUser.tipo_user = " ";
      newUser.tipo_sangre = " ";
      newUser.cedula  = " ";
      newUser.direccion = " ";
      newUser.telefono = " ";
      newUser.sexo = " ";
      newUser.img_user = " ";
      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }));
//aqui termina el sign up de paciente


 


  // login del User
  passport.use('user-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async function (req, email, password, done) {
    try {
      const user = await User.findOne({'email_user': email});
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'Usuario o contraseña invalidos'))
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Usuario o contraseña invalidos'));
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
}




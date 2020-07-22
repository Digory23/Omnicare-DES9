const LocalStrategy = require('passport-local').Strategy;//Indicamos el tipo de estrategia


const User = require('../models/user');

module.exports = function (passport) {
  // requerido para sesiones
  
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // usado para deserializar al usuario
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });



  // Signup de paciente
  passport.use('user-signup', new LocalStrategy({
    
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true 
  },
  function (req, email, password, done) {
    User.findOne({'email_user': email}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash('signupMessage', 'Este email ya existe'));
      } else {
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
        newUser.save(function (err) {
          if (err) { throw err; }
          return done(null, newUser);
        });
      }
    });
  }));
//aqui termina el sign up de paciente


 


  // login del User
  passport.use('user-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({'email_user': email}, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'Usuario o contraseña invalidos'))
      }
    
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Usuario o contraseña invalidos'));
      }
      return done(null, user);
    });
  }));
}




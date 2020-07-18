const LocalStrategy = require('passport-local').Strategy;//Indicamos el tipo de estrategia


const User = require('../models/user');

module.exports = function (passport) {
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });



  // Signup de paciente
  passport.use('user-signup', new LocalStrategy({
    // usernameField y passwordField son palabras reservadas
    usernameField: 'email',
    passwordField: 'password',
    //nombreField: 'nombre',
    //apellidoField: 'apellido',
    passReqToCallback : true 
  },
  function (req, email, password, /*tipo_sangre, cedula, direccion, telefono, sexo, nombre, apellido,*/ done) {
    User.findOne({'email_user': email}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash('signupMessage', 'the email is already taken'));
      } else {
        var newUser = new User();
       // const { tipo_sangre, cedula, direccion, telefono, sexo } = req.body;
       // newUser.create({ tipo_sangre, cedula, direccion, telefono, sexo });
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
        return done(null, false, req.flash('loginMessage', 'No User found'))
      }
    
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong. password'));
      }
      return done(null, user);
    });
  }));
}




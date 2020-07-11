const LocalStrategy = require('passport-local').Strategy;//Indicamos el tipo de estrategia

const Paciente = require('../models/paciente');//modelo de la base de datos con el que se trabajara

module.exports = function (passport) {
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize user
  passport.deserializeUser(function (id, done) {
    Paciente.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // Signup de paciente
  passport.use('paciente-signup', new LocalStrategy({
    // usernameField y passwordField son palabras reservadas
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true 
  },
  function (req, email, password, done) {
    Paciente.findOne({'email_pac': email}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash('signupMessage', 'the email is already taken'));
      } else {
        var newPaciente = new Paciente();
        newPaciente.email_pac = email;
        newPaciente.pass_pac = newPaciente.generateHash(password);
        newPaciente.save(function (err) {
          if (err) { throw err; }
          return done(null, newPaciente);
        });
      }
    });
  }));
//aqui termina el sign up de paciente


  // login del paciente
  passport.use('paciente-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    Paciente.findOne({'email_pac': email}, function (err, user) {
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

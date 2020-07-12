const LocalStrategy = require('passport-local').Strategy;//Indicamos el tipo de estrategia

const Paciente = require('../models/paciente');//modelo de la base de datos con el que se trabajara
const Cliente = require('../models/cliente-paciente');

module.exports = function (passport) {
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize user
  passport.deserializeUser(function (id, done) {
    Cliente.findById(id, function (err, user) {
      done(err, user);
    });
  });



  // Signup de paciente
  passport.use('cliente-signup', new LocalStrategy({
    // usernameField y passwordField son palabras reservadas
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true 
  },
  function (req, email, password, done) {
    Cliente.findOne({'email_cli': email}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash('signupMessage', 'the email is already taken'));
      } else {
        var newCliente = new Cliente();
        newCliente.email_cli = email;
        newCliente.pass_cli = newCliente.generateHash(password);
        newCliente.save(function (err) {
          if (err) { throw err; }
          return done(null, newCliente);
        });
      }
    });
  }));
//aqui termina el sign up de paciente


 


  // login del cliente
  passport.use('cliente-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    Cliente.findOne({'email_cli': email}, function (err, user) {
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




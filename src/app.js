//dependencias
const express = require('express'),
ejs = require('ejs');
const app = express();
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const InitiateMongoServer = require("./config/db");//Configuracion de la BD


// Initiate Mongo Server
InitiateMongoServer();


require('./config/passport')(passport);//configuracion de autenticacion y verificacion de usuario



//Configuracion
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');//View engine que usaremos
app.use(express.static(__dirname + '/public'));//Ubicacion de archivos publicos
app.set('views', path.join(__dirname, 'views')); //Carpeta de las vistas


// middlewares
app.use(morgan('dev')); // para ver los procesos de las vistas por consola
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false})) //Para interpretar los datos que vienen de un formulario y poder procesarlo
// required for passport
app.use(session({
	secret: 'Un secreto',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Importar rutas
const indexRoutes = require('./routes/index');
require('./routes/paciente')(app, passport)



// rutas del servidor
app.use('/', indexRoutes);



app.get('/Paciente', function(req, res){
    res.type('text/html');
    res.render('index-paciente-doctor', {
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});


app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});



//Inicialización del servidor
app.listen(app.get('port'), function(){
    console.log( 'Servidor iniciado en http://localhost:' +
    app.get('port') + '; presiona Ctrl-C para terminar.' );
});
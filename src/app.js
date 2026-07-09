//dependencias
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const InitiateMongoServer = require("./config/db");//Configuracion de la BD

// Variables de entorno obligatorias: si faltan, no arrancamos en vez de correr en un estado inseguro/roto
if (!process.env.MONGODB_URI || !process.env.SESSION_SECRET) {
    console.error('ERROR: Faltan variables de entorno requeridas (MONGODB_URI, SESSION_SECRET).');
    process.exit(1);
}

//Inicializamos el servidor
InitiateMongoServer();


//Configuracion
require('./config/passport')(passport);//configuracion de autenticacion y verificacion de usuario
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');//View engine que usaremos
app.set('views', path.join(__dirname, 'views')); //Carpeta de las vistas

// Railway (y cualquier proxy/load balancer) termina el TLS antes de llegar a Express.
// Sin esto, Express nunca ve la conexión como "https" y las cookies "secure" no se envían.
app.set('trust proxy', 1);

// middlewares
app.use(helmet({
    // Deshabilitado por ahora: la vista usa scripts/estilos inline y de CDN externos (Google Fonts)
    // que romperían con la CSP por defecto. Se puede afinar en un paso posterior.
    contentSecurityPolicy: false
}));
app.use(morgan('dev')); // para ver los procesos de las vistas por consola
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); //Para interpretar los datos que vienen de un formulario y poder procesarlo
app.use(express.static(__dirname + '/public'));//Ubicacion de archivos publicos

// required for passport
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
	cookie: {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 1000 * 60 * 60 * 24 // 1 día
	}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());//para enviar mensajes

//Importar rutas
const indexRoutes = require('./routes/index');
require('./routes/clinica')(app);
require('./routes/usuario')(app, passport)//se le envia passport a las rutas para poder trabajar la autenticacion en las mismas
//require('./routes/cliente')(app, passport)

// rutas del inicio
app.use('/', indexRoutes);

// 404 - ninguna ruta anterior coincidió
app.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 - Página no encontrada');
});

// manejador de errores centralizado
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.type('text/plain');
    res.send('500 - Error del servidor');
});

//Inicialización del servidor
app.listen(app.get('port'), function(){
    console.log( 'Servidor iniciado en http://localhost:' +
    app.get('port') + '; presiona Ctrl-C para terminar.' );
});
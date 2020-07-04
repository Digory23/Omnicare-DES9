//dependencias
const express = require('express'),
ejs = require('ejs');
const app = express();
const path = require('path');
const morgan = require('morgan');
const InitiateMongoServer = require("./config/db");//Configuracion de la BD


// Initiate Mongo Server
InitiateMongoServer();



// Routes
//const indexRoutes = require('./routes/index');

//Configuracion
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');//View engine que usaremos
app.use(express.static(__dirname + '/public'));//Ubicacion de archivos publicos
app.set('views', path.join(__dirname, 'views')); //Carpeta de las vistas


// middlewares
app.use(morgan('dev')); // Con morgan podemos ver los procesos en la vista de la consola.
app.use(express.urlencoded({extended: false})) //Para interpretar los datos que vienen de un formulario y poder procesarlo



app.get('/', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:1
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});

app.get('/Farmacia', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:2
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});

app.get('/Catalogo', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:3
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});

app.get('/Contacto', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:4
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});

app.get('/Compras', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:5
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});


app.get('/Detalle-Producto', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:6
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});


app.get('/Checkout', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:7
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});

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
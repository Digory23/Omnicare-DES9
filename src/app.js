//declaracion de variables
const express = require('express'),
    ejs = require('ejs');
const app = express();
const path = require('path');


//Ubicacion de archivos publicos
app.use(express.static('public'));

// Importar rutas
//const indexRoutes = require('./routes/index');


//Configuracion
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');//View engine que usaremos
app.set('views', path.join(__dirname, 'views')); //Carpeta de las vistas


app.get('/', function(req, res){
    res.type('text/html');
    res.render('index', {
        
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
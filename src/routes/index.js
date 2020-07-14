const express = require('express');
const router = express.Router();
// Require controller modules.
var productoController = require('./../controllers/productoController');
const productos = require('../models/productos');

//Rutas para cargar las paginas
router.get('/', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:1
    });
});

router.get('/Farmacia', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:2
    });
});

router.get('/Catalogo', function(req, res){
    res.type('text/html');
    productos.find({}, function(err, data){
        productos.countDocuments({}, function(err, count){
            res.render('index', {
                page:3,
                productos: data,
                prodconteo: count
            });
        });
    });

    // productos.countDocuments({}, function(err, count){
    //     res.render('index', {
    //         //page:3,
    //         totalprod: count
    //     });
    // });
});



router.get('/Contacto', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:4
    });
});

router.get('/Compras', isLoggedIn, function(req, res){
    res.type('text/html');
    res.render('index', {
        page:5
    });
});


router.get('/Detalle-Producto', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:6
    });
});


router.get('/Checkout', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:7
    });
});

router.get('/Blog', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:8
    });
});

/*
router.get('/Paciente', function(req, res){
    res.type('text/html');
    res.render('paciente-doctor/login', {
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});*/

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/Login');
}

module.exports = router;


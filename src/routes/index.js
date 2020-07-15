const express = require('express');
const router = express.Router();
// Require controller modules.
var productoController = require('./../controllers/productoController');
const productos = require('../models/productos');
const blog = require('../models/blog');

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
});

//Rutas para las categorías de productos. Actualizan los productos a la categoria seleccionada
//Analgésicos
router.get('/Analgesicos', function (req, res){
    res.type('text/html');
    productos.find({tipo_prod: "analgésico"}, function(err, data){
        productos.find({tipo_prod: "analgésico"}).count({}, function(err, count){    
            res.render('index', {
                page:3,
                productos: data,
                prodconteo: count
            });
        });
    });
  });

  //Anestésicos
  router.get('/Anestesicos', function (req, res){
    res.type('text/html');
    productos.find({tipo_prod: "anestésico"}, function(err, data){
        productos.find({tipo_prod: "anestésico"}).count({}, function(err, count){    
            res.render('index', {
                page:3,
                productos: data,
                prodconteo: count
            });
        });
    });
  });

  //Antiácidos
  router.get('/Antiacidos', function (req, res){
    res.type('text/html');
    productos.find({tipo_prod: "antiácido"}, function(err, data){
        productos.find({tipo_prod: "antiácido"}).count({}, function(err, count){    
            res.render('index', {
                page:3,
                productos: data,
                prodconteo: count
            });
        });
    });
  });

  //Antibióticos
  router.get('/Antibioticos', function (req, res){
    res.type('text/html');
    productos.find({tipo_prod: "antibiótico"}, function(err, data){
        productos.find({tipo_prod: "antibiótico"}).count({}, function(err, count){    
            res.render('index', {
                page:3,
                productos: data,
                prodconteo: count
            });
        });
    });
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
    blog.find({}, function(err, data){
        blog.countDocuments({}, function(err, count){
            res.render('index', {
                page:8,
                posts: data,
                cantposts: count
            });
        });
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


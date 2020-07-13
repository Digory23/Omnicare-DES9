const express = require('express');
const router = express.Router();



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
    res.render('index', {
        page:3
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



const express = require('express');
const router = express.Router();



router.get('/', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:1
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});

router.get('/Farmacia', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:2
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});

router.get('/Catalogo', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:3
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});


router.get('/Contacto', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:4
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});

router.get('/Compras', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:5
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});


router.get('/Detalle-Producto', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:6
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});


router.get('/Checkout', function(req, res){
    res.type('text/html');
    res.render('index', {
        page:7
    }, function(err, html){
        if(err) throw err;
        res.send(html);
    });
});



module.exports = router;
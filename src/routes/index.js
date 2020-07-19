const express = require('express');
const router = express.Router();
// Require controller modules.
var productoController = require('./../controllers/productoController');
var flash = require('connect-flash');
const productos = require('../models/productos');
const blog = require('../models/blog');
const carrito = require('../models/carrito');

//prueba para headers - update: no sirvió xd
/*router.get('shared/header', function(req, res){
    res.type('text/html');
    res.render('index', {
        header:1
    });
});

router.get('shared/header-logged', function(req, res){
    if(isLoggedIn){
    res.type('text/html');
    res.render('index', {
        header:2
    });}
});*/

//Rutas para cargar las paginas
router.get('/', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    res.render('index', {
        page: 1,
        header
    });
});

router.get('/Farmacia', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    res.render('index', {
        page: 2,
        header
    });
});

router.get('/Catalogo', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    productos.find({}, function (err, data) {
        productos.countDocuments({}, function (err, count) {
            res.render('index', {
                page: 3,
                productos: data,
                prodconteo: count,
                header
            });
        });
    });
});

//Rutas para las categorías de productos. Actualizan los productos a la categoria seleccionada
//Analgésicos
router.get('/Analgesicos', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    productos.find({ tipo_prod: "analgésico" }, function (err, data) {
        productos.find({ tipo_prod: "analgésico" }).count({}, function (err, count) {
            res.render('index', {
                page: 3,
                productos: data,
                prodconteo: count,
                header
            });
        });
    });
});

//Anestésicos
router.get('/Anestesicos', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    productos.find({ tipo_prod: "anestésico" }, function (err, data) {
        productos.find({ tipo_prod: "anestésico" }).count({}, function (err, count) {
            res.render('index', {
                page: 3,
                productos: data,
                prodconteo: count,
                header
            });
        });
    });
});

//Antiácidos
router.get('/Antiacidos', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    productos.find({ tipo_prod: "antiácido" }, function (err, data) {
        productos.find({ tipo_prod: "antiácido" }).count({}, function (err, count) {
            res.render('index', {
                page: 3,
                productos: data,
                prodconteo: count,
                header
            });
        });
    });
});

//Antibióticos
router.get('/Antibioticos', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    productos.find({ tipo_prod: "antibiótico" }, function (err, data) {
        productos.find({ tipo_prod: "antibiótico" }).count({}, function (err, count) {
            res.render('index', {
                page: 3,
                productos: data,
                prodconteo: count,
                header
            });
        });
    });
});


//añadir productos al carrito AQUIIIIIIIIIIIIIIII NO TOCAR
router.get('/Add-Producto/:codigo', async (req, res) => {
    const prod = new carrito();
    prod.codigo_prod = req.params.codigo;
    prod.usuario = req.user.email_user;
    //prod.precio_unitario = req.params.nombre;

    const producto = await productos.findOne(
        { codigo_prod: req.params.codigo }
    )

    console.log(producto)
    prod.nombre_prod = producto.nombre_prod;
    prod.precio_unitario = producto.precio_unitario;

    await prod.save();
    res.redirect('/Catalogo')

});

//añadir productos al carrito
router.post('/Add-Producto', async (req, res) => {
    const prod = new carrito();
    prod.codigo_prod = req.body.codigo;
    prod.usuario = req.user.email_user;
    prod.nombre_prod = req.body.nombre;
    prod.precio_unitario = req.body.precio;
    prod.cantidad = req.body.cantidad;
    prod.imagen = req.body.imagen
    await prod.save();
    res.redirect('/Catalogo')

});

router.get('/Contacto', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    res.render('index', {
        page: 4,
        header
    });
});

router.get('/Compras', isLoggedIn, async (req, res) => {
    const carrito_compra = await carrito.find(
        { usuario: req.user.email_user }
    )

    /*var cantidad, sub_total, itbms, total
    for (var i = 0; i < carrito_compra.length; i++) {
        cantidad = cantidad + carrito_compra[i].cantidad
        sub_total = sub_total + carrito_compra[i].precio_unitario * carrito_compra[i].cantidad
    }

    itbms = sub_total * 0.07
    total = itbms + sub_total
    itbms = 3*/
    console.log(carrito_compra);
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    res.render('index', {
        page: 5,
        header,
        carrito_compra
    });
});

router.get('/Detalle-Producto/:id', async (req, res) => {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    const prod = await productos.findById(req.params.id);
    console.log(prod)
    res.render('index', {
        page: 6,
        prod,
        header
    });
});

/* router.get('/Detalle-Producto/:id', async (req, res, next)=> {
    res.type('text/html');
    await productos.findById(req.params.id);
    console.log(prod)
    res.render('index', {
        page:6,
        prod: data
    });
});
 */



router.get('/Checkout', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    res.render('index', {
        page: 7,
        header
    });
});

router.get('/Blog', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    blog.find({}, function (err, data) {
        blog.countDocuments({}, function (err, count) {
            res.render('index', {
                page: 8,
                posts: data,
                cantposts: count,
                header
            });
        });
    });
});

router.get('/Ofertas', function (req, res) {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    productos.find({}, function (err, data) {
        productos.countDocuments({}, function (err, count) {
            res.render('index', {
                page: 9,
                productos: data,
                prodconteo: count,
                header
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


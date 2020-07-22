const express = require('express');
const router = express.Router();
// Require controller modules.
var productoController = require('./../controllers/productoController');
var flash = require('connect-flash');
const productos = require('../models/productos');
const blog = require('../models/blog');
const carrito = require('../models/carrito');



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

//vista principal de farmacia
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


//vista principal de Catalogo
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



//añadir productos al carrito
router.post('/Add-Producto', isLoggedIn, async (req, res) => {
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


//borramos productos del carrito
router.get('/delete/:id', async (req, res, next) => {
    let { id } = req.params;
    await carrito.remove({_id: id});
    res.redirect('/Compras');
});

router.get('/Detalle-Producto/:id', async (req, res) => {
    
    var header, modal
    if (req.isAuthenticated()) {
        header = 1
        modal = 1
    }
    res.type('text/html');
    const prod = await productos.findById(req.params.id);
    console.log(prod)
    res.render('index', {
        page: 6,
        prod,
        header,
        modal
    });
});


//vista para procesar la compra
router.get('/Checkout', isLoggedIn, async (req, res)=> {
    const carrito_compra = await carrito.find(
        { usuario: req.user.email_user }
    )

    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    res.render('index', {
        page: 7,
        header,
        carrito_compra
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



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/Login');
}

module.exports = router;


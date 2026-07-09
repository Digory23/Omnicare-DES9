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
router.get('/Catalogo', async (req, res, next) => {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    try {
        const [data, count] = await Promise.all([
            productos.find({}),
            productos.countDocuments({})
        ]);
        res.render('index', {
            page: 3,
            productos: data,
            prodconteo: count,
            header
        });
    } catch (err) {
        next(err);
    }
});

//Rutas para las categorías de productos. Actualizan los productos a la categoria seleccionada
//Analgésicos
router.get('/Analgesicos', async (req, res, next) => {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    try {
        const filtro = { tipo_prod: "analgésico" };
        const [data, count] = await Promise.all([
            productos.find(filtro),
            productos.countDocuments(filtro)
        ]);
        res.render('index', {
            page: 3,
            productos: data,
            prodconteo: count,
            header
        });
    } catch (err) {
        next(err);
    }
});

//Anestésicos
router.get('/Anestesicos', async (req, res, next) => {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    try {
        const filtro = { tipo_prod: "anestésico" };
        const [data, count] = await Promise.all([
            productos.find(filtro),
            productos.countDocuments(filtro)
        ]);
        res.render('index', {
            page: 3,
            productos: data,
            prodconteo: count,
            header
        });
    } catch (err) {
        next(err);
    }
});

//Antiácidos
router.get('/Antiacidos', async (req, res, next) => {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    try {
        const filtro = { tipo_prod: "antiácido" };
        const [data, count] = await Promise.all([
            productos.find(filtro),
            productos.countDocuments(filtro)
        ]);
        res.render('index', {
            page: 3,
            productos: data,
            prodconteo: count,
            header
        });
    } catch (err) {
        next(err);
    }
});

//Antibióticos
router.get('/Antibioticos', async (req, res, next) => {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    try {
        const filtro = { tipo_prod: "antibiótico" };
        const [data, count] = await Promise.all([
            productos.find(filtro),
            productos.countDocuments(filtro)
        ]);
        res.render('index', {
            page: 3,
            productos: data,
            prodconteo: count,
            header
        });
    } catch (err) {
        next(err);
    }
});



//añadir productos al carrito
router.post('/Add-Producto', isLoggedIn, async (req, res, next) => {
    try {
        const prod = new carrito();
        prod.codigo_prod = req.body.codigo;
        prod.usuario = req.user.email_user;
        prod.nombre_prod = req.body.nombre;
        prod.precio_unitario = req.body.precio;
        prod.cantidad = req.body.cantidad;
        prod.imagen = req.body.imagen
        await prod.save();
        res.redirect('/Catalogo')
    } catch (err) {
        next(err);
    }
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

router.get('/Compras', isLoggedIn, async (req, res, next) => {
    try {
        const carrito_compra = await carrito.find(
            { usuario: req.user.email_user }
        )
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
    } catch (err) {
        next(err);
    }
});


//borramos productos del carrito
router.get('/delete/:id', isLoggedIn, async (req, res, next) => {
    try {
        let { id } = req.params;
        // solo se borra si el item pertenece al usuario logueado, evita que un usuario
        // borre items del carrito de otro adivinando el _id
        await carrito.deleteOne({ _id: id, usuario: req.user.email_user });
        res.redirect('/Compras');
    } catch (err) {
        next(err);
    }
});

router.get('/Detalle-Producto/:id', async (req, res, next) => {
    try {
        var header, modal
        if (req.isAuthenticated()) {
            header = 1
            modal = 1
        }
        res.type('text/html');
        const prod = await productos.findById(req.params.id);
        res.render('index', {
            page: 6,
            prod,
            header,
            modal
        });
    } catch (err) {
        next(err);
    }
});


//vista para procesar la compra
router.get('/Checkout', isLoggedIn, async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err);
    }
});

router.get('/Blog', async (req, res, next) => {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    try {
        const [data, count] = await Promise.all([
            blog.find({}),
            blog.countDocuments({})
        ]);
        res.render('index', {
            page: 8,
            posts: data,
            cantposts: count,
            header
        });
    } catch (err) {
        next(err);
    }
});

router.get('/Ofertas', async (req, res, next) => {
    var header
    if (req.isAuthenticated()) {
        header = 1
    }
    res.type('text/html');
    try {
        const [data, count] = await Promise.all([
            productos.find({}),
            productos.countDocuments({})
        ]);
        res.render('index', {
            page: 9,
            productos: data,
            prodconteo: count,
            header
        });
    } catch (err) {
        next(err);
    }
});



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/Login');
}

module.exports = router;


const Producto = require('../models/productos');
const Blog = require('../models/blog');
const Carrito = require('../models/carrito');

// La vista usa header=1 para mostrar la barra de usuario logueado.
function headerFlag(req) {
    return req.isAuthenticated() ? 1 : undefined;
}

// Página de inicio (page 1)
exports.home = (req, res) => {
    res.type('text/html');
    res.render('index', { page: 1, header: headerFlag(req) });
};

// Vista principal de farmacia (page 2)
exports.farmacia = (req, res) => {
    res.type('text/html');
    res.render('index', { page: 2, header: headerFlag(req) });
};

// Renderiza el catálogo (page 3). Si se pasa un tipo, filtra por categoría.
async function renderCatalogo(req, res, next, tipo) {
    res.type('text/html');
    try {
        const filtro = tipo ? { tipo_prod: tipo } : {};
        const [data, count] = await Promise.all([
            Producto.find(filtro),
            Producto.countDocuments(filtro)
        ]);
        res.render('index', {
            page: 3,
            productos: data,
            prodconteo: count,
            header: headerFlag(req)
        });
    } catch (err) {
        next(err);
    }
}

// Catálogo completo
exports.catalogo = (req, res, next) => renderCatalogo(req, res, next, null);

// Factory para las rutas de categoría (Analgésicos, Anestésicos, etc.)
exports.porCategoria = (tipo) => (req, res, next) => renderCatalogo(req, res, next, tipo);

// Añadir un producto al carrito (POST)
exports.addProducto = async (req, res, next) => {
    try {
        const prod = new Carrito();
        prod.codigo_prod = req.body.codigo;
        prod.usuario = req.user.email_user;
        prod.nombre_prod = req.body.nombre;
        prod.precio_unitario = req.body.precio;
        prod.cantidad = req.body.cantidad;
        prod.imagen = req.body.imagen;
        await prod.save();
        res.redirect('/Catalogo');
    } catch (err) {
        next(err);
    }
};

// Vista de contacto (page 4)
exports.contacto = (req, res) => {
    res.type('text/html');
    res.render('index', { page: 4, header: headerFlag(req) });
};

// Carrito de compras del usuario (page 5)
exports.compras = async (req, res, next) => {
    try {
        const carrito_compra = await Carrito.find({ usuario: req.user.email_user });
        res.type('text/html');
        res.render('index', {
            page: 5,
            header: headerFlag(req),
            carrito_compra
        });
    } catch (err) {
        next(err);
    }
};

// Borra un ítem del carrito (solo si pertenece al usuario logueado)
exports.deleteCarrito = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Carrito.deleteOne({ _id: id, usuario: req.user.email_user });
        res.redirect('/Compras');
    } catch (err) {
        next(err);
    }
};

// Detalle de un producto (page 6)
exports.detalleProducto = async (req, res, next) => {
    try {
        let header, modal;
        if (req.isAuthenticated()) {
            header = 1;
            modal = 1;
        }
        res.type('text/html');
        const prod = await Producto.findById(req.params.id);
        res.render('index', { page: 6, prod, header, modal });
    } catch (err) {
        next(err);
    }
};

// Vista para procesar la compra (page 7)
exports.checkout = async (req, res, next) => {
    try {
        const carrito_compra = await Carrito.find({ usuario: req.user.email_user });
        res.type('text/html');
        res.render('index', {
            page: 7,
            header: headerFlag(req),
            carrito_compra
        });
    } catch (err) {
        next(err);
    }
};

// Blog (page 8)
exports.blog = async (req, res, next) => {
    try {
        const [data, count] = await Promise.all([
            Blog.find({}),
            Blog.countDocuments({})
        ]);
        res.type('text/html');
        res.render('index', {
            page: 8,
            posts: data,
            cantposts: count,
            header: headerFlag(req)
        });
    } catch (err) {
        next(err);
    }
};

// Ofertas (page 9)
exports.ofertas = async (req, res, next) => {
    try {
        const [data, count] = await Promise.all([
            Producto.find({}),
            Producto.countDocuments({})
        ]);
        res.type('text/html');
        res.render('index', {
            page: 9,
            productos: data,
            prodconteo: count,
            header: headerFlag(req)
        });
    } catch (err) {
        next(err);
    }
};

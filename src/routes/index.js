const express = require('express');
const router = express.Router();

const farmacia = require('../controllers/farmaciaController');
const { isLoggedIn } = require('../middlewares/auth');
const validators = require('../middlewares/validators');

// Páginas informativas
router.get('/', farmacia.home);
router.get('/Farmacia', farmacia.farmacia);
router.get('/Contacto', farmacia.contacto);

// Catálogo y categorías
router.get('/Catalogo', farmacia.catalogo);
router.get('/Analgesicos', farmacia.porCategoria('analgésico'));
router.get('/Anestesicos', farmacia.porCategoria('anestésico'));
router.get('/Antiacidos', farmacia.porCategoria('antiácido'));
router.get('/Antibioticos', farmacia.porCategoria('antibiótico'));
router.get('/Ofertas', farmacia.ofertas);
router.get('/Detalle-Producto/:id', farmacia.detalleProducto);

// Blog
router.get('/Blog', farmacia.blog);

// Carrito / compra (requieren sesión)
router.post('/Add-Producto', isLoggedIn, validators.addProducto, validators.handleValidation('/Catalogo'), farmacia.addProducto);
router.get('/Compras', isLoggedIn, farmacia.compras);
router.get('/delete/:id', isLoggedIn, farmacia.deleteCarrito);
router.get('/Checkout', isLoggedIn, farmacia.checkout);

module.exports = router;

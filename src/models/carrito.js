const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    codigo_prod: String,
    usuario: String,
    
});


module.exports = mongoose.model('carrito-compras', carritoSchema);
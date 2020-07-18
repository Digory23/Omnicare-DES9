const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    codigo_prod: String,
    usuario: String,
    precio_unitario: Number,
    nombre_prod: String,
    cantidad: Number,
    imagen: String
    
});


module.exports = mongoose.model('carrito-compras', carritoSchema);
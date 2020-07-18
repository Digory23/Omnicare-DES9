const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    codigo_prod: String,
    nombre_prod: String,
    tipo_prod: String,
    desc_prod: String,
    precio_unitario: Number,
    cant_stock: Number,
    peso_prod: String,
    info_prod: String,
    img_prod: String
});



module.exports = mongoose.model('productos', productSchema, 'productos');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const productSchema = new mongoose.Schema({
    codigo_prod: String,
    nombre_prod: String,
    tipo_prod: String,
    desc_prod: String,
    precio_unitario: Double,
    cant_stock: Integer,
    peso_prod: String
});

module.exports = mongoose.model('productos', productSchema);
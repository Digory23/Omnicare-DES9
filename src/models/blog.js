const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    titulo_post: String,
    cuerpo_post: String,
    desc_post: String,
    fecha_post: Date,
    autor_post: String
});

module.exports = mongoose.model('blog', blogSchema, 'blog');
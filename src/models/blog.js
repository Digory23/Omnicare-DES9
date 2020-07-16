const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    titulo_post: String,
    cuerpo_post: String,
    desc_post: String,
    fecha_post: String,
    autor_post: String,
    img_post: String
});

module.exports = mongoose.model('blog', blogSchema, 'blog');
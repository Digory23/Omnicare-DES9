var producto = require('../models/productos');

// Display list of all Authors.
exports.producto_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Productos list');
};

// Display detail page for a specific Author.
exports.producto_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Productos detail: ' + req.params.id);
};
const express = require('express');
const router = express.Router();


router.post('/Solicitud', function(req, res){
    res.type('text/html');
    res.render('index', {
        user: "3"
    });
});



module.exports = router;
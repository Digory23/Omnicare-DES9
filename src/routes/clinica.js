const express = require('express');
const router = express.Router();


router.get('/prueba', function(req, res){
    res.type('text/html');
    res.render('index', {
        user: "3"
    });
});



module.exports = router;
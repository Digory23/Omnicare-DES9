module.exports = (app) => { 


app.get('/AgendarCita', function(req, res){
    res.type('text/html');
    res.render('index-paciente-doctor', {
        tipo_usuario: "3",
        user: req.user
    });
});

app.get('/CitasPendientes', function(req, res){
    res.type('text/html');
    res.render('index-paciente-doctor', {
        tipo_usuario: "4",
        user: req.user
    });
});

}

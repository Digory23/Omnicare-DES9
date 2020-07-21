module.exports = (app) => {
    const express = require('express');
    const router = express.Router();

    const Solicitud = require('../models/solicitud_cita')
    const User = require('../models/user');
    const Cita = require('../models/cita');

    //esta ruta valida el tipo de usuario (funcion tipo user)
    app.get('/Perfil-Validate', isLoggedIn, IsPaciente, TipoUser, async (req, res) => {
        //res.render('index-paciente-doctor');
    });


    //profile view de paciente 
    app.get('/Perfil-Paciente', isLoggedIn, async (req, res) => {
        //se obtienen los doctores disponibles
        const doctores = await User.find(
            {tipo_user : "2"}
        )

        const citas = await Cita.find(
            {email_pac: req.user.email_user}
        )
        res.render('index-paciente-doctor', {
           user: req.user,
           tipo_usuario: "1",
           doctores,
           citas
        });
    });


    //profile view de doctor
    app.get('/Perfil-Doctor', isLoggedIn, async (req, res) => {
        
        //se muestran las solicitudes de citas hechas al doctor que inicio sesion
        const solicitud = await Solicitud.find(
            {doctor: req.user.nombre_user}
        )
        const citas = await Cita.find(
            {doctor: req.user.email_user}
        )

        
        console.log(citas);
        res.render('index-paciente-doctor', {
            solicitud,
            citas,
            user: req.user,
            tipo_usuario: "2"
        });
    });

    //en esta ruta se inserta la solicitud de cita en la base de datos
    app.post('/Solicitud', async (req, res, next) => {
        const cita = new Solicitud(req.body);
        cita.ced_paciente = req.user.cedula;
        cita.paciente = req.user.nombre_user +" "+req.user.apellido_user;
        await cita.save();
        res.redirect('/Perfil-Paciente');
    });


    //vista de agendar citas del doctor
    app.get('/AgendarCita/:id', async (req, res) => {
        res.type('text/html');
        let id = req.params;
        const solicitudcita= await Solicitud.findById(req.params.id);
        const pac = await User.findOne({cedula:solicitudcita.ced_paciente});
        console.log(pac)
        res.render('index-paciente-doctor', {
            tipo_usuario: "3",
            user: req.user,
            solicitudcita,
            pac
        });
    });

    //agendar cita en la vista de doctor
    app.post('/AgendarCita', async(req,res)=>{
        const citas = new Cita(req.body);
        citas.doctor = req.user.email_user;
        citas.nombre_doctor = req.user.nombre_user;
        console.log(citas)
        await citas.save();
        res.redirect('/Perfil-Doctor');
    });


    //citas pendientes del doctor
    app.get('/CitasPendientes', function (req, res) {
        res.type('text/html');
        res.render('index-paciente-doctor', {
            tipo_usuario: "4",
            user: req.user
        });
    });

}

//esta funcion valida el tipo de usuario
function TipoUser(req, res, next) {
    if (req.user.tipo_user== "1"){
        res.redirect('/Perfil-Paciente');
      }
      else{
        res.redirect('/Perfil-Doctor');
      }
}

//verifica si tiene permiso de paciente o doctor
function IsPaciente(req, res, next) {
    if (req.user.acceso) {
        return next();
    }
    res.redirect('/Verificacion');
}

//verifica si existe sesion
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/Login');
}


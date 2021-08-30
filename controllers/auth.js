const { response } = require("express");

const bcrypjs = require('bcryptjs');
const  Usuario  = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req,res=response) => {

    const {correo,password} = req.body;

    try{
        
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario o contrasena incorrecto - correo'
            });
        }

        // Verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario o contrasena incorrecto - estado:false'
            })
        }
        // Verificar contrasena
        const validPassword = bcrypjs.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'Usuario o contrasena incorrecto - password'
            })
        }

        // Generar Token
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    }catch (error){
        console.log(error)
        return res.status(500).json({
            msg: 'Error'
        })
    }

};

module.exports = {
    login
}
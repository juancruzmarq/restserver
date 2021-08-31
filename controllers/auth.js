const { response } = require("express");

const bcrypjs = require('bcryptjs');
const  Usuario  = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignin= async(req,res=response) =>{

    const {id_token} = req.body;
    try{

        const {correo, nombre, img} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});

        if (!usuario){
            //tengo q crearlo
            const data = {
                nombre,
                correo,
                password: 'a',
                img,
                google: true,
                rol: 'USER_ROLE'
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB 
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario no habilitado o eliminado'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Google signin OK!',
            usuario,
            token
        })

    }catch(error){

        res.status(400).json({
            msg: `Token de google no es valido`,
            error
        })
    }
}

module.exports = {
    login,
    googleSignin
}

const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol='') =>{

    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol} no es valido`);
    }

}

const existeEmail = async(correo = '') =>{
    const emailExiste = await Usuario.findOne({correo});
    if (emailExiste){
        throw new Error(`El correo ${correo} ya esta en uso`)
    }
}

const existeUsuarioId = async( id ) =>{
   
    const existeId = await Usuario.findById(id);
    if (!existeId){
        throw new Error(`No existe el usuario con el id: ${id}`)
    }
}

//existe categoria

const existeCategoria = async( id ) =>{
   
    const existeId = await Categoria.findById(id);
    if (!existeId){
        throw new Error(`No existe la categoria con el id: ${id}`)
    }
}

//existe producto

const existeProducto = async( id ) =>{
   
    const existeId = await Producto.findById(id);
    if (!existeId){
        throw new Error(`No existe el producto con el id: ${id}`)
    }
}

// Validar colecciones permitidas

const coleccionesPermitidas = (coleccion='', colecciones = []) =>{

    const incluida = colecciones.includes(coleccion);

    if (!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida, las colecciones permitidas son: ${colecciones}`);
    }

    return true;
}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}

const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol='') =>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol} no es valido`);
    }
};

const existeEmail = async(correo) =>{
    const emailExiste = await Usuario.findOne({correo});
    if (emailExiste){
        throw new Error(`El correo ${correo} ya esta en uso`)
    }
};

const existeUsuarioId = async(id) =>{
    const existeId = await Usuario.findById(id);
    if (!existeId){
        throw new Error(`No existe el usuario con el id: ${id}`)
    }
};

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioId
}
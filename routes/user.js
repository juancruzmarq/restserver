
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos,validarJWT,esAdminRole,tieneRole} = require('../middlewares');


const { usuariosGet, usuariosDelete, usuariosPost, usuariosPut } = require('../controllers/usuarios');
const { esRolValido, existeEmail, existeUsuarioId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet); 

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo').custom(existeEmail),
    check('password','Contrasena no valida').isLength({min: 6}),
    //check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPut);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usuariosDelete);

module.exports = router;
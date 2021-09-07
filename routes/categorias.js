const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');



const router = Router();

/**
 * {{url}}/api/categorias
 */
// Obenter todas las categorias - publico
router.get('/',obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id', [
    
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria);

// Crear una nueva categoria - privado con cualquier rol
router.post('/', [validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos ],
    crearCategoria);

// Actualizar un registro por id - privado
router.put('/:id',[
    validarJWT,
    check('id').custom(existeCategoria),
    check('id', 'No es un ID valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria);

// Borrar una categoria - solo si es un admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id').custom(existeCategoria),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], borrarCategoria);


module.exports = router;
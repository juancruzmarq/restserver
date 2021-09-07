const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerProductos,
        obtenerProducto,
        crearProducto,
        actualizarProducto, 
        eliminarProducto } = require("../controllers/productos");

const { existeProducto } = require("../helpers/db-validators");
const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/categorias
 */
// Obenter todas las categorias - publico
router.get('/',[validarCampos],obtenerProductos);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto);

// Crear una nueva categoria - privado con cualquier rol
router.post('/', [validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos ],
    crearProducto);

// Actualizar un registro por id - privado
router.put('/:id',[
    validarJWT,
    check('id').custom(existeProducto),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
],actualizarProducto);

// Borrar una categoria - solo si es un admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id').custom(existeProducto),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], eliminarProducto);


module.exports = router;
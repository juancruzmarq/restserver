

const { Router } = require('express');
const { check } = require('express-validator');
const  {validarCampos}  = require('../middlewares');
const { cargarArchivo, actualizarArchivo } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos']) ),
    validarCampos
], actualizarArchivo );

module.exports = router;
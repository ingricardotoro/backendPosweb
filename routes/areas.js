//===============================
//ARCHIVO CON TODAS LAS RUTAS DE Bodegas
//Rutas : localhost:4000/api/areas
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { createArea, listArea, deleteArea, updateArea, listAreaByName } = require('../controllers/areaController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevas Bodegas (POST) .../api/areas
router.post('/', [
    check('parentCode', 'El codigo de Area Padre es obligatorio').not().isEmpty(),
    check('codeArea', 'El codigo de Area es obligatorio').not().isEmpty(),
    check('nameArea', 'El nombre del Area es obligatorio').not().isEmpty(),
    validarCampo
], createArea)

//Ruta para listar a todos las bodegas creadas
router.get('/', listArea)

//Ruta para listar a todos las bodegas creadas filtradas por nombre
router.get('/:name', listAreaByName)

//Rutas para crear eliminar bodega por ID (DELETE) .../api/warehouse/delete/id
router.delete('/delete/:id', deleteArea)

//Rutas para crear actualizar bodegas (PUT) .../api/warehouse/update/id
router.put('/update/:id', [
    check('parentCode', 'El codigo de Area Padre es obligatorio').not().isEmpty(),
    check('codeArea', 'El codigo de Area es obligatorio').not().isEmpty(),
    check('nameArea', 'El nombre del Area es obligatorio').not().isEmpty(),
    validarCampo
], updateArea)


module.exports = router
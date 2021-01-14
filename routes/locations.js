//===============================
//ARCHIVO CON TODAS LAS RUTAS DE UBICACIONES
//Rutas : localhost:4000/api/locations
//===============================

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { listLocation, createLocation, deleteLocation, updateLocation } = require('../controllers/locationsController')

//=======================
//RUTAS
//=======================

//Ruta para listar a todos las ubicaciones creadas
router.get('/', listLocation)

//Rutas para crear nuevas ubicaciones (POST) .../api/locations
router.post('/', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('codeLocation', 'el codeLocation').not().isEmpty(),
    validarCampo
], createLocation)

//Rutas para crear Eliminar Ubicaciones por ID (DELETE) .../api/locations/delete/id
router.delete('/delete/:id', deleteLocation)

//Rutas para Actualzar las ubicaciones (PUT) .../api/locations/update/id
router.put('/update/:id', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('codeLocation', 'el codeLocation').not().isEmpty(),
    validarCampo
], updateLocation)

module.exports = router
//===============================
//ARCHIVO CON TODAS LAS RUTAS DE EMPLOYEES
//Rutas : localhost:4000/api/employees
//===============================

const { Router } = require('express')

const router = Router()
    //const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
//const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { findByIdentidad, findByName } = require('../controllers/personController')

//=======================
//RUTAS
//=======================

//Rutas para Buscar personas por numero de identidad (POST) .../api/person/findByIdentidad
router.post('/findbyidentidad/:identidad', findByIdentidad)

//Rutas para Buscar personas por nombre (POST) .../api/person/findByIName
router.post('/findbyname/:name', findByName)


module.exports = router
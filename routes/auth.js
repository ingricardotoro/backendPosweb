//===============================
//ARCHIVO CON TODAS LAS RUTAS DE AUTH
//Rutas : localhost:4000/api/auth
//===============================

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { loginUser } = require('../controllers/authController')

//=======================
//RUTAS
//=======================
//Rutas para hacer login (POST) .../api/auth/login, solicita email y password
router.post('/login', [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('username', 'La clave debe tener 4 letras mínimo').isLength({ min: 4 }),
    check('password', 'La clave es obligatoria').not().isEmpty(),
    check('password', 'La clave debe tener 6 letras mínimo').isLength({ min: 6 }),
    validarCampo
], loginUser)


module.exports = router
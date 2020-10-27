//===============================
//ARCHIVO CON TODAS LAS RUTAS DE  USUARIOS
//Rutas : localhost:4000/api/users
//===============================

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { createUser, listUsers, deleteUser } = require('../controllers/userController')
const { validarJwt } = require('../middlewares/validarJwt')


//Rutas para crear un nuevo user (POST) .../api/users, solicita username, password, fullname, role
router.post('/', [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('employeeid', 'El employeeid es obligatorio').not().isEmpty(),
    check('username', 'La clave debe tener 4 letras mínimo').isLength({ min: 4 }),
    check('password', 'La clave es obligatoria').not().isEmpty(),
    check('password', 'La clave debe tener 6 letras mínimo').isLength({ min: 6 }),
    check('role', 'El Rol es    obligatorio').not().isEmpty(),
    validarCampo
], createUser)

//Ruta para listar los usuario existentes (GET) ../api/users , debe ser un usuario logeado con token valido
router.get('/', validarJwt, listUsers)

//Rutas para crear Eliminar usuarios por ID (DELETE) .../api/users/delete/id
router.delete('/delete/:id', deleteUser)


module.exports = router
//===============================
//ARCHIVO CON TODAS LAS RUTAS DE EMPLOYEES
//Rutas : localhost:4000/api/employees
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { createEmployee, listEmployee, deleteEmployee, updateEmployee } = require('../controllers/employeesController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevos empleados (POST) .../api/employees
router.post('/', [
    check('personid', 'El personId es obligatorio').not().isEmpty(),
    check('codeEmployee', 'El codeEmpleado es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('gender', 'El género de la persona es obligatorio').not().isEmpty(),
    check('phone1', 'El teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], createEmployee)

//Ruta para listar a todos los empleados creados
router.get('/', listEmployee)

//Rutas para crear actualizar empleado por ID (DELETE) .../api/employees/delete/id
router.delete('/delete/:id', deleteEmployee)

//Rutas para crear actualizar empleados (PUT) .../api/employees/update/id
router.put('/update/:id', [
    check('personid', 'El personId es obligatorio').not().isEmpty(),
    check('codeEmployee', 'El codeEmpleado es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('gender', 'El género de la persona es obligatorio').not().isEmpty(),
    //check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('phone1', 'El teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], updateEmployee)


module.exports = router
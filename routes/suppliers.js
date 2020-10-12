//===============================
//ARCHIVO CON TODAS LAS RUTAS DE SUPPLIER
//Rutas : localhost:4000/api/supplier
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { createSupplier, listSuppliers } = require('../controllers/suppliersController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevos proveedores (POST) .../api/employees
router.post('/', [
    check('personid', 'El personId es obligatorio').not().isEmpty(),
    check('contactid', 'El contactId es obligatorio').not().isEmpty(),
    check('codeSupplier', 'El codeSupplier es obligatorio').not().isEmpty(),
    check('companyName', 'El companyName de la empresa es obligatorio').not().isEmpty(),
    check('companyPhone1', 'El companyPhone1 de la empresa es obligatorio').not().isEmpty(),
    check('name', 'El nombre de la persona es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido de la persona es obligatorio').not().isEmpty(),
    check('identidad', 'La identidad de la persona es obligatoria').not().isEmpty(),
    check('gender', 'El gónero de la persona es obligatorio').not().isEmpty(),
    check('phone1', 'La teléfono de la persona es obligatoria').not().isEmpty(),
    validarCampo
], createSupplier)

router.get('/', listSuppliers)

module.exports = router
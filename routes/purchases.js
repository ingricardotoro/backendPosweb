//===============================
//ARCHIVO CON TODAS LAS RUTAS de Compras
//Rutas : localhost:4000/api/purchases
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { createP, listP, deleteP, updateP, listPByCode, lastCodeP } = require('../controllers/purchasesController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevas Bodegas (POST) .../api/purchases
router.post('/', [
    //check('codePurchaseOrder', 'El codePurchaseOrder es obligatorio').not().isEmpty(),
    check('employeeId', 'El employeeId es obligatorio').not().isEmpty(),
    check('area_id', 'El area_id es obligatorio').not().isEmpty(),
    check('codeInvoice', 'El codeInvoice es obligatorio').not().isEmpty(),
    check('datePurchase', 'El datePurchase es obligatorio').not().isEmpty(),
    check('typePaid', 'El typePaid es obligatorio').not().isEmpty(),
    check('balance', 'El Balance es obligatorio').not().isEmpty(),
    check('statusPurchase', 'El statusPurchase es obligatorio').not().isEmpty(),
    validarCampo
], createP)

//Ruta para listar a todas las compra
router.get('/', listP)

//Ruta para buscar una compra filtradas por codePurchase
router.get('/:codePurchase', listPByCode)

//Ruta para obtener el ultimo codigo de las ordenes de compra creadas
router.post('/lastcode', lastCodeP)

//Rutas para crear eliminar la compra por ID (DELETE) .../api/purchases/delete/id
router.delete('/delete/:id', deleteP)

//Rutas para crear actualizar ordenes de compras (PUT) .../api/purchases/update/id
router.put('/update/:id', [
    check('employeeId', 'El employeeId es obligatorio').not().isEmpty(),
    check('area_id', 'El area_id es obligatorio').not().isEmpty(),
    check('codeInvoice', 'El codeInvoice es obligatorio').not().isEmpty(),
    check('datePurchase', 'El datePurchase es obligatorio').not().isEmpty(),
    check('typePaid', 'El typePaid es obligatorio').not().isEmpty(),
    check('balance', 'El Balance es obligatorio').not().isEmpty(),
    check('statusPurchase', 'El statusPurchase es obligatorio').not().isEmpty(),
    validarCampo
], updateP)


module.exports = router
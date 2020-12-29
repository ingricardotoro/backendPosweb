//===============================
//ARCHIVO CON TODAS LAS RUTAS DE Ordenes de Compras
//Rutas : localhost:4000/api/purchasesorders
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { createPO, listPO, deletePO, updatePO, listPOByCode } = require('../controllers/purchasesordersController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevas Bodegas (POST) .../api/purchases_orders
router.post('/', [
    check('codePurchaseOrder', 'El codePurchaseOrder es obligatorio').not().isEmpty(),
    check('supplierId', 'El supplierId es obligatorio').not().isEmpty(),
    check('employeeId', 'El employeeId es obligatorio').not().isEmpty(),
    check('datePurchaseOrder', 'El datePurchaseOrder es obligatorio').not().isEmpty(),
    check('total', 'El total es obligatorio').not().isEmpty(),
    check('status', 'El status es obligatorio').not().isEmpty(),
    check('typePaid', 'El typePaid es obligatorio').not().isEmpty(),
    check('typeShip', 'El typeShip es obligatorio').not().isEmpty(),
    check('dateShip', 'El dateShip es obligatorio').not().isEmpty(),
    check('costShip', 'El costShip es obligatorio').not().isEmpty(),
    check('warehouseId', 'El warehouseId es obligatorio').not().isEmpty(),
    validarCampo
], createPO)

//Ruta para listar a todas las ordenes de compra
router.get('/', listPO)

//Ruta para listar a todos las ordenes de compra creadas filtradas por codePurchaseOrder
router.get('/:codePurchaseOrder', listPOByCode)

//Rutas para crear eliminar orden de compra por ID (DELETE) .../api/purchases_orders/delete/id
router.delete('/delete/:id', deletePO)

//Rutas para crear actualizar ordenes de compras (PUT) .../api/purchases_orders/update/id
router.put('/update/:id', [
    check('codePurchaseOrder', 'El codePurchaseOrder es obligatorio').not().isEmpty(),
    check('supplierId', 'El supplierId es obligatorio').not().isEmpty(),
    check('employeeId', 'El employeeId es obligatorio').not().isEmpty(),
    check('datePurchaseOrder', 'El datePurchaseOrder es obligatorio').not().isEmpty(),
    check('total', 'El total es obligatorio').not().isEmpty(),
    check('status', 'El status es obligatorio').not().isEmpty(),
    check('typePaid', 'El typePaid es obligatorio').not().isEmpty(),
    check('typeShip', 'El typeShip es obligatorio').not().isEmpty(),
    check('dateShip', 'El dateShip es obligatorio').not().isEmpty(),
    check('costShip', 'El costShip es obligatorio').not().isEmpty(),
    check('warehouseId', 'El warehouseId es obligatorio').not().isEmpty(),
    validarCampo
], updatePO)


module.exports = router
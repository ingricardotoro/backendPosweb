//===============================
//ARCHIVO CON TODAS LAS RUTAS DE Ordenes de Compras
//Rutas : localhost:4000/api/requisitions
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { createRQ, listRQ, deleteRQ, updateRQ, listRQByCode, lastCodeRQ } = require('../controllers/requisitionsController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevas Bodegas (POST) .../api/requisitions
router.post('/', [
    check('codeRequisition', 'El codeRequisition es obligatorio').not().isEmpty(),
    //check('supplierId', 'El supplierId es obligatorio').not().isEmpty(),
    check('employeeId', 'El employeeId es obligatorio').not().isEmpty(),
    check('dateRequisition', 'El dateRequisition es obligatorio').not().isEmpty(),
    //check('total', 'El total es obligatorio').not().isEmpty(),
    check('status', 'El status es obligatorio').not().isEmpty(),
    //check('typePaid', 'El typePaid es obligatorio').not().isEmpty(),
    //check('typeShip', 'El typeShip es obligatorio').not().isEmpty(),
    //check('dateShip', 'El dateShip es obligatorio').not().isEmpty(),
    //check('costShip', 'El costShip es obligatorio').not().isEmpty(),
    check('area_id', 'El area_id es obligatorio').not().isEmpty(),
    validarCampo
], createRQ)

//Ruta para listar a todas las requisiciones
router.get('/', listRQ)

//Ruta para listar a todos las requisiciones creadas filtradas por codePurchaseOrder
router.get('/:codePurchaseOrder', listRQByCode)

//Ruta para obtener el ultimo codigo de las requisiciones creadas
router.post('/lastcode', lastCodeRQ)

//Rutas para crear eliminar orden de compra por ID (DELETE) .../api/purchases_orders/delete/id
router.delete('/delete/:id', deleteRQ)

//Rutas para crear actualizar requisicioness (PUT) .../api/purchases_orders/update/id
router.put('/update/:id', [
    check('codeRequisition', 'El codeRequisition es obligatorio').not().isEmpty(),
    //check('supplierId', 'El supplierId es obligatorio').not().isEmpty(),
    check('employeeId', 'El employeeId es obligatorio').not().isEmpty(),
    check('dateRequisition', 'El dateRequisition es obligatorio').not().isEmpty(),
    //check('total', 'El total es obligatorio').not().isEmpty(),
    check('status', 'El status es obligatorio').not().isEmpty(),
    //check('typePaid', 'El typePaid es obligatorio').not().isEmpty(),
    //check('typeShip', 'El typeShip es obligatorio').not().isEmpty(),
    //check('dateShip', 'El dateShip es obligatorio').not().isEmpty(),
    //check('costShip', 'El costShip es obligatorio').not().isEmpty(),
    check('area_id', 'El area_id es obligatorio').not().isEmpty(),
    validarCampo
], updateRQ)


module.exports = router
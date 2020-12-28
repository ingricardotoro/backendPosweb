//===============================
//ARCHIVO CON TODAS LAS RUTAS DE Detalles de Ordenes de Compras
//Rutas : localhost:4000/api/purchasesorders
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { createPOD, listPOD, deletePOD } = require('../controllers/purchaseordetailsController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevas productos a la orde (POST) .../api/purchase_order_details
router.post('/', [
    check('purchaseOrderId', 'El purchaseOrderId es obligatorio').not().isEmpty(),
    check('productId', 'El warehouseName es obligatorio').not().isEmpty(),
    check('cuantity', 'El cuantity es obligatorio').not().isEmpty(),
    check('cost', 'El cost es obligatorio').not().isEmpty(),
    check('tax', 'El tax es obligatorio').not().isEmpty(),
    check('discount', 'El discount es obligatorio').not().isEmpty(),
    validarCampo
], createPOD)

//Ruta para listar a todas los detalles de ordenes de compras
router.get('/:purchaseorderId', listPOD)

//Rutas para crear eliminar bodega por ID (DELETE) .../api/warehouse/delete/id
router.delete('/delete/:id', deletePOD)

module.exports = router
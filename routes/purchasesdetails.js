//===============================
//ARCHIVO CON TODAS LAS RUTAS DE Detalles de Compras
//Rutas : localhost:4000/api/purchasesdetails
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { createPD, listPD, deletePD } = require('../controllers/purchasedetailsController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevas productos a la orde (POST) .../api/purchase__details
router.post('/', [
    //check('purchaseId', 'El purchaseOrderId es obligatorio').not().isEmpty(),
    check('productId', 'El warehouseName es obligatorio').not().isEmpty(),
    check('cuantityReceived', 'El cuantityReceived es obligatorio').not().isEmpty(),
    check('cost', 'El cost es obligatorio').not().isEmpty(),
    check('tax', 'El tax es obligatorio').not().isEmpty(),
    check('discount', 'El discount es obligatorio').not().isEmpty(),
    validarCampo
], createPD)

//Ruta para listar a todas los detalles por Id de compras
router.get('/:purchaseId', listPD)

//Rutas para crear eliminar una producto por ID (DELETE
router.delete('/delete/:id', deletePD)

module.exports = router
//===============================
//ARCHIVO CON TODAS LAS RUTAS DE Detalles de Ordenes de Compras
//Rutas : localhost:4000/api/requisitionsdetails
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { createRQD, listRQD, deleteRQD } = require('../controllers/requisitionsdetailsController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevas productos a la orde (POST) .../api/purchase_order_details
router.post('/', [
    check('requisitionId', 'El requisitionId es obligatorio').not().isEmpty(),
    check('productId', 'El productId es obligatorio').not().isEmpty(),
    check('cuantity', 'El cuantity es obligatorio').not().isEmpty(),
    validarCampo
], createRQD)

//Ruta para listar a todas los detalles de ordenes de compras
router.get('/:requisitionId', listRQD)

//Rutas para crear eliminar un producto por ID (DELETE) 
router.delete('/delete/:id', deleteRQD)

module.exports = router
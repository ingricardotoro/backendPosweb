//===============================
//ARCHIVO CON TODAS LAS RUTAS DE Bodegas
//Rutas : localhost:4000/api/inventory
//===============================

const { Router } = require('express')

const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { registerInventory, listInventory, findInventoryByProductId, findInventoryByWarehouseId, deleteinventory } = require('../controllers/inventoryController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevas Bodegas (POST) .../api/warehouse
router.post('/', [
    check('warehouseId', 'El warehouseId es obligatorio').not().isEmpty(),
    check('productId', 'El productId es obligatorio').not().isEmpty(),
    validarCampo
], registerInventory)

//Ruta para listar a todos las bodegas creadas
router.get('/', listInventory)

//Ruta para listar a productos del invetario filtradas por productId
router.get('/:productoId', findInventoryByProductId)

//Ruta para listar a productos del invetario filtradas por productId
router.get('/:warehouseId', findInventoryByWarehouseId)

//Rutas para crear eliminar bodega por ID (DELETE) .../api/warehouse/delete/id
router.delete('/delete/:id', deleteinventory)


module.exports = router
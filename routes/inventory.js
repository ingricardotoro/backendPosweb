//===============================
//ARCHIVO CON TODAS LAS RUTAS DE Inventario
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
//Rutas para crear nuevos registros de inventario (POST) .../api/inventory
router.post('/', [
    check('warehouseId', 'El warehouseId es obligatorio').not().isEmpty(),
    check('productId', 'El productId es obligatorio').not().isEmpty(),
    validarCampo
], registerInventory)

//Ruta para listar a todos los registros del inventario
router.get('/', listInventory)

//Ruta para listar a productos del invetario filtradas por productId
router.get('/findbyproductid/:productId', findInventoryByProductId)

//Ruta para listar a productos del invetario filtradas por warehouseId
router.get('/findbywarehouseid/:warehouseId', findInventoryByWarehouseId)

//Rutas para crear eliminar un registro del inventario por ID (DELETE) .../api/inventory/delete/id
router.delete('/delete/:id', deleteinventory)


module.exports = router
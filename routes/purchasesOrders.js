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
const { createWarehouse, listWarehouse, deleteWarehouse, updateWarehouse, listWarehouseByName } = require('../controllers/purchasesordersController')

//=======================
//RUTAS
//=======================
//Rutas para crear nuevas Bodegas (POST) .../api/warehouse
router.post('/', [
    check('codeWarehouse', 'El codeWarehouse es obligatorio').not().isEmpty(),
    check('warehouseName', 'El warehouseName es obligatorio').not().isEmpty(),
    check('employeeId', 'El employeeId es obligatorio').not().isEmpty(),
    validarCampo
], createWarehouse)

//Ruta para listar a todos las bodegas creadas
router.get('/', listWarehouse)

//Ruta para listar a todos las bodegas creadas filtradas por nombre
router.get('/:name', listWarehouseByName)

//Rutas para crear eliminar bodega por ID (DELETE) .../api/warehouse/delete/id
router.delete('/delete/:id', deleteWarehouse)

//Rutas para crear actualizar bodegas (PUT) .../api/warehouse/update/id
router.put('/update/:id', [
    check('codeWarehouse', 'El codeWarehouse es obligatorio').not().isEmpty(),
    check('warehouseName', 'El warehouseName es obligatorio').not().isEmpty(),
    check('employeeId', 'El employeeId es obligatorio').not().isEmpty(),
    validarCampo
], updateWarehouse)


module.exports = router
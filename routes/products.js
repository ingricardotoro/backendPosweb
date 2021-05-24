//===============================
//ARCHIVO CON TODAS LAS RUTAS DE PRODUCTOS
//Rutas : localhost:4000/api/products
//===============================

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { listProduct, createProduct, deleteProduct, updateProduct, listProductByName, findProductById } = require('../controllers/productsController')


//=======================
//RUTAS
//=======================
//Ruta para listar a todos los productos creados
router.get('/', listProduct)

//Ruta para listar a productos del invetario filtradas por productId
router.get('/findbyid/:productId', findProductById)

//Ruta para buscar los prductos filtrados por nombre enviado por URL
router.get('/findByName/:name', listProductByName)

//Rutas para crear nuevos productos (POST) .../api/products
router.post('/', [
    check('name', 'El name del producto es obligatorio').not().isEmpty(),
    check('codeProduct', 'el codigo de producto es obligatorio').not().isEmpty(),
    check('categoryId', 'el categoryId es obligatorio').not().isEmpty(),
    check('supplierId', 'el supplierId de producto es obligatorio').not().isEmpty(),
    check('price1', 'el price1 de producto es obligatorio').not().isEmpty(),
    validarCampo
], createProduct)

//Rutas para crear Eliminar Producto por ID (DELETE) .../api/products/delete/id
router.delete('/delete/:id', deleteProduct)

//Rutas para actualizar productos (PUT) .../api/products/update/id
router.put('/update/:id', [
    check('name', 'El name del producto es obligatorio').not().isEmpty(),
    check('codeProduct', 'el codigo de producto es obligatorio').not().isEmpty(),
    check('categoryId', 'el categoryId es obligatorio').not().isEmpty(),
    check('supplierId', 'el supplierId de producto es obligatorio').not().isEmpty(),
    check('price1', 'el price1 de producto es obligatorio').not().isEmpty(),
    validarCampo
], updateProduct)



module.exports = router
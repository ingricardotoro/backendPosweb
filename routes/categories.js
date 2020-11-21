//===============================
//ARCHIVO CON TODAS LAS RUTAS DE CATEGORIAS
//Rutas : localhost:4000/api/categories
//===============================

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { listCategories, createCategory, deleteCategory, updateCategory } = require('../controllers/categoriesController')

//=======================
//RUTAS
//=======================

//Ruta para listar a todos las categorias creados
router.get('/', listCategories)

//Rutas para crear nuevas categorias (POST) .../api/categories
router.post('/', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('codeCategory', 'el codeCategory').not().isEmpty(),
    validarCampo
], createCategory)

//Rutas para crear Eliminar Categorias por ID (DELETE) .../api/categories/delete/id
router.delete('/delete/:id', deleteCategory)

//Rutas para Actualzar nuevas categorias (PUT) .../api/categories/update/id
router.put('/update/:id', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('codeCategory', 'el codeCategory').not().isEmpty(),
    validarCampo
], updateCategory)

module.exports = router
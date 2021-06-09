//===============================
//ARCHIVO CON TODAS LAS RUTAS DE PHOTOS de PRODUCTOS
//Rutas : localhost:4000/api/photos
//===============================
const Photo = require('../models/photos')

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { listPhotosByProductId, deletePhoto, uploadPhoto, createPhoto } = require('../controllers/photosController')

//=======================
//RUTAS
//=======================

//Ruta para listar a todos las photos de un producto
router.get('/:productId', listPhotosByProductId)


router
    .route('/')
    .post(
        uploadPhoto,
        createPhoto
    )


//Rutas para crear Eliminar photos por ID (DELETE) .../api/photos/delete/id
router.delete('/delete/:id', deletePhoto)


module.exports = router
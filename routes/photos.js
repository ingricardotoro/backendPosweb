//===============================
//ARCHIVO CON TODAS LAS RUTAS DE PHOTOS de PRODUCTOS
//Rutas : localhost:4000/api/photos
//===============================
const Photo = require('../models/photos')

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

/*******TO UPLOAD FILE OR PHOTO */
const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, './public/products/photos');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    console.log("AQUI VAMOS")
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

/*******END TO UPLOAD FILE OR PHOTO */


const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

//importamos Middleware para verificar los errores que viajan en req
const { validarCampo } = require('../middlewares/validarCampo')

//importamos los controladores que usaran en las rutas
const { listPhotosByProductId, deletePhoto, updatePhoto } = require('../controllers/photosController')

//=======================
//RUTAS
//=======================

//Ruta para listar a todos las photos de un producto
router.get('/:productId', listPhotosByProductId)

//Rutas para crear nuevas photos (POST) .../api/photos
/*router.post('/', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('src', 'El src es obligatorio').not().isEmpty(),
    check('productId', 'El productId es obligatorio').not().isEmpty(),
    validarCampo
], createPhoto)*/

router.route('/').post(upload.single('src'), (req, res) => {
    console.log('req.file', req.file);
    //console.log("REQ=" + req.body)
    const name = req.body.name;
    const description = req.body.description;
    const productId = req.body.productId;
    const src = req.file.filename;

    const newPhotoData = {
        name,
        description,
        productId,
        src
    }

    console.log("PHOTO=" + newPhotoData)

    const newPhoto = new Photo(newPhotoData);

    newPhoto.save()
        .then(() => res.json('Photo Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Rutas para crear Eliminar photos por ID (DELETE) .../api/photos/delete/id
router.delete('/delete/:id', deletePhoto)

//Rutas para Actualzar nuevas photos (PUT) .../api/photos/update/id
/*router.put('/update/:id', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('src', 'El src es obligatorio').not().isEmpty(),
    validarCampo
], updatePhoto)*/

module.exports = router
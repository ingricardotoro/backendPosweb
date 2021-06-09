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

const multerFilter = (req, file, cb) => {
    console.log("AQUI VAMOS")
        //const allowedFileTypes = ['image/jpeg', 'image/jpg', , 'image/JPG', 'image/png', 'image/PNG'];
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
    file.mimetype.startsWith('image')
}

const upload = multer({
    storage,
    fileFilter: multerFilter,
})

//funcion para listar todas las photos
const listPhotosByProductId = async(req, res) => {

    let productId = req.params.productId

    if (productId) {

        await Photo.find({ productId })
            .exec(function(err, photos) {
                //en caso de obtener un error en la Busqueda
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                console.log(JSON.stringify(photos))

                //verificamos si encontro una persona con estos datos
                if (photos[0] === null) {

                    return res.status(200).json({
                        ok: false,
                        msg: "NO hay photos con estos datos",
                        ProductId: productId
                    })
                }

                res.status(200).json({
                    ok: true,
                    msg: "Lista de photos filtrados por estos datos",
                    ProductId: productId,
                    photos
                })

            });

    } else {

        res.status(200).json({
            ok: true,
            msg: "La variable product Id en el URL es Obligatoria",
        })

        console.log("La variable product Id en el URL es Obligatoria");

    }
}

//funcion para la eliminacion de las Categorias
const deletePhoto = async(req, res) => {

    let id = req.params.id
    await Photo.findByIdAndRemove(id, (err, photoDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ninguna categoria a eliminar
        if (!photoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id de la photo no existe'
                }
            })
        }

        //en caso que la photo ha sido eliminada
        res.status(200).json({
            ok: true,
            message: "Photo Eliminada Exitosamente"
        })
    })
}

const createPhoto = async(req, res) => {
    //console.log("files:" + req.files)
    req.files.file.forEach((file) => {

        let productId = req.body.productId;
        let src = file.filename;

        const newPhotoData = {
            productId,
            src
        }

        const newPhoto = new Photo(newPhotoData);

        newPhoto.save()
            .then(() => res.json('Photo Added'))
            .catch(err => res.status(400).json('Error: ' + err));

    })
}

/*const uploadPhoto = (req, res) => {
    console.log("BIEN=" + req)
}*/

const uploadPhoto = upload.fields([
    { name: 'file', maxCount: 12 },
])

module.exports = { listPhotosByProductId, deletePhoto, createPhoto, uploadPhoto }
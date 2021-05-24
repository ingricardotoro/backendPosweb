const Photo = require('../models/photos')

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

module.exports = { listPhotosByProductId, deletePhoto }
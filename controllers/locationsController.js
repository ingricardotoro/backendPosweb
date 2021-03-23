const Location = require('../models/location')

//funcion para listar todas las ubicaciones
const listLocation = async(req, res) => {

    await Location.find({})
        //.populate('personid')
        .exec(function(err, ubicaciones) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de Ubicacioes",
                ubicaciones
            })
        });
}

//funcion para crear nuevos ubicaciones
const createLocation = async(req, res) => {

    const {
        area_id,
        purchase_id,
        product_id,
        amount,
    } = req.body

    newLocation = new Location({
        area_id,
        purchase_id,
        product_id,
        amount,
    })

    //creamos un objeto de la instancia Ubicaciones
    try {

        await newLocation.save()

        res.status(201).json({
            ok: true,
            msg: 'Ubicacion creada exitosamente',
            newLocation
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creating New newLocation"
        })
    }

}

//funcion para la eliminacion de las ubicaciones
const deleteLocation = async(req, res) => {

    let id = req.params.id
    await Location.findByIdAndRemove(id, (err, ubicacionDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ninguna categoria a eliminar
        if (!ubicacionDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id de la Ubicacion no existe'
                }
            })
        }

        //en caso que la ubicacion ha sido eliminada
        res.status(200).json({
            ok: true,
            message: "Ubicacion Eliminada Exitosamente"
        })
    })
}

//funcion para modificar ubicaciones
const updateLocation = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body

        let updateLocation = {

            area_id: body.area_id,
            purchase_id: body.purchase_id,
            product_id: body.product_id,
            amount: body.amount,
        }

        //new : true retorna el nuevo valor actualizado
        await Location.findByIdAndUpdate(id, updateLocation, {
                new: true, //devuelve el objeto actualizado
            },
            (err, locationDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    console.log("ERRORASO", err);
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico la Ubicacion
                if (!locationDB) {
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //en caso de que Si se actualizo la Ubicacion
                res.status(200).json({
                    ok: true,
                    msj: "Ubicacion Actualizada Exitosamente",
                    ubicacionActualizada: locationDB,
                })

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Actualizando Ubicacion"
        })
    }

}

module.exports = { createLocation, listLocation, deleteLocation, updateLocation }
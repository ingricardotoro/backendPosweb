const RQD = require('../models/requisitionsDetails')

//funcion para buscar todos los productos asignados a un ID de orden de compra
const listRQD = async(req, res) => {

    try {

        const requisitionId = req.params.requisitionId
        await RQD.find({ requisitionId })
            .populate('requisitionId')
            .populate('productId')
            .exec(function(err, productsDetails) {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                if (!productsDetails) {
                    res.status(400).json({
                        ok: false,
                        msg: "NO HAY Productos registrados con este ID",
                        find: false
                    })
                }

                res.status(200).json({
                    ok: true,
                    msg: "Productos encontrados",
                    find: true,
                    productsDetails
                })

            });

    } catch (error) {

        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error Buscando Productos por Id de Orden",
            find: false
        })
    }

}

//funcion para crear nuevos RQ
const createRQD = async(req, res) => {

    try {
        const {
            requisitionId,
            productId,
            cuantity,
        } = req.body


        newRQD = new POD({
            requisitionId,
            productId,
            cuantity,
        })

        if (newRQD.save()) {

            //Empleado creado exitosamente
            res.status(201).json({
                ok: true,
                msg: 'Producto Agregado a la Lista de Detalles de Requision',
                newRQD,
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: "Error agrgando Producto a la tabla de detalles de Requisiones"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creating Producto a la tabla detalles de Requisicion"
        })
    }

}

//funcion para la eliminacion de los Proveedores
const deleteRQD = async(req, res) => {

    let id = req.params.id
    await RQD.findByIdAndRemove(id, (err, rqdDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ningun POD a eliminar
        if (!rqdDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })
        }

        //en caso que la POD ha sido eliminada
        res.status(200).json({
            ok: true,
            message: "Producto Eliminado de detalles de orden Exitosamente"
        })
    })
}


module.exports = { listRQD, createRQD, deleteRQD, }
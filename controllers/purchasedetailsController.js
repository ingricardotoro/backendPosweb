const PD = require('../models/purchaseDetails')

//funcion para buscar todos los productos asignados a un ID  de compra
const listPD = async(req, res) => {

    try {

        const purchaseId = req.params.purchaseId
        await PD.find({ purchaseId })
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

//funcion para crear nuevos Productos a Detalles de Compras
const createPD = async(req, res) => {

    try {
        const {
            purchaseId,
            productId,
            cuantityRequered,
            cuantityReceived,
            lote,
            dateExpiration,
            dateToSale,
            cost,
            tax,
            discount,
            detail
        } = req.body


        newPD = new PD({
            purchaseId,
            productId,
            cuantityRequered,
            cuantityReceived,
            lote,
            dateExpiration,
            dateToSale,
            cost,
            tax,
            discount,
            detail
        })

        if (newPD.save()) {

            //Empleado creado exitosamente
            res.status(201).json({
                ok: true,
                msg: 'Producto Agregado a la Lista de Detalles de compra',
                newPD,
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: "Error agrgando Producto a la tabla de detalles de Compra"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creating Producto a la tabla detalles de Ordenes"
        })
    }

}

//funcion para la eliminacion de los productos de compras
const deletePD = async(req, res) => {

    let id = req.params.id
    await PD.findByIdAndRemove(id, (err, pdDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ningun PD a eliminar
        if (!pdDB) {
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
            message: "Producto Eliminado de detalles de compra Exitosamente"
        })
    })
}


module.exports = { listPD, createPD, deletePD, }
const POD = require('../models/purchaseOrderDetails')

//funcion para buscar todos los productos asignados a un ID de orden de compra
const listPOD = async(req, res) => {

    try {

        const purchaseOrderId = req.params.purchaseorderId
        await POD.find({ purchaseOrderId })
            .populate('purchaseOrderId')
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

//funcion para crear nuevos Proveedores
const createPOD = async(req, res) => {

    try {
        const {
            purchaseOrderId,
            productId,
            cuantity,
            cost,
            tax,
            discount
        } = req.body


        newPOD = new POD({
            purchaseOrderId,
            productId,
            cuantity,
            cost,
            tax,
            discount
        })

        if (newPOD.save()) {

            //Empleado creado exitosamente
            res.status(201).json({
                ok: true,
                msg: 'Producto Agregado a la Lista de Detalles de Orden',
                newPOD,
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: "Error agrgando Producto a la tabla de detalles de Ordenes"
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

//funcion para la eliminacion de los Proveedores
const deletePOD = async(req, res) => {

    let id = req.params.id
    await POD.findByIdAndRemove(id, (err, podDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ningun POD a eliminar
        if (!podDB) {
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


module.exports = { listPOD, createPOD, deletePOD, }
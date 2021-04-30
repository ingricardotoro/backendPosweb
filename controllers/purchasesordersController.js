const PO = require('../models/purchaseOrder')

//funcion para listar todos las ordenes de compra
const listPO = async(req, res) => {

    await PO.find({})
        .populate('area_id')
        .populate('employeeId')
        .populate('supplierId')
        .exec(function(err, ordenesCompras) {

            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Listado de las Ordenes de Compras Creadas",
                ordenesCompras
            })

            console.log(ordenesCompras);
        });

}

//funcion para listar todos las ordenes de compra filtradas por codigo
const listPOByCode = async(req, res) => {

    let codePurchaseOrder = req.params.codePurchaseOrder
        //nameReg = new RegExp(name, "i"); //i es para ser INSENSITIVE 

    if (codePurchaseOrder) {

        await PO.find({ codePurchaseOrder })
            .populate('area_id')
            .populate('employeeId')
            .populate('supplierId')
            .exec(function(err, ordenesCompras) {
                //en caso de obtener un error en la Busqueda
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //verificamos si encontro una persona con estos datos
                if (ordenesCompras[0].codePurchaseOrder === null) {

                    return res.status(200).json({
                        ok: false,
                        msg: "NO hay Ordenes de compras con estos datos",
                        Dato: codePurchaseOrder
                    })
                }

                res.status(200).json({
                    ok: true,
                    msg: "Lista de bodegas filtradas por estos datos",
                    datos: codePurchaseOrder,
                    ordenesCompras
                })

                console.log(ordenesCompras);
            });
    }


}

//Funcion para obtener el ultimo valor de codigo 
const lastCodePO = async(req, res) => {

    await PO.find({})
        .sort({ "codePurchaseOrder": -1 })
        .limit(1)
        .exec(function(err, lastCode) {

            let maxCode = 0
            if (lastCode[0] === undefined) { //en caso de ser el primer codigo
                maxCode = 0
            } else [
                maxCode = lastCode[0].codePurchaseOrder
            ]

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Ultimo Valor del Codigo de Ordenes",
                lastCode: maxCode
            })

            console.log(maxCode);
        });

    //const maxCode = await PO.find({}).sort({ codePurchaseOrder: -1 }).limit(1).then(codes => codes[0].codePurchaseOrder);
}

//funcion para crear nuevas Ordenes de compras
const createPO = async(req, res) => {

    const {
        codePurchaseOrder,
        supplierId,
        employeeId,
        datePurchaseOrder,
        total,
        status,
        typePaid,
        typeShip,
        dateShip,
        costShip,
        area_id,
        details,
        active
    } = req.body

    //creamos una instancia del objeto Orden de Compra
    newPurchaseOrder = new PO({
        codePurchaseOrder,
        supplierId,
        employeeId,
        datePurchaseOrder,
        total,
        status,
        typePaid,
        typeShip,
        dateShip,
        costShip,
        area_id,
        details,
        active
    })

    try {

        if (newPurchaseOrder.save()) {

            //Orden de Compra creada exitosamente
            res.status(201).json({
                ok: true,
                msg: 'Nueva Orden de Compra Creada',
                newPurchaseOrder
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: "Error creating Orden de Compra"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error catch creating Orden de Compra"
        })
    }

}

//funcion para la eliminacion de las ordenes de compras
const deletePO = async(req, res) => {

    let id = req.params.id
    await PO.findByIdAndRemove(id, (err, orderPurchaseDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ninguna orden de compra a eliminar
        if (!orderPurchaseDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })
        }

        //en caso que la Orden de compra ha sido eliminada
        res.status(200).json({
            ok: true,
            message: "Orden de Compra Eliminada Exitosamente"
        })
    })
}

//funcion para modificar Ordenes de compra
const updatePO = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body

        let updatePurchaseOrder = {
            codePurchaseOrder: body.codePurchaseOrder,
            supplierId: body.supplierId,
            employeeId: body.employeeId,
            datePurchaseOrder: body.datePurchaseOrder,
            total: body.total,
            status: body.status,
            typePaid: body.typePaid,
            typeShip: body.typeShip,
            dateShip: body.dateShip,
            costShip: body.costShip,
            area_id: body.area_id,
            details: body.details,
            active: body.active
        }

        //new : true retorna el nuevo valor actualizado
        await PO.findByIdAndUpdate(id, updatePurchaseOrder, {
                new: true,
            },
            (err, purchaseOrderDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico la bodega
                if (!purchaseOrderDB) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                //en caso de que Si se actualizo la Orden de Compra
                res.status(200).json({
                    ok: true,
                    msj: "Orden de Compra Actualizada Exitosamente",
                    OrdenDeCompraActualizada: purchaseOrderDB,

                })

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Catch Actualizando Orden de Compra"
        })
    }

}


module.exports = { createPO, listPO, deletePO, updatePO, listPOByCode, lastCodePO }
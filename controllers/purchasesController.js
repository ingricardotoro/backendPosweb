const P = require('../models/purchase')

//funcion para listar todos las compras
const listP = async(req, res) => {

    await P.find({})
        //.populate('personid')
        .exec(function(err, compras) {

            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Listado de las Compras Creadas",
                compras
            })

            console.log(compras);
        });

}

//funcion para listar todos las compra filtradas por codigo
const listPByCode = async(req, res) => {

    let codePurchase = req.params.codePurchase
        //nameReg = new RegExp(name, "i"); //i es para ser INSENSITIVE 

    if (codePurchase) {

        await P.find({ codePurchase })
            .exec(function(err, compra) {
                //en caso de obtener un error en la Busqueda
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //verificamos si encontro una persona con estos datos
                if (compra[0].codePurchase === null) {

                    return res.status(200).json({
                        ok: false,
                        msg: "NO hay Ordenes de compras con estos datos",
                        Dato: codePurchase
                    })
                }

                res.status(200).json({
                    ok: true,
                    msg: "Lista de compra filtradas por estos datos",
                    datos: codePurchase,
                    compra
                })

                console.log(compra);
            });
    }


}

//Funcion para obtener el ultimo valor de codigo 
const lastCodeP = async(req, res) => {

    await P.find({})
        .sort({ "codePurchase": -1 })
        .limit(1)
        .exec(function(err, lastCode) {

            let maxCode = 0
            if (lastCode[0] === undefined) { //en caso de ser el primer codigo
                maxCode = 0
            } else [
                maxCode = lastCode[0].codePurchase
            ]

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Ultimo Valor del Codigo de Compra",
                lastCode: maxCode
            })

            console.log(maxCode);
        });

    //const maxCode = await PO.find({}).sort({ codePurchaseOrder: -1 }).limit(1).then(codes => codes[0].codePurchaseOrder);
}

//funcion para crear nuevas compras
const createP = async(req, res) => {

    const {
        codePurchase,
        location_id,
        employeeId,
        codeInvoice,
        datePurchase,
        typePaid,
        creditDays,
        balance,
        statusPurchase,
    } = req.body

    //creamos una instancia del objeto Orden de Compra
    newPurchase = new P({
        codePurchase,
        location_id,
        employeeId,
        codeInvoice,
        datePurchase,
        typePaid,
        creditDays,
        balance,
        statusPurchase,
    })

    try {

        if (newPurchase.save()) {

            //Orden de Compra creada exitosamente
            res.status(201).json({
                ok: true,
                msg: 'Nueva Compra Creada',
                newPurchase
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: "Error creating new Compra"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error catch creating Compra"
        })
    }

}

//funcion para la eliminacion de las compras
const deleteP = async(req, res) => {

    let id = req.params.id
    await P.findByIdAndRemove(id, (err, purchaseDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ninguna orden de compra a eliminar
        if (!purchaseDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })
        }

        //en caso que la compra ha sido eliminada
        res.status(200).json({
            ok: true,
            message: "Compra Eliminada Exitosamente"
        })
    })
}

//funcion para modificar la compra
const updateP = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body

        let updatePurchase = {

            codePurchase: body.codePurchase,
            location_id: body.location_id,
            employeeId: body.employeeId,
            codeInvoice: body.codeInvoice,
            datePurchase: body.datePurchase,
            typePaid: body.typePaid,
            balance: body.balance,
            statusPurchase: body.statusPurchase,
        }

        //new : true retorna el nuevo valor actualizado
        await P.findByIdAndUpdate(id, updatePurchase, {
                new: true,
            },
            (err, purchaseDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico la bodega
                if (!purchaseDB) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                //en caso de que Si se actualizo la Compra
                res.status(200).json({
                    ok: true,
                    msj: "Compra Actualizada Exitosamente",
                    CompraActualizada: purchaseDB,

                })

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Catch Actualizando Compra"
        })
    }

}


module.exports = { createP, listP, deleteP, updateP, listPByCode, lastCodeP }
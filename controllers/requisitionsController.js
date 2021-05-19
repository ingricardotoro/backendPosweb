const RQ = require('../models/requisitions')

//funcion para listar todos las ordenes de compra
const listRQ = async(req, res) => {

    await RQ.find({})
        .populate('area_id')
        //.populate('employeeId')
        .populate({
            path: 'employeeId',
            populate: {
                path: 'personid',
                model: 'Person',
            }
        })
        .exec(function(err, requisitions) {

            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Listado de las Requisiciones Creadas",
                requisitions
            })

            console.log(requisitions);
        });

}

//funcion para listar todos las ordenes de compra filtradas por codigo
const listRQByCode = async(req, res) => {

    let codeRequisition = req.params.codeRequisition
        //nameReg = new RegExp(name, "i"); //i es para ser INSENSITIVE 

    if (codeRequisition) {

        await RQ.find({ codeRequisition })
            .populate('area_id')
            .populate('employeeId')
            .exec(function(err, requisitions) {
                //en caso de obtener un error en la Busqueda
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //verificamos si encontro una persona con estos datos
                if (requisitions[0].codeRequisition === null) {

                    return res.status(200).json({
                        ok: false,
                        msg: "NO hay Ordenes de compras con estos datos",
                        Dato: codeRequisition
                    })
                }

                res.status(200).json({
                    ok: true,
                    msg: "Lista de bodegas filtradas por estos datos",
                    datos: codeRequisition,
                    requisitions
                })

                console.log(requisitions);
            });
    }


}

//Funcion para obtener el ultimo valor de codigo 
const lastCodeRQ = async(req, res) => {

    await RQ.find({})
        .sort({ "codeRequisition": -1 })
        .limit(1)
        .exec(function(err, lastCode) {

            let maxCode = 0
            if (lastCode[0] === undefined) { //en caso de ser el primer codigo
                maxCode = 0
            } else [
                maxCode = lastCode[0].codeRequisition
            ]

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Ultimo Valor del Codigo de Requisitions",
                lastCode: maxCode
            })

            console.log(maxCode);
        });

    //const maxCode = await PO.find({}).sort({ codePurchaseOrder: -1 }).limit(1).then(codes => codes[0].codePurchaseOrder);
}

//funcion para crear nuevas Requisitions
const createRQ = async(req, res) => {

    const {
        codeRequisition,
        employeeId,
        dateRequisition,
        status,
        area_id,
        active
    } = req.body

    //creamos una instancia del objeto Requisitions
    newRequisitions = new RQ({
        codeRequisition,
        employeeId,
        dateRequisition,
        status,
        area_id,
        active
    })

    try {

        if (newRequisitions.save()) {

            //Orden de Compra creada exitosamente
            res.status(201).json({
                ok: true,
                msg: 'Nueva Requisitions Creada',
                newRequisitions
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: "Error creating Requisitions"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error catch creating Requisitions"
        })
    }

}

//funcion para la eliminacion de las ordenes de compras
const deleteRQ = async(req, res) => {

    let id = req.params.id
    await RQ.findByIdAndRemove(id, (err, requisitionsDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ninguna orden de compra a eliminar
        if (!requisitionsDB) {
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
            message: "Requisition Eliminada Exitosamente"
        })
    })
}

//funcion para modificar Ordenes de compra
const updateRQ = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body

        let updateRequisition = {
            codeRequisition: body.codeRequisition,
            employeeId: body.employeeId,
            dateRequisition: body.dateRequisition,
            status: body.status,
            area_id: body.area_id,
            active: body.active
        }

        //new : true retorna el nuevo valor actualizado
        await RQ.findByIdAndUpdate(id, updateRequisition, {
                new: true,
            },
            (err, requisitionDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico la bodega
                if (!requisitionDB) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                //en caso de que Si se actualizo la Orden de Compra
                res.status(200).json({
                    ok: true,
                    msj: "Requisition Actualizada Exitosamente",
                    RequisitionActualizada: requisitionDB,

                })

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Catch Actualizando Requisition"
        })
    }

}

module.exports = { createRQ, listRQ, deleteRQ, updateRQ, listRQByCode, lastCodeRQ }
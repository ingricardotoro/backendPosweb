const P = require('../models/purchase')
const PD = require('../models/purchaseDetails')
const Location = require('../models/location')
const Inventory = require('../models/inventory')

//funcion para listar todos las compras
const listP = async(req, res) => {

    await P.find({})
        .populate('area_id')
        .populate('employeeId')
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
            .populate('area_id')
            .populate('employeeId')
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
        area_id,
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
        area_id,
        employeeId,
        codeInvoice,
        datePurchase,
        typePaid,
        creditDays,
        balance,
        statusPurchase,
    })

    try {

        newPurchase.save()

        /**********************Registramos los datos de la compra en la tabla LOCATIONS */
        //Buscamos los productos en Detalles de orden
        await PD.find({ codePurchase })
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
                        msg: "NO HAY Detalles de Productos registrados con este Codigo de compra",
                        find: false
                    })
                }

                //recoremos cada producto de la tabla detalles de productos
                productsDetails.map((prod) => {

                    //guardamos informacion en la tabla de ubicaciones
                    try {

                        newLocation = new Location({
                            area_id: area_id,
                            purchase_id: newPurchase._id,
                            product_id: prod._id,
                            amount: prod.cuantityReceived,
                        })

                        newLocation.save()

                    } catch (error) {
                        res.status(500).json({
                            ok: true,
                            msg: 'Erro en Cath de Location',

                        })
                        console.log(error)
                    }

                })


            });

        //Registramos los datos en la tabla de Inventario
        RegistroDeInventario(codePurchase)

        //Orden de Compra creada exitosamente
        res.status(201).json({
            ok: true,
            msg: 'Nueva Compra Creada',
            newPurchase
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error catch creating Compra"
        })
    }

}



const RegistroDeInventario = async(codePurchase) => {

    /**********************Guardamos los datos en el inventario*/
    //Buscamos los productos en Detalles de orden
    await PD.find({ codePurchase })
        .exec(function(err, productsDetails) {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!productsDetails) {

                console.log("NO HAY Detalles de Productos registrados con este Codigo de compra")
            }


            productsDetails.map((prod) => {

                UpdateInventories(prod._id, prod.cuantityReceived)

            })

        });


}

const UpdateInventories = async(prodId, cuantityReceived) => {

    //confirmamos si el producto ya existe en el inventario
    await Inventory.find({ productId: prodId })
        .exec(function(err, registro) {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            //en caso de NO encontar este producto en el inventario
            if (registro[0] === undefined) {


                //guardamos informacion en la tabla de ubicaciones
                try {

                    newInventory = new Inventory({
                        productId: prodId,
                        valorInicial: parseFloat(cuantityReceived),
                        entradas: 0,
                        salidas: 0,
                        existencias: parseFloat(cuantityReceived),
                        reorden: 0,
                        minimo: 0,
                        maximo: 0
                    })

                    newInventory.save()

                } catch (error) {

                    console.log(error)
                }

            }
            //en caso de SI encontrar el producto
            else {

                //guardamos informacion en la tabla de ubicaciones
                try {

                    let updateInventary = {

                        entradas: parseFloat(registro[0].entradas) + parseFloat(cuantityReceived),
                        existencias: parseFloat(registro[0].existencias) + parseFloat(cuantityReceived),

                    }

                    Inventory.findByIdAndUpdate(registro[0]._id, updateInventary, {
                            new: true, //devuelve el objeto actualizado
                        },
                        (err, registerUpdatedDB) => {
                            //en caso de tener algun error en save()
                            if (err) {
                                console.log("ERRORASO" + err);

                            }

                            //evaluaremos si NO se modifico la Categoria
                            if (!registerUpdatedDB) {
                                console.log("Error En la modificacion")
                            }
                        }
                    )

                } catch (error) {

                    console.log(error)
                }
            }

        })

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
            area_id: body.area_id,
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
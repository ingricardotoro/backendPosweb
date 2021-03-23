const Inventory = require('../models/inventory')

//funcion para listar todos los registros del inventario
const listInventory = async(req, res) => {

    await Inventory.find({})
        .populate('productId')
        .populate('warehouseId')
        .exec(function(err, registros) {

            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de las registos del inventario",
                registros
            })

            console.log(registros);
        });

}

//funcion para crear un nuevo registro de inventario o para actualizar uno existente
const registerInventory = async(req, res) => {

    const {
        warehouseId,
        productId,
        cuantity
    } = req.body

    await Inventory.find({ productId })

    .exec(function(err, registro) {
        console.log(registro)
            //en caso de obtener un error en la Busqueda
        if (err) {
            return console.log("Error buscando ProductID=", err)
        }

        //verificamos si encontro un registro con este ID de producto
        if (registro.length === 0) {
            //en caso de ser la primera vez que se registra este producto
                newRegistro = new Inventory({
                warehouseId: warehouseId,
                productId: productId,
                valorInicial: parseFloat(cuantity),
                entradas: 0,
                salidas: 0,
                existencias: parseFloat(cuantity),
                reorden: 0
            })

            try {

                if (newRegistro.save()) {
                    console.log("Registro de Inventario Creado")
                    res.status(200).json({
                        ok: true,
                        msg: 'Registro Created',
                        newRegistro,
                    })
                } else {
                    console.log("Error Creando nuevo registro de Inventario")
                    res.status(500).json({
                        ok: false,
                        msg: 'Error creando nuevo Registro en inventario',
                    })
                }

            } catch (error) {
                console.log(error)
            }

        }

        //en caso de solo actualizar un producto existente
        else {

            try {

                let valorActualExistencias = parseFloat(registro[0].existencias)
                let nuevoValorExistencias = parseFloat(valorActualExistencias) + parseFloat(cuantity)

                let valorActualEntrada = parseFloat(registro[0].entradas)
                let nuevoValorEntrada = parseFloat(valorActualEntrada) + parseFloat(cuantity)

                //new : true retorna el nuevo valor actualizado
                Inventory.findByIdAndUpdate(registro[0]._id, {
                        existencias: parseFloat(nuevoValorExistencias),
                        entradas: parseFloat(nuevoValorEntrada)
                    }, {
                        new: true,
                    },
                    (err, registroInv) => {

                        //en caso de tener algun error en save()
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                err
                            })
                        }

                        //evaluaremos si NO se modifico el registro
                        if (!registroInv) {
                            return res.status(400).json({
                                ok: false,
                                err
                            })
                        }

                        res.status(200).json({
                            ok: true,
                            msj: "Registro Actualizado Exitosamente",
                            registroActualizado: registroInv,
                        })

                    })

            } catch (error) {

                res.status(500).json({
                    ok: false,
                    msj: "Error Cathc Actualizando Registro",

                })
            }


        }

    });


}

const findInventoryByProductId = async(req, res) => {

    let productId = req.params.productId
        //nameReg = new RegExp(name, "i"); //i es para ser INSENSITIVE 
    console.log(productId)
    await Inventory.find({ productId })
        .exec(function(err, registro) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            //verificamos si encontro una persona con estos datos
            if (registro.productId === null) {

                return res.status(400).json({
                    ok: false,
                    msg: "NO hay registro de inventario con estos datos",
                    Dato: productId
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Registro filtrado por productId",
                dato: productId,
                registro
            })

            console.log(registro);
        });



}

const findInventoryByWarehouseId = async(req, res) => {

    let warehouseId = req.params.warehouseId
        //nameReg = new RegExp(name, "i"); //i es para ser INSENSITIVE 

    await Inventory.find({ warehouseId })
        .exec(function(err, registro) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            //verificamos si encontro una persona con estos datos
            if (registro[0].warehouseId === null) {

                return res.status(400).json({
                    ok: false,
                    msg: "NO hay registros de inventario con estos datos",
                    Dato: warehouseId
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Registro filtrado por warehouseId",
                dato: warehouseId,
                registro
            })

            console.log(registro);
        });



}

//funcion para la eliminacion un registro de invetario
const deleteinventory = async(req, res) => {

    let id = req.params.id
    await Inventory.findByIdAndRemove(id, (err, registoDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ninguna bodega a eliminar
        if (!registoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })
        }

        //en caso que la registro ha sido eliminado
        res.status(200).json({
            ok: true,
            message: "Registro Eliminada Exitosamente"
        })
    })
}

module.exports = { registerInventory, listInventory, findInventoryByProductId, findInventoryByWarehouseId, deleteinventory }
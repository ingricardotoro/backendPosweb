const Person = require('../models/person')
const Warehouse = require('../models/warehouse')

//funcion para listar todos las Bodegas
const listWarehouse = async(req, res) => {

    await Warehouse.find({})
        //.populate('personid')
        .exec(function(err, bodegas) {

            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de las Bodegas Creadas",
                bodegas
            })

            console.log(bodegas);
        });

}

//funcion para listar todos las Bodegas filtradas por nombre
const listWarehouseByName = async(req, res) => {

    let name = req.params.name
    nameReg = new RegExp(name, "i"); //i es para ser INSENSITIVE 

    if (name) {

        await Warehouse.find({ warehouseName: nameReg })
            .exec(function(err, bodegas) {
                //en caso de obtener un error en la Busqueda
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //verificamos si encontro una persona con estos datos
                if (bodegas[0].warehouseName === null) {

                    return res.status(200).json({
                        ok: false,
                        msg: "NO hay Bodega con estos datos",
                        Dato: name
                    })
                }

                res.status(200).json({
                    ok: true,
                    msg: "Lista de bodegas filtradas por estos datos",
                    datos: name,
                    bodegas
                })

                console.log(bodegas);
            });
    }



}

//funcion para crear nuevas Bodegas
const createWarehouse = async(req, res) => {

    const {
        codeWarehouse,
        warehouseName,
        warehouseLocation,
        warehousePhone1,
        warehousePhone2,
        employeeId,
        details,
        active
    } = req.body

    //creamos una instancia del objeto Warehouse
    newWarehouse = new Warehouse({
        codeWarehouse,
        warehouseName,
        warehouseLocation,
        warehousePhone1,
        warehousePhone2,
        employeeId,
        details,
        active
    })

    try {

        if (newWarehouse.save()) {

            //Bodega creada exitosamente
            res.status(201).json({
                ok: true,
                msg: 'Nueva Bodega Creada',
                newWarehouse
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: "Error creating Bodega"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error catch creating Bodega"
        })
    }

}

//funcion para la eliminacion de las Bodegas
const deleteWarehouse = async(req, res) => {

    let id = req.params.id
    await Warehouse.findByIdAndRemove(id, (err, bodegaDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ninguna bodega a eliminar
        if (!bodegaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })
        }

        //en caso que la bodega ha sido eliminada
        res.status(200).json({
            ok: true,
            message: "Bodega Eliminada Exitosamente"
        })
    })
}

//funcion para modificar Bodegas
const updateWarehouse = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body

        //evitamos que identidad se puedan editar
        //if (body.identidad) { delete body.identidad }

        let updateWarehouse = {
            codeWarehouse: body.codeWarehouse,
            warehouseName: body.warehouseName,
            warehouseLocation: body.warehouseLocation,
            warehousePhone1: body.warehousePhone1,
            warehousePhone2: body.warehousePhone2,
            employeeId: body.employeeId,
            details: body.details,
            active: body.active,
        }

        //new : true retorna el nuevo valor actualizado
        await Warehouse.findByIdAndUpdate(id, updateWarehouse, {
                new: true,
            },
            (err, bodegaDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico la bodega
                if (!bodegaDB) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                //en caso de que Si se actualizo la bodega
                res.status(200).json({
                    ok: true,
                    msj: "Bodega Actualizada Exitosamente",
                    BodegaActualizada: bodegaDB,

                })

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Catch Actualizando Bodega"
        })
    }

}


module.exports = { createWarehouse, listWarehouse, deleteWarehouse, updateWarehouse, listWarehouseByName }
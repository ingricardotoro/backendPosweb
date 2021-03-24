const Person = require('../models/person')
const Area = require('../models/area')

//funcion para listar todos las areas
const listArea = async(req, res) => {

    await Area.find({})
        //.populate('personid')
        .exec(function(err, areas) {

            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de las Areas Creadas",
                areas
            })

            console.log(areas);
        });

}

//funcion para listar todos las areas filtradas por nombre
const listAreaByName = async(req, res) => {

    let name = req.params.name
    nameReg = new RegExp(name, "i"); //i es para ser INSENSITIVE 

    if (name) {

        await Area.find({ nameArea: nameReg })
            .exec(function(err, areas) {
                //en caso de obtener un error en la Busqueda
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //verificamos si encontro una persona con estos datos
                if (areas[0].nameArea === null) {

                    return res.status(200).json({
                        ok: false,
                        msg: "NO hay Areas con estos datos",
                        Dato: name
                    })
                }

                res.status(200).json({
                    ok: true,
                    msg: "Lista de Areas filtradas por estos datos",
                    datos: name,
                    areas
                })

                console.log(bodegas);
            });
    }


}

//funcion para crear nuevas areas
const createArea = async(req, res) => {

    const {
        index,
        parentCode,
        codeArea,
        nameArea,
        phone,
        employee_id,
        details,
        active
    } = req.body

    //creamos una instancia del objeto Warehouse
    newArea = new Area({
        index,
        parentCode,
        codeArea,
        nameArea,
        phone,
        employee_id,
        details,
        active
    })

    try {

        if (newArea.save()) {

            //Bodega creada exitosamente
            res.status(201).json({
                ok: true,
                msg: 'Nueva Area Creada',
                newArea
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: "Error creating new Area"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error catch creating Area"
        })
    }

}

//funcion para la eliminacion de las areas
const deleteArea = async(req, res) => {

    let id = req.params.id
    await Area.findByIdAndRemove(id, (err, areaDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ninguna area a eliminar
        if (!areaDB) {
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
            message: "Area Eliminada Exitosamente"
        })
    })
}

//funcion para modificar areas
const updateArea = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body

        //evitamos que identidad se puedan editar
        //if (body.identidad) { delete body.identidad }

        let updateArea = {
            parentCode: body.parentCode,
            codeArea: body.codeArea,
            nameArea: body.nameArea,
            phone: body.phone,
            employee_id: body.employee_id,
            details: body.details,
            active: body.active,
        }

        //new : true retorna el nuevo valor actualizado
        await Area.findByIdAndUpdate(id, updateArea, {
                new: true,
            },
            (err, areaDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico la bodega
                if (!areaDB) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                //en caso de que Si se actualizo la bodega
                res.status(200).json({
                    ok: true,
                    msj: "Area Actualizada Exitosamente",
                    AreaActualizada: areaDB,

                })

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Catch Actualizando Area"
        })
    }

}


module.exports = { createArea, listArea, deleteArea, updateArea, listAreaByName }
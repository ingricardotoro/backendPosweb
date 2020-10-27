const Person = require('../models/person')
const Supplier = require('../models/supplier')
    //const Contact = require('../models/contact')

//funcion para listar todos los Proveedores
const listSuppliers = async(req, res) => {

    await Supplier.find({})
        .populate('personid')
        .exec(function(err, suppliers) {

            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de Proveedores",
                suppliers
            })

            console.log(suppliers);
        });

}


//funcion para listar todos los Proveedores filtrados por nombre
const listSuppliersByName = async(req, res) => {

    let name = req.params.name
    nameReg = new RegExp(name, "i"); //i es para ser INSENSITIVE 

    if (name) {

        await Supplier.find({})
            .populate({
                path: 'personid',
                match: { name: nameReg },
            })
            .exec(function(err, suppliers) {

                //en caso de obtener un error en la Busqueda
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //verificamos si encontro una persona con estos datos
                if (suppliers[0].personid === null) {

                    return res.status(200).json({
                        ok: false,
                        msg: "NO hay Proveedores con estos datos",
                        Dato: name
                    })
                }

                res.status(200).json({
                    ok: true,
                    msg: "Lista de Proveedores filtrados por estos datos",
                    datos: name,
                    suppliers
                })

                console.log(suppliers);
            });
    }



}

//funcion para buscar los datos de persona por numero de identidad
const findByIdentidad = async(req, res) => {

    try {

        const identidad = req.params.identidad
        await Person.find({ identidad })
            .exec(function(err, person) {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                if (!person) {
                    res.status(400).json({
                        ok: true,
                        msg: "NO HAY PERSONA CON ESTA IDENTIDAD",
                        find: false
                    })
                }

                res.status(200).json({
                    ok: true,
                    msg: "Datos de la Persona",
                    find: true,
                    person
                })

            });

    } catch (error) {

        console.log(error);
        res.status(400).json({
            ok: true,
            msg: "Error Buscando Datos de Persona",
            find: false
        })
    }

}

//funcion para crear nuevos Proveedores
const createSupplier = async(req, res) => {

    const {
        personid,
        name,
        lastname,
        identidad,
        gender,
        rtn,
        fec_nac,
        phone1,
        phone2,
        email,
        country,
        city,
        location,
        website,
        facebook,
        twitter,
        linkedin,
        skype,
        codeSupplier,
        companyName,
        companyCity,
        companyLocation,
        companyPhone1,
        companyPhone2,
        companyRtn,
        companyWebsite,
        companyLogo,
        title,
        workPosition,
        active
    } = req.body

    //EN CASO DE SER UNA NUEVA PERSONA
    if (personid === -1) {

        try {
            //creamos una instancia del objeto Persona
            newPerson = new Person({
                name,
                lastname,
                identidad,
                gender,
                rtn,
                fec_nac,
                phone1,
                phone2,
                email,
                country,
                city,
                location,
                website,
                facebook,
                twitter,
                linkedin,
                skype,
            })

            //guardamos el usuario en la base de datos
            if (await newPerson.save()) {

                //creamos un objeto de la instancia Proveedor
                try {

                    newSupplier = new Supplier({
                        codeSupplier,
                        companyName,
                        companyCity,
                        companyLocation,
                        companyPhone1,
                        companyPhone2,
                        companyRtn,
                        companyWebsite,
                        companyLogo,
                        title,
                        workPosition,
                        active,
                        personid: newPerson._id,
                    })

                    if (newSupplier.save()) {

                        //Empleado creado exitosamente
                        res.status(201).json({
                            ok: true,
                            msg: 'Supplier Created',
                            newPerson,
                            newSupplier
                        })
                    }

                } catch (error) {
                    console.log(error)
                    res.status(500).json({
                        ok: false,
                        msg: "Error creating Supplier"
                    })
                }

            }

        } catch (error) {

            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Error creating Person"
            })
        }

    }

}

//funcion para la eliminacion de los Proveedores
const deleteSupplier = async(req, res) => {

    let id = req.params.id
    await Supplier.findByIdAndRemove(id, (err, supplierDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ningun proveedore a eliminar
        if (!supplierDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })
        }

        //en caso que la categoria ha sido eliminada
        res.status(200).json({
            ok: true,
            message: "Proveedor Eliminado Exitosamente"
        })
    })
}

//funcion para modificar Proveedor
const updateSupplier = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body
        const personid = body.personid

        //evitamos que identidad se puedan editar
        if (body.identidad) { delete body.identidad }

        let updateSupplier = {
            codeSupplier: body.codeSupplier,
            companyName: body.companyName,
            companyCity: body.companyCity,
            companyLocation: body.companyLocation,
            companyPhone1: body.companyPhone1,
            companyPhone2: body.companyPhone2,
            companyRtn: body.companyRtn,
            companyWebsite: body.companyWebsite,
            companyLogo: body.companyLogo,
            title: body.title
        }

        let updatePersona = {

            name: body.name,
            lastname: body.lastname,
            gender: body.gender,
            rtn: body.rtn,
            fec_nac: body.fec_nac,
            phone1: body.phone1,
            phone2: body.phone2,
            email: body.email,
            country: body.country,
            city: body.city,
            location: body.location,
            website: body.website,
            facebook: body.facebook,
            twitter: body.twitter,
            linkedin: body.linkedin,
            skype: body.skype
        }

        //new : true retorna el nuevo valor actualizado
        await Supplier.findByIdAndUpdate(id, updateSupplier, {
                new: true,
            },
            (err, supplierDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico el empleado
                if (!supplierDB) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                try {

                    Person.findByIdAndUpdate(personid, updatePersona, { new: true, },
                        (err, personDB) => {

                            //en caso de tener algun error en save()
                            if (err) {
                                return res.status(500).json({
                                    ok: false,
                                    err
                                })
                            }

                            //evaluaremos si NO se modifico el proveedor
                            if (!personDB) {
                                return res.status(400).json({
                                    ok: false,
                                    err
                                })
                            }

                            //en caso de que Si se actualizo el proveedor
                            res.status(200).json({
                                ok: true,
                                msj: "Proveedor Actualizado Exitosamente",
                                proveedorActualizado: supplierDB,
                                datosPersona: personDB
                            })
                        })

                } catch (error) {

                    console.log(error)
                    res.status(500).json({
                        ok: false,
                        msg: "Error creating Updating Persona de Proveedor"
                    })
                }

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Actualizando Proveedor"
        })
    }

}


module.exports = { createSupplier, listSuppliers, deleteSupplier, updateSupplier, listSuppliersByName }
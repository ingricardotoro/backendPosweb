const Person = require('../models/person')
const Customer = require('../models/customer')
    //const Contact = require('../models/contact')

//funcion para listar todos los clientes
const listCustomer = async(req, res) => {

    await Customer.find({})
        .populate('personid')
        .exec(function(err, customers) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de Clientes",
                customers
            })

            console.log(customers);
        });

}

//funcion para crear nuevos clientes
const createCustomer = async(req, res) => {

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
        codeCustomer,
        payIVA,
        creditLimit,
        levelPrice,
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

                //creamos un objeto de la instancia Customer
                try {

                    newCustomer = new Customer({
                        codeCustomer,
                        payIVA,
                        creditLimit,
                        levelPrice,
                        active,
                        personid: newPerson._id,
                    })

                    if (newCustomer.save()) {

                        //Cliente creado exitosamente
                        res.status(201).json({
                            ok: true,
                            msg: 'Cliente creado exitosamente',
                            newPerson,
                            newCustomer
                        })
                    }

                } catch (error) {
                    console.log(error)
                    res.status(500).json({
                        ok: false,
                        msg: "Error creating New Customer"
                    })
                }

            }

        } catch (error) {

            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Error creating New Person"
            })
        }

    } else {
        console.log("PersonId debe ser -1, POR AHORA");
        res.status(500).json({
            ok: false,
            msg: "PersonId debe ser -1, POR AHORA",
        })
    }

}

//funcion para la eliminacion de los clientes
const deleteCustomer = async(req, res) => {

    let id = req.params.id
    await Customer.findByIdAndRemove(id, (err, customerDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ningun cliente a eliminar
        if (!customerDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id del cliente no existe'
                }
            })
        }

        //en caso que el cliente ha sido eliminado
        res.status(200).json({
            ok: true,
            message: "Cliente Eliminado Exitosamente"
        })
    })
}

//funcion para modificar clientes
const updateCustomer = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body
        const personid = body.personid

        //evitamos que identidad se puedan editar

        if (body.identidad) { delete body.identidad }

        let updateCliente = {

            codeCustomer: body.codeCustomer,
            payIVA: body.payIVA,
            creditLimit: body.creditLimit,
            levelPrice: body.levelPrice,
            active: body.active
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
        await Customer.findByIdAndUpdate(id, updateCliente, {
                new: true, //devuelve el objeto actualizado
            },
            (err, customerDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    console.log("ERRORASO");
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico el cliente
                if (!customerDB) {
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }

                try {

                    Person.findByIdAndUpdate(personid, updatePersona, { new: true, runValidators: true },
                        (err, personDB) => {

                            //en caso de tener algun error en save()
                            if (err) {
                                res.status(500).json({
                                    ok: false,
                                    err
                                })
                            }

                            //evaluaremos si NO se modifico el empleado
                            if (!personDB) {
                                res.status(500).json({
                                    ok: false,
                                    err
                                })
                            }

                            //en caso de que Si se actualizo el empleado
                            res.status(200).json({
                                ok: true,
                                msj: "Cliente Actualizado Exitosamente",
                                clienteActualizado: customerDB,
                                datosPersona: personDB
                            })
                        })

                } catch (error) {

                    console.log(error)
                    res.status(500).json({
                        ok: false,
                        msg: "Error Actualizando Datos de Persona de Cliente"
                    })
                }

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Actualizando Cliente"
        })
    }

}

module.exports = { createCustomer, listCustomer, deleteCustomer, updateCustomer }
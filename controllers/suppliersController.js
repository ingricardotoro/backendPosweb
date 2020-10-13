const Person = require('../models/person')
const Supplier = require('../models/supplier')
    //const Contact = require('../models/contact')

//funcion para listar todos los empleados
const listSuppliers = async(req, res) => {

    Supplier.find({})
        .populate('personid')
        .exec(function(err, suppliers) {
            res.status(200).json({
                ok: true,
                msg: "Lista de Proveedores",
                suppliers
            })

            console.log(suppliers);
        });

}

//funcion para crear nuevos Empleados
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

module.exports = { createSupplier, listSuppliers }
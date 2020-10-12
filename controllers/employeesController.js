const Person = require('../models/person')
const Employee = require('../models/employee')
const Contact = require('../models/contact')

//funcion para listar todos los empleados
const listEmployee = async(req, res) => {

    Employee.find({})
        .populate({
            path: 'personid',
            populate: {
                path: 'contactid',
                model: 'Contact'
            }
        })
        .exec(function(err, employees) {
            res.status(200).json({
                ok: true,
                msg: "Lista de Empleados",
                employees
            })

            console.log(employees);
        });

}

//funcion para crear nuevos Empleados
const createEmployee = async(req, res) => {

    const {
        personid,
        contactid,
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
        codeEmployee,
        workLocation,
        workPosition,
        active
    } = req.body

    //EN CASO DE SER UNA NUEVA PERSONA
    if (personid === -1 && contactid === -1) {

        //creamos un objeto de la instancia Contact
        try {
            newContact = new Contact({
                //personid: newPerson._id,
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

            if (await newContact.save()) {

                try {
                    //creamos una instancia del objeto Persona
                    newPerson = new Person({
                        name,
                        lastname,
                        identidad,
                        gender,
                        rtn,
                        fec_nac,
                        contactid: newContact._id,
                    })

                    //guardamos el usuario en la base de datos
                    if (await newPerson.save()) {

                        //creamos un objeto de la instancia Employee
                        try {

                            newEmployee = new Employee({
                                codeEmployee,
                                workLocation,
                                workPosition,
                                active,
                                personid: newPerson._id,
                            })

                            if (newEmployee.save()) {

                                //Empleado creado exitosamente
                                res.status(201).json({
                                    ok: true,
                                    msg: 'Employee Created',
                                    newContact,
                                    newPerson,
                                    newEmployee
                                })
                            }

                        } catch (error) {
                            console.log(error)
                            res.status(500).json({
                                ok: false,
                                msg: "Error creating New Employee"
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

            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Error creating New Contact"
            })
        }

    } else {
        console.log("PersonId y ContactId debe ser -1, POR AHORA");
        res.status(500).json({
            ok: false,
            msg: "PersonId debe ser -1, POR AHORA",
        })
    }

}

module.exports = { createEmployee, listEmployee }
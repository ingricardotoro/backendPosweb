const Person = require('../models/person')
const Employee = require('../models/employee')
const Contact = require('../models/contact')

//funcion para listar todos los empleados
const listEmployee = async(req, res) => {

    /*await Employee.find().populate({
        path: 'personid',
        populate: {
            path: 'personid',
            model: 'Person',
            populate: {
                path: 'personid',
                model: 'Contact'
            }
        }})
    const employees = await Employee
        .find()
        .populate({
            path: 'personid',
            model: 'Person',
            populate: {
                path: 'personid',
                model: 'Contact'
            }
        })*/




    /*
        await Employee
            .find({})
            .populate({
                path: 'personid',
                model: 'Person'
            }).exec(function(err, employee) {

                console.log(employee);

                const empleados = Person.populate({
                    path: 'employee.personid',
                    model: 'Contact'
                })

                res.status(200).json({
                    ok: true,
                    msg: "Lista de Empleados",
                    empleados
                })

                console.log(empleados);

            });*/

    Employee.find().populate('personid')
        .exec(function(err, employees) {
            if (err) return res.json(400, err);
            console.log(employees);
            employees.map(employee => {
                const empleados = Contact.findOne({ personid: employee.personid })
                    .exec(function(err, contact) {

                        if (err) return res.json(400, err);

                        employee.personid.rtn = contact

                        console.log(employee.person);
                        res.status(200).json({
                            ok: true,
                            msg: "Lista de Empleados",
                            employee: employee,
                            contact: contact
                        })

                    })
            })



            /*employees.map(employee => {

                Contact.populate('people.personid')
                    .exe(function(err, contacts) {
                        if (err) return res.json(400, err);

                        //employee.people.personid = contact;

                        console.log(contacts[0]);
                        res.status(200).json({
                                ok: true,
                                msg: "Lista de Empleados",
                                employee: employee.people
                            })
                            //res.send(employee.people);
                    });
            })*/

        });

    /*await Employee.find({}).populate({
            path: 'personid',
            populate: {
                path: 'personid',
                model: 'Person',
                /*populate: {
                    path: 'personid',
                    model: 'Contact'
                }*/
    /* }
        }).populate({
            path: 'personid',
            populate: {
                path: 'personid',
                model: 'Contact',
            }
        })
        .exec(function(err, employees) {

            res.status(200).json({
                ok: true,
                msg: "Lista de Empleados",
                employees
            })

            console.log(employees);
        });*/

    /*await Employee.find().populate('personid').exec(function(err, employees) {

        res.status(200).json({
            ok: true,
            msg: "Lista de Empleados",
            employees
        })

        console.log(employees);
    });*/

}

//funcion para crear nuevos Empleados
const createEmployee = async(req, res) => {

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
        codeEmployee,
        workLocation,
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
                fec_nac
            })

            //guardamos el usuario en la base de datos
            if (await newPerson.save()) {

                //creamos un objeto de la instancia Contact
                try {
                    newContact = new Contact({
                        personid: newPerson._id,
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

                        //creamos un objeto de la instancia Employee
                        try {

                            newEmployee = new Employee({
                                personid: newPerson._id,
                                codeEmployee,
                                workLocation,
                                workPosition,
                                active
                            })

                            if (newEmployee.save()) {

                                //Empleado creado exitosamente
                                res.status(201).json({
                                    ok: true,
                                    msg: 'Employee Created',
                                    newPerson,
                                    newContact,
                                    newEmployee
                                })
                            }

                        } catch (error) {
                            console.log(error)
                            res.status(500).json({
                                ok: false,
                                msg: "Error creating Employee"
                            })
                        }
                    }
                } catch (error) {
                    console.log(error)
                    res.status(500).json({
                        ok: false,
                        msg: "Error creating Contact"
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
    } else {
        console.log("PersonId debe ser -1, POR AHORA");
        res.status(500).json({
            ok: false,
            msg: "PersonId debe ser -1, POR AHORA",
        })
    }

}

module.exports = { createEmployee, listEmployee }
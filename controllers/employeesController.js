const Person = require('../models/person')
const Employee = require('../models/employee')
    //const Contact = require('../models/contact')

//funcion para listar todos los empleados
const listEmployee = async(req, res) => {

    await Employee.find({})
        .populate('personid')
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

    } else {
        console.log("PersonId debe ser -1, POR AHORA");
        res.status(500).json({
            ok: false,
            msg: "PersonId debe ser -1, POR AHORA",
        })
    }

}

//funcion para la eliminacion de los empleados
const deleteEmployee = async(req, res) => {

    let id = req.params.id
    await Employee.findByIdAndRemove(id, (err, empleadoDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ningun empleado a eliminar
        if (!empleadoDB) {
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
            message: "Empleado Eliminado Exitosamente"
        })
    })
}

//funcion para modificar Empleado
const updateEmployee = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body
        const personid = body.personid

        //evitamos que identidad se puedan editar

        if (body.identidad) { delete body.identidad }

        let updateEmpleado = {

            codeEmployee: body.codeEmployee,
            workLocation: body.workLocation,
            workPosition: body.workPosition,
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
        await Employee.findByIdAndUpdate(id, updateEmpleado, {
                new: true, //devuelve el objeto actualizado
            },
            (err, employeeDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    console.log("ERRORASO");
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico el empleado
                if (!employeeDB) {
                    res.status(400).json({
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
                                res.status(400).json({
                                    ok: false,
                                    err
                                })
                            }

                            //en caso de que Si se actualizo el empleado
                            res.status(200).json({
                                ok: true,
                                msj: "Empleado Actualizado Exitosamente",
                                empleadoActualizado: employeeDB,
                                datosPersona: personDB
                            })
                        })

                } catch (error) {

                    console.log(error)
                    res.status(500).json({
                        ok: false,
                        msg: "Error Actualizando Datos de Persona de Empleado"
                    })
                }

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Actualizando Empleado"
        })
    }

}

module.exports = { createEmployee, listEmployee, deleteEmployee, updateEmployee }
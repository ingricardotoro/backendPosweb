const Person = require('../models/person')


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

//funcion para buscar los datos de persona por nombre
const findByName = async(req, res) => {

    let name = req.params.name

    if (name) {

        try {

            nameReg = new RegExp(name, "i"); //i es para ser INSENSITIVE

            await Person.find({ name: nameReg })
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
                            msg: "NO HAY PERSONA CON ESTOS DATOS",
                            datos: name,
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
                msg: "Error Buscando Datos de Persona con estos datos",
                Datos: name,
                find: false,

            })
        }

    } else {
        res.status(200).json({
            ok: true,
            msg: "La variable name en el URL es Obligatoria",
        })

        console.log("La variable name en el URL es Obligatoria");

    }

}

module.exports = { findByIdentidad, findByName }
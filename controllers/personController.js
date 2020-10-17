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

module.exports = { findByIdentidad }
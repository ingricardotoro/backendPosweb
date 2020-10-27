const bcrypt = require('bcrypt')

const User = require('../models/user')

//funcion para listar todos los empleados
const listUsers = async(req, res) => {

    await User.
    find().
    populate({
            path: 'employeeid',
            populate: { path: 'personid' }
        })
        .exec(function(err, users) {

            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de Usuarios-Empleados-Personas",
                users
            })

            console.log(users);
        });
}

//funcion para crear nuevos usuario
const createUser = async(req, res) => {

    const { username, password } = req.body
    try {

        //verificamos que el username no exista
        let user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({
                ok: false,
                msj: "Username ya Existe"
            })
        }

        //creamos una instancia del objeto
        newUser = new User(req.body)

        //encriptamos el password
        const salt = bcrypt.genSaltSync() // 10 by default
        newUser.password = bcrypt.hashSync(password, salt)

        //guardamos el usuario en la base de datos
        await newUser.save()

        //usuario creado exitosamente
        res.status(201).json({
            ok: true,
            msg: 'User Creado Exitosamente'
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creando Nuevo Usuario"
        })
    }

}

//Funcion para Eliminar Usuarios
const deleteUser = async(req, res) => {

    let id = req.params.id
    await User.findByIdAndRemove(id, (err, userDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ningun empleado a eliminar
        if (!userDB) {
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
            message: "Usuario Eliminado Exitosamente"
        })
    })

}

module.exports = { createUser, listUsers, deleteUser }
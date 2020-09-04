const bcrypt = require('bcrypt')

const User = require('../models/user')

//funcion para listar todos los empleados
const listUsers = async(req, res) => {

    const users = await User.find({})

    res.status(200).json({
        ok: true,
        msg: "Lista de usuarios",
        users
    })
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
                msj: "Username already exist"
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
            msg: 'User Created'
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creating User"
        })
    }

}

module.exports = { createUser, listUsers }
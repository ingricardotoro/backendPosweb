const bcrypt = require('bcrypt')
const User = require('../models/user')
const { generarJwt } = require('../helpers/jwt')

//funcion para hacer login y devolver el token y datos del usuario
const loginUser = async(req, res) => {

    const { username, password } = req.body

    try {
        //verificamos si el usuario existe
        const userDB = await User.findOne({ username })
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msj: 'User o Password Incorrect'
            })
        }

        //verificamos el password
        const validPassword = bcrypt.compareSync(password, userDB.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msj: 'User o Password Incorrect'
            })
        }

        //verifica si el usuario esta activo
        if (!userDB.active) {
            return res.status(400).json({
                ok: false,
                msj: 'User is not Active'
            })
        }

        //creamos el token de autenticacion
        const token = await generarJwt(userDB.id, userDB.fullname)

        //enviamos el token y los datos del usuario
        res.status(200).json({
            ok: true,
            msj: 'Bienvenido',
            userDB,
            token
        })

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msj: 'Error in authentication'
        })
    }
}


module.exports = { loginUser }
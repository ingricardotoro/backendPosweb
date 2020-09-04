const jwt = require('jsonwebtoken')

const { response } = require('express')

require('../config/config')

const validarJwt = (req, res = response, next) => {

    //obtenermos el token de los header
    const token = req.header('x-token')

    //verificamos que el token exista
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "There is no Token in Request"
        })
    }

    //validar Token
    try {

        //obtenemos los datos del token (id y fullnanme)
        //const {payload} esta es otra opcion
        const { uid, fullname } = jwt.verify(token, process.env.SECRET_JWT)

        //actualizamos los valos que llegaran al controlador
        req.uid = uid
        req.fullname = fullname

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token is not valid"
        })
    }

    next()
}

module.exports = { validarJwt }
const jwt = require('jsonwebtoken')

require('../config/config')

const generarJwt = (uid, fullname) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, fullname }

        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el Token')
            }

            resolve(token)
        })

    })
}

module.exports = { generarJwt }
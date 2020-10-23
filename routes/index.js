const express = require('express')
const app = express()

//Ruta para la gestion de Personas
app.use('/api/person', require('./person'))

//Ruta para la authenticacion
app.use('/api/auth', require('./auth'))

//Ruta para la gestion de usuario
app.use('/api/users', require('./user'))

//Ruta para la gestion de empleados
app.use('/api/employees', require('./employees'))

//Ruta para la gestion de proveedores
app.use('/api/suppliers', require('./suppliers'))

//Ruta para la gestion de Clientes
app.use('/api/customers', require('./customers'))



module.exports = app
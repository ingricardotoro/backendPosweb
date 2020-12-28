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

//Ruta para la gestion de Categorias
app.use('/api/categories', require('./categories'))

//Ruta para la gestion de Productos
app.use('/api/products', require('./products'))

//Ruta para la gestion de Bodegas
app.use('/api/warehouses', require('./warehouses'))

//Ruta para la gestion de nuevos productos a las ordenes de compras
app.use('/api/purchase_order_details', require('./purchaseorderdetails'))

//Ruta para la gestionar las ordenes de compras
app.use('/api/purchase_orden', require('./purchaseorderdetails'))



module.exports = app
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
app.use('/api/purchases_orders', require('./purchasesOrders'))

//Ruta para la gestionar las compras
app.use('/api/purchases', require('./purchases'))

//Ruta para la gestionar los productos  de compras
app.use('/api/purchases_details', require('./purchasesdetails'))

//Ruta para la gestionar el control de inventario
app.use('/api/inventory', require('./inventory'))


module.exports = app
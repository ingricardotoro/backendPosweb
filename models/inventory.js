const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const inventorySchema = Schema({

    warehouseId: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: [true, 'El id de la bodega es obligatorio'],
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El id del Producto es obligatorio'],
    },
    valorInicial: {
        type: Number,
        //required: [true, 'El valor inicial del producto es obligatorio'],
    },
    entradas: {
        type: Number,
    },
    salidas: {
        type: Number,
    },
    existencias: {
        type: Number,
        //required: [true, 'La cantidad en existencia es obligatorio']
    },
    reorden: {
        type: Number,
        //required: [true, 'La valor de reorden es obligatorio']
    },



}, { timestamps: true })

inventorySchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Inventory', inventorySchema)
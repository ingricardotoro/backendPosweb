const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const inventorySchema = Schema({

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El id del Producto es obligatorio'],
    },
    valorInicial: {
        type: Number,
        required: [true, 'La cantidad de producto inicial es obligatorio'],
    },
    entradas: {
        type: Number,
    },
    salidas: {
        type: Number,
    },
    existencias: {
        type: Number,
        required: [true, 'La cantidad en existencia es obligatorio']
    },
    reorden: {
        type: Number,
    },
    minimo: {
        type: Number,
    },
    maximo: {
        type: Number,
        //required: [true, 'La cantidad en existencia es obligatorio']
    },

    /*purchaseId: {
        type: Schema.Types.ObjectId,
        ref: 'Purchase',
        required: [true, 'El id de la compra es obligatorio'],
    },*/
    /*warehouseId: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: [true, 'El id de la bodega es obligatorio'],
    },*/

    /*cuantityRequered: {
        type: Number,
        //required: [true, 'La cantidad de producto solicitado es obligatorio'],
    },

    cuantityReceived: {
        type: Number,
        required: [true, 'La cantidad de producto recibida es obligatorio'],
    },

    lote: {
        type: String,
    },

    dateExpiration: {
        type: Date,
        //required: [true, 'La fecha de la orden de compra es obligatorio'],
    },

    dateToSale: {
        type: Date,
        //required: [true, 'La fecha de la orden de compra es obligatorio'],
    },

    cost: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio'],
    },

    tax: {
        type: Number,
        required: [true, 'El impuesto es obligatorio'],
    },

    discount: {
        type: Number,
        required: [true, 'El Descuento es obligatorio'],
    },

    detail: {
        type: String,
    },*/

}, { timestamps: true })

inventorySchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Inventory', inventorySchema)
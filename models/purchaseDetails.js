const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const purchaseDetailsSchema = Schema({

    purchaseId: {
        type: Schema.Types.ObjectId,
        ref: 'Purchase',
        required: [true, 'El id de la compra es obligatorio'],
    },

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El id del Producto es obligatorio'],
    },
    cuantityRequered: {
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
    },


}, { timestamps: true })

purchaseDetailsSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('PurchaseDetail', purchaseDetailsSchema)
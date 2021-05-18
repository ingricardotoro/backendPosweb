const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const requisitionsDetailsSchema = Schema({

    requisitionId: {
        type: Schema.Types.ObjectId,
        ref: 'Requisition',
        required: [true, 'El id de la orden de compra es obligatorio'],
    },

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El id del Producto es obligatorio'],
    },
    cuantity: {
        type: Number,
        required: [true, 'La cantidad de producto es obligatorio'],
    },

}, { timestamps: true })

requisitionsDetailsSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('RequisitionDetails', requisitionsDetailsSchema)
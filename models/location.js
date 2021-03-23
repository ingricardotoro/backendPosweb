const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const locationSchema = Schema({

    area_id: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: [true, 'El id del area es obligatoria']
    },
    purchase_id: {
        type: Schema.Types.ObjectId,
        ref: 'Purchase',
        required: [true, 'El id de la compra es obligatoria']
    },

    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El id del producto es obligatorio']
    },
    amount: {
        type: Number,
        required: [true, 'La cantidad de producto es obligatorio'],
    },
    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true })

locationSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Location', locationSchema)
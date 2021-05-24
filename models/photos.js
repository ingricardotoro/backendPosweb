const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const photoSchema = Schema({

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El id del producto es obligatorio'],
    },

    src: {
        type: String,
        trim: true,
        required: [true, 'El codigo de la categoria es obligatorio'],
    },
    name: {
        type: String,
        trim: true,

    },
    descripcion: {
        type: String,
        trim: true
    },

    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true })

photoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Photo', photoSchema)
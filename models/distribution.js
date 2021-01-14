const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const distributionSchema = Schema({

    warehouseId: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: [true, 'El id de la Bodega es obligatorio'],
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El id del Producto es obligatorio'],
    },
    cuantity: {
        type: Number,
        required: [true, 'El valor a distribuir es obligatorio'],
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'El parentId es obligatorio, default 0'],
        unique: true

    },
    descripcion: {
        type: String,
        trim: true
    },
    parentId: {
        type: Number,
        required: [true, 'El parentId es obligatorio, default 0'],
        default: 0

    },
    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true })

distributionSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Distribution', distributionSchema)
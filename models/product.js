const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = Schema({

    codeProduct: {
        type: String,
        trim: true,
        required: [true, 'El codigo del producto es obligatorio'],
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre del producto es obligatorio'],
    },
    description: {
        type: String,
        trim: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'El id de la categoria es obligatorio'],
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: [true, 'El id del proveedor es obligatorio'],
    },
    price1: {
        type: Number,
        required: [true, 'El precio1 del producto es obligatorio'],
    },
    price2: {
        type: Number,
    },
    price3: {
        type: Number,
    },
    price4: {
        type: Number,
    },
    inStock: {
        type: Number,
    },
    cost: {
        type: Number,
    },
    brand: {
        type: String,
        trim: true,
    },
    serie: {
        type: String,
        trim: true,
    },
    color: {
        type: String,
        trim: true,
    },
    year: {
        type: String,
    },
    weight: {
        type: String,
    },
    size: {
        type: String,
    },
    minCount: {
        type: Number,
    },
    expiredDate: {
        type: Date,
    },
    expiredSaleDate: {
        type: Date,
    },
    isConsumible: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true })

productSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Product', productSchema)
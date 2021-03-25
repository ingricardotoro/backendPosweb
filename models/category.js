const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = Schema({
    index: {
        type: Number,
        required: [true, 'El index de categoria es obligatorio'],
        unique: true,
    },
    parentId: {
        type: Number,
        required: [true, 'El parentId es obligatorio, default 0'],
        default: 0
    },
    codeCategory: {
        type: String,
        trim: true,
        required: [true, 'El codigo de la categoria es obligatorio'],

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

    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true })

categorySchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Category', categorySchema)
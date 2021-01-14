const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const locationSchema = Schema({
    codeLocation: {
        type: String,
        trim: true,
        required: [true, 'El codigo de la ubicacion es obligatorio'],
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'El parentId es obligatorio, default 0'],
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

locationSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Location', locationSchema)
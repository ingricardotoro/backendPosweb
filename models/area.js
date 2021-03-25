const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const areasSchema = Schema({

    index: {
        type: Number,
        required: [true, 'El index del Area Padre es obligatorio'],
        unique: true,
    },
    parentCode: {
        type: Number,
        required: [true, 'El id del Area Padre es obligatorio'],
        default: 0,
    },
    codeArea: {
        type: String,
        unique: true,
        required: [true, 'El código de la bodega es obligatorio']
    },
    nameArea: {
        type: String,
        trim: true,
        required: [true, 'El nombre de la bodega es obligatorio'],
    },

    phone: {
        type: String,
        trim: true,
    },

    employee_id: { type: String, ref: 'Employee', required: [false] },

    details: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

areasSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Area', areasSchema)
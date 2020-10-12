const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const employeeSchema = Schema({

    personid: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'El id de la persona es obligatorio'],
    },
    codeEmployee: {
        type: String,
        trim: true,
        required: [true, 'El codigo del empleado es obligatorio'],
        unique: true
    },
    workLocation: {
        type: String,
        trim: true,
    },
    workPosition: {
        type: String,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

employeeSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Employee', employeeSchema)
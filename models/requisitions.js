const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const requisitionsSchema = Schema({

    codeRequisition: {
        type: Number,
        unique: true,
        required: [true, 'El código de la Compra es obligatorio']
    },

    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'El id del Empleado es obligatorio'],
    },
    dateRequisition: {
        type: Date,
        required: [true, 'La fecha de la orden de compra es obligatorio'],
    },
    status: {
        type: String,
        required: [true, 'El Status de la orden es obligatorio'],
    },
    area_id: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: [true, 'El id del area Destino es obligatorio'],
    },
    active: {
        type: Boolean,
        default: true
    }


}, { timestamps: true })

requisitionsSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Requisition', requisitionsSchema)
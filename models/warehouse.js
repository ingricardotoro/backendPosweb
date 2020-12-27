const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const warehouseSchema = Schema({

    codeWarehouse: {
        type: String,
        unique: true,
        required: [true, 'El código de la bodega es obligatorio']
    },
    warehouseName: {
        type: String,
        trim: true,
        required: [true, 'El nombre de la bodega es obligatorio'],
    },
    warehouseLocation: {
        type: String,
        trim: true,
    },
    warehousePhone1: {
        type: String,
        trim: true,
    },
    warehousePhone2: {
        type: String,
        trim: true,
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'El id del Empleado Responsable es obligatorio'],
    },
    details: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

warehouseSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Warehouse', warehouseSchema)
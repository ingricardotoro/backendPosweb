const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const purchaseSchema = Schema({

    purchaseOrderId: {
        type: Schema.Types.ObjectId,
        ref: 'PurchaseOrder',
        required: [true, 'El id de la orden de compra es obligatorio'],
    },

    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'El id del Empleado es obligatorio'],
    },

    datePurchase: {
        type: Date,
        required: [true, 'La fecha de la compra es obligatorio'],
    },

    typePaid: {
        type: String,
        required: [true, 'El Tipo de Pago de la orden es obligatorio'],
    },

    creditDays: {
        type: Number,
        required: [true, 'Los dias de credito de Pago de la compra es obligatorio'],
    },

    Balance: {
        type: Number,
        required: [true, 'El salde de credito de Pago de la compra es obligatorio'],
    },

    entered: {
        type: Boolean,
        default: false
    },

    invoice: {
        type: Number
    },


}, { timestamps: true })

purchaseSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Purchase', purchaseSchema)
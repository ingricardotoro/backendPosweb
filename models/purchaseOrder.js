const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const purchaseOrderSchema = Schema({

    codePurchaseOrder: {
        type: Number,
        unique: true,
        required: [true, 'El código de la Compra es obligatorio']
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: [true, 'El id del proveedor es obligatorio'],
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'El id del Empleado es obligatorio'],
    },
    datePurchaseOrder: {
        type: Date,
        required: [true, 'La fecha de la orden de compra es obligatorio'],
    },
    total: {
        type: Number,
        required: [true, 'Es obligatorio saber el total de la orden'],
    },
    status: {
        type: String,
        required: [true, 'El Status de la orden es obligatorio'],
    },
    typePaid: {
        type: String,
        required: [true, 'El Tipo de Pago de la orden es obligatorio'],
    },

    typeShip: {
        type: String,
        required: [true, 'El Tipo del envio de la orden de compra es obligatorio'],
    },
    dateShip: {
        type: String,
        required: [true, 'La fecha del envio de la orden de compra es obligatorio'],
    },
    costShip: {
        type: Number,
        required: [true, 'El costo del envio de la orden de compra es obligatorio'],
    },
    warehouseId: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: [true, 'El id de la bode Destino es obligatorio'],
    },
    details: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    }


}, { timestamps: true })

purchaseOrderSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('PurchaseOrder', purchaseOrderSchema)
const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const purchaseOrderDetailsSchema = Schema({

    purchaseOrderId: {
        type: Schema.Types.ObjectId,
        ref: 'PurchaseOrder',
        required: [true, 'El id de la orden de compra es obligatorio'],
    },

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El id del Producto es obligatorio'],
    },
    cuantity: {
        type: Number,
        required: [true, 'La cantidad de producto es obligatorio'],
    },
    cost: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio'],
    },
    tax: {
        type: Number,
        required: [true, 'El teléfono es obligatorio'],
    },
    discount: {
        type: Number,
        required: [true, 'El Descuento es obligatorio'],
    },


}, { timestamps: true })

purchaseOrderDetailsSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('PurchaseOrderDetail', purchaseOrderDetailsSchema)
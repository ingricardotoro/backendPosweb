const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = Schema({

    personid: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'El id de la persona es obligatorio'],
    },
    codeCustomer: {
        type: String,
        trim: true,
        required: [true, 'El codigo del cliente es obligatorio'],
        unique: true
    },
    payIVA: {
        type: Boolean,
        default: true
    },
    creditLimit: {
        type: Number,
        default: true
    },
    levelPrice: {
        type: String,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true })

customerSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Customer', customerSchema)
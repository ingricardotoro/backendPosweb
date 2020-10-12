const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const supplierSchema = Schema({

    personid: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'El id de la persona es obligatorio']
    },
    codeSupplier: {
        type: String,
        unique: true,
        required: [true, 'El código del proveedor es obligatorio']
    },
    companyName: {
        type: String,
        trim: true,
        required: [true, 'El nombre de la empresa es obligatorio'],
    },
    companyLocation: {
        type: String,
        trim: true,
    },
    companyPhone1: {
        type: String,
        trim: true,
        required: [true, 'El teléfono es obligatorio'],
    },
    companyPhone2: {
        type: String,
        trim: true,
    },
    companyRtn: {
        type: String,
        trim: true,
    },
    companyWebsite: {
        type: String,
        trim: true,
    },
    companyLogo: {
        type: String,
        trim: true,
    },
    title: {
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

supplierSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Supplier', supplierSchema)
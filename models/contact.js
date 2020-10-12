const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const contactSchema = Schema({

    phone1: {
        type: String,
        trim: true,
        required: [true, 'El id de la persona es obligatorio'],
    },
    phone2: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    facebook: {
        type: String,
        trim: true,
    },
    twitter: {
        type: String,
        trim: true,
    },
    linkedin: {
        type: String,
        trim: true,
    },
    skype: {
        type: String,
        trim: true,
    },

}, { timestamps: true })

contactSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Contact', contactSchema)
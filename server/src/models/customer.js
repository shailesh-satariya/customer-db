const mongoose = require('mongoose');
const joi = require('joi');

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    birthDate: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

customerSchema.statics.validate = function (customer) {
    const schema = joi.object({
        firstname: joi.string()
            .min(2)
            .max(50)
            .required(),
        lastname: joi.string()
            .min(2)
            .max(50)
            .required(),
        birthDate: joi.date()
            .required(),
        date: joi.date(),
        userId: joi.string()
            .required(),
    });

    return schema.validate(customer);
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

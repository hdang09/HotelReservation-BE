const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        roomNumber: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'Reserved',
        },
        fullname: {
            type: String,
            required: true,
            default: 'Anonymous',
        },
        checkIn: {
            type: Date,
            required: true,
        },
        checkOut: {
            type: Date,
            required: true,
        },
        idCard: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        services: {
            type: Object,
            required: false,
        },
        email: {
            type: String,
            // required: false,
        },
        price: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);

const mongoose = require('mongoose');
// this is for the saving of Food data in mongo db
const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    trending: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    oldPrice: {
        type: String,
        required: true,
    },
    newPrice: {
        type: String,
        required: true,
    },
    status: {// Change 'Status' to 'status' to match the form field
        type: String,
        required: true,
        enum: ['Available', 'Not Available'], // Only these values are allowed
        default: 'Available', // Default to 'Available'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;

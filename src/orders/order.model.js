const mongoose = require('mongoose');
// database in mongodb morelikely the Structure for storing
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        city: {
            type:String,
            required: true,
        }
    },
    phone:{
        type:Number,
        required: true,
    },
    foodIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
    }],
    totalPrice:{
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        default: 0,
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        default: 0,
    },
    category: {
        type: String,
        required: [true, 'Please enter product category'],
    },

}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
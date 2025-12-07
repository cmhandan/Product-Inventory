const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    brand : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required : true,
        min: 1
    },
    inStock : {
        type: Boolean,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now()
    }
})

// #TODO: think about adding validator for the price and the name
const Product = mongoose.model('Products', productSchema);

module.exports = {
    Product
}
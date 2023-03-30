const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'product name must be provided']

    },
    price: {
        type: Number,
        require: [true, 'product number must be provided']
    },
    feature: {
        type: Boolean,
        default: false,

    },
    rating: {
        type: Number,
        defaule: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
        }

        //enum:['ikea', 'liddy', 'caressa', 'marcos'],

    }
})

module.exports = mongoose.model('product', productSchema)
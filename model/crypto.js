const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
    coin: {
        type: String,
        required: true,
        enum: ['bitcoin', 'matic-network', 'ethereum'],
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    change24h: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Crypto = mongoose.model('Crypto', CryptoSchema);
module.exports = Crypto;
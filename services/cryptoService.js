const axios = require('axios');
const Crypto = require('../model/crypto');
const dotenv = require("dotenv")
dotenv.config()


const COINGECKO_URL = process.env.COINGECKO_URL;
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoPrices = async () => {
    try {
        const response = await axios.get(COINGECKO_URL, {
            params: {
                ids: COINS.join(','),
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change: true
            }
        });

        const updates = [];
        for (const [coin, data] of Object.entries(response.data)) {
            updates.push(
                Crypto.create({
                    coin,
                    price: data.usd,
                    marketCap: data.usd_market_cap,
                    change24h: data.usd_24h_change
                })
            );
        }

        await Promise.all(updates);
        console.log('Crypto prices updated successfully');
    } catch (error) {
        console.error('Error updating crypto prices:', error.message);
    }
};

module.exports = { fetchCryptoPrices };
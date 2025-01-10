const Crypto = require('../model/crypto');

exports.getStats = async (req, res) => {
    try {
        const { coin } = req.query;

        if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid coin parameter'
            });
        }

        const latestData = await Crypto.findOne({ coin }).sort({ createdAt: -1 });

        if (!latestData) {
            return res.status(404).json({
                success: false,
                message: 'No data found for the specified coin'
            });
        }

        return res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


const calculateStandardDeviation = (numbers) => {
    const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
    const squareDiffs = numbers.map(value => Math.pow(value - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((acc, val) => acc + val, 0) / numbers.length;
    return Math.sqrt(avgSquareDiff);
};

exports.getDeviation = async (req, res) => {
    try {
        const { coin } = req.query;

        if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid coin parameter'
            });
        }

        const records = await Crypto.find({ coin })
            .sort({ createdAt: -1 })
            .limit(100)
            .select('price');

        if (!records.length) {
            return res.status(404).json({
                success: false,
                message: 'No data found for the specified coin'
            });
        }

        const prices = records.map(record => record.price);
        const deviation = calculateStandardDeviation(prices);

        return res.json({
            deviation: Number(deviation.toFixed(2))
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

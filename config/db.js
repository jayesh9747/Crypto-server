const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const MONGODB_URL = process.env.MONGODB_URL;


exports.connect = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log(`DB Connection Successful`);
    } catch (err) {
        console.log(`DB Connection Failed`);
        console.log(err);
        process.exit(1);
    }
}
// Importing necessary modules and packages
const express = require("express")
const app = express()
const cron = require('node-cron');
const database = require("./config/db")
const dotenv = require("dotenv")
const cryptoRoutes = require('./routes/cryptoRoutes');
const { fetchCryptoPrices } = require('./services/cryptoService');

// Setting up port number
const PORT = process.env.PORT || 4000

// Loading environment variables from .env file
dotenv.config()

// Connecting to database
database.connect()
const cookieParser = require("cookie-parser")
const cors = require("cors") //backend should entertain frontend's request 


const allowedOrigins = [
    process.env.DEVCLIENT,
];


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

for (i in allowedOrigins) {
    console.log('Allowed Origin:', allowedOrigins[i]);
}


app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    console.log(`Query: ${JSON.stringify(req.query)}`);

    // Capture the response before sending it
    const originalSend = res.send;
    res.send = function (body) {
        console.log(`Response: ${body}`);
        res.send = originalSend; // Reset to the original 'send' method
        return res.send(body); // Actually send the response
    };

    next(); // Move to the next middleware
});


cron.schedule('0 */2 * * *', () => {
    console.log('Running crypto price update job');
    fetchCryptoPrices();
});


app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running",
    })
})

fetchCryptoPrices();
app.use('/api', cryptoRoutes);


// Listening to the server
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`)
})
// End of code.
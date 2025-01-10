# Cryptocurrency Price Tracker

A Node.js application that tracks prices, market caps, and 24-hour changes for Bitcoin, Ethereum, and Matic using the CoinGecko API. The application features automated price updates and statistical analysis endpoints.

## Features

- Automated cryptocurrency price tracking every 2 hours
- Real-time price, market cap, and 24-hour change data
- Standard deviation calculation for historical prices
- MongoDB integration for data persistence
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/crypto-tracker
```

4. Start MongoDB service on your machine

5. Run the application:
```bash
npm start
```

## Project Structure

```
crypto-tracker/
├── models/
│   └── crypto.js
├── config/
│   └── db.js
├── services/
│   └── cryptoService.js
├── controllers/
│   └── cryptoController.js
├── routes/
│   └── cryptoRoutes.js
├── app.js
└── package.json

```

## API Endpoints

### Get Latest Cryptocurrency Stats
```http
GET /api/stats?coin={coinId}
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `coin` | `string` | **Required**. Coin identifier (bitcoin, ethereum, or matic-network) |

#### Response
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### Get Price Standard Deviation
```http
GET /api/deviation?coin={coinId}
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `coin` | `string` | **Required**. Coin identifier (bitcoin, ethereum, or matic-network) |

#### Response
```json
{
    "deviation": 4082.48
}
```

## Background Jobs

The application runs a scheduled job every 2 hours to fetch the latest cryptocurrency data from CoinGecko. This data is stored in MongoDB for historical analysis.

## Error Handling

The API includes comprehensive error handling for:
- Invalid coin parameters
- Missing data
- API failures
- Database connection issues

## Testing

To run the tests (if implemented):
```bash
npm test
```

## API Usage Examples

Using curl:
```bash
# Get Bitcoin stats
curl "http://localhost:3000/api/stats?coin=bitcoin"

# Get Ethereum price deviation
curl "http://localhost:3000/api/deviation?coin=ethereum"
```

Using JavaScript:
```javascript
// Get Matic stats
fetch('http://localhost:3000/api/stats?coin=matic-network')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Dependencies

- express: Web framework
- mongoose: MongoDB object modeling
- axios: HTTP client
- node-cron: Task scheduler

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- MongoDB for database services
- Express.js team for the web framework

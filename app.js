const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const routers = require('./src/routers');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fallback = require('express-history-api-fallback');
const config = require('./src/config');

dotenv.config();

const app = express();

app.use(cors());

// Parse json request body
app.use(express.json({ limit: '30mb' }));

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// API Routers
app.use('/', routers);

// Fallback
const root = `${__dirname}/public`;
app.use(express.static(root));
app.use(fallback('index.html', { root }));

// Connect to MongoDB
mongoose
    .connect(config.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
        app.listen(config.PORT, () => {
            console.log(`Server is running at http://localhost:${config.PORT}`);
        });
    })
    .catch((err) => {
        console.log('Error: ', err);
    });

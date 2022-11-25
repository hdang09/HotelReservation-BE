import express from 'express';
// import bodyParser from 'body-parser';
import cors from 'cors';
import routers from './routers/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fallback from 'express-history-api-fallback';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const URI = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use('/', routers);

// Fallback
const root = `${__dirname}/public`;
app.use(express.static(root));
app.use(fallback('index.html', { root }));

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Error: ', err);
    });

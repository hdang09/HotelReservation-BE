const envPath = `${__dirname}/../../.env`;

require('dotenv').config({
    path: envPath,
});

const { PORT, DATABASE_URL, URL_HOST } = process.env;
const MILISECOND_PER_DAY = 86400000;

module.exports = {
    PORT,
    DATABASE_URL,
    URL_HOST,
    MILISECOND_PER_DAY,
};

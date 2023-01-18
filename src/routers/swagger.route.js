// require('dotenv').config();
const router = require('express').Router();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const config = require('../config');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Management',
            version: '1.0.0',
            description: 'API for managing the hotel by admin',
        },
        servers: [
            {
                url: config.URL_HOST,
            },
        ],
    },
    apis: ['routers/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);
router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = router;

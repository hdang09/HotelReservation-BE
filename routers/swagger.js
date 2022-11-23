import express from 'express';
// require('dotenv').config();
const router = express.Router();
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Management',
            version: '1.0.0',
            description: 'A simple Express Library API',
        },
        // servers: [
        //     {
        //         url: 'https://apiapollo.f-code.tech',
        //     },
        // ],
    },
    apis: ['routers/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);
router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default router;

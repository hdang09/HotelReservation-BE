import express from 'express';
const router = express.Router();
import roomsRouter from './rooms.js';
import swaggerRouter from './swagger.js';

router.use('/rooms', roomsRouter);
router.use('/api-docs', swaggerRouter);

export default router;

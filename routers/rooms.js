import express from 'express';
import { getRooms, bookRoom, updateRoom } from '../controllers/rooms.js';

const router = express.Router();

router.get('/', getRooms);
router.post('/', bookRoom);
router.post('/update', updateRoom);

export default router;

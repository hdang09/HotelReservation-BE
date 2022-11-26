import express from 'express';
const router = express.Router();
import {
    getAllRooms,
    getSingleRoom,
    bookRoom,
    updateRoom,
    updateRoomStatus,
    deleteRoom,
    getReport,
    getTodayAvailability,
} from '../controllers/rooms.js';

/**
 * @swagger
 * /rooms/:
 *   get:
 *      tags: [Rooms]
 *      summary: Get all rooms
 *      responses:
 *          200:
 *            description: Success
 *          404:
 *            description: Bad Request
 */
router.get('/', getAllRooms);

/**
 * @swagger
 * /rooms/specific:
 *   post:
 *      tags: [Rooms]
 *      summary: Get specific room
 *      requestBody:
 *          content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/OneRoomRequest'
 *      responses:
 *          200:
 *            description: Success
 *          404:
 *            description: Bad Request
 */
router.post('/specific', getSingleRoom);

/**
 * @swagger
 * /rooms/:
 *   post:
 *      tags: [Rooms]
 *      summary: Reserve a room
 *      requestBody:
 *          content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/RoomRequest'
 *      responses:
 *          200:
 *            description: Success
 *          404:
 *            description: Bad Request
 */
router.post('/', bookRoom);

/**
 * @swagger
 * /rooms/update:
 *   put:
 *      tags: [Rooms]
 *      summary: Edit a room information
 *      requestBody:
 *          content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/RoomRequest'
 *      responses:
 *          200:
 *            description: Success
 *          404:
 *            description: Bad Request
 */
router.put('/update', updateRoom);

/**
 * @swagger
 * /rooms/update-status:
 *   put:
 *      tags: [Rooms]
 *      summary: Update status a room
 *      requestBody:
 *          content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/UpdateStatusRequest'
 *      responses:
 *          200:
 *            description: Success
 *          404:
 *            description: Bad Request
 */
router.put('/update-status', updateRoomStatus);

/**
 * @swagger
 * /rooms/delete:
 *   delete:
 *      tags: [Rooms]
 *      summary: Delete a room
 *      requestBody:
 *          content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/DeleteRequest'
 *      responses:
 *          200:
 *            description: Success
 *          404:
 *            description: Bad Request
 */
router.delete('/delete', deleteRoom);

/**
 * @swagger
 * /rooms/report:
 *   get:
 *      tags: [Report]
 *      summary: Get report
 *      responses:
 *          200:
 *            description: Success
 *          404:
 *            description: Bad Request
 */
router.get('/report', getReport);

/**
 * @swagger
 * /rooms/report-today:
 *   get:
 *      tags: [Report]
 *      summary: Get all room for today's availability
 *      responses:
 *          200:
 *            description: Success
 *          404:
 *            description: Bad Request
 */
router.get('/report-today', getTodayAvailability);

/**
 * @swagger
 * components:
 *      OneRoomRequest:
 *        type: object
 *        properties:
 *          roomNumber:
 *            type: string
 *            description: ID of a room
 *            example: 107
 *      RoomRequest:
 *        type: object
 *        properties:
 *          roomNumber:
 *            type: string
 *            description: ID of a room
 *            example: 101
 *          status:
 *            type: string
 *            description: Status to be updated
 *            example: Checked-out
 *          fullname:
 *            type: string
 *            description: ID of a room
 *            example: Tran Hai Dang
 *          checkIn:
 *            type: string
 *            description: Status to be updated
 *            example: 2022-08-20T17:00:00.000Z
 *          checkOut:
 *            type: string
 *            description: ID of a room
 *            example: 2022-08-20T17:00:00.000Z
 *          idCard:
 *            type: string
 *            description: Status to be updated
 *            example: 289999999
 *          phone:
 *            type: string
 *            description: ID of a room
 *            example: 0123456789
 *          email:
 *            type: string
 *            description: Status to be updated
 *            example: tranhaidang@gmail.com
 *      UpdateStatusRequest:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: ID of a room
 *            example: 6308f965720397ca5f44727f
 *          status:
 *            type: string
 *            description: Status to be updated
 *            example: Checked-out
 *      DeleteRequest:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: ID of a room
 *            example: 6308f965720397ca5f44727f
 *      ReportRequest:
 *        type: object
 *        properties:
 *          status:
 *            type: string
 *            description: status of a room ("Reserved", "Checked-in", "Checked-out". "Cancel")
 *            example: Checked-in
 */

export default router;

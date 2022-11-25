import { RoomModel } from '../models/RoomModel.js';

const MILISECOND_PER_DAY = 86400000;
const MILISECOND_PER_HOUR = 3600000;
const TIME_ZONE = -(new Date().getTimezoneOffset() / 60);

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getSingleRoom = async (req, res) => {
    try {
        const roomNumber = req.body.roomNumber;
        const rooms = await RoomModel.find({ roomNumber });
        res.status(200).json({ roomNumber, rooms });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const bookRoom = async (req, res) => {
    try {
        const newRoom = req.body;
        const room = new RoomModel(newRoom);

        const existedRoom = await RoomModel.findOne({
            roomNumber: room.roomNumber,
            status: { $ne: 'Canceled' },
        })
            .where('checkIn')
            .lte(room.checkIn)
            .lte(room.checkOut)
            .where('checkOut')
            .gte(room.checkIn)
            .gte(room.checkOut);

        if (existedRoom) {
            res.status(400).json({ message: 'The room you booked already existed' });
            return;
        }
        await room.save();
        res.status(200).json({ message: 'Booked successfully!' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const updatedRoom = req.body;
        const room = await RoomModel.findOneAndUpdate({ _id: updatedRoom._id }, updatedRoom, {
            new: true,
        });

        if (!room) {
            res.status(400).json('Update error');
            return;
        }
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateRoomStatus = async (req, res) => {
    try {
        const status = req.body.status;
        const room = await RoomModel.findOneAndUpdate({ _id: req.body.id }, { status });

        if (!room) {
            res.status(400).json('Update error');
            return;
        }
        res.status(200).json({ message: 'Update status successfully!' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const id = req.body.id;
        await RoomModel.findOneAndDelete({ _id: id });
        res.status(200).json({
            message: 'Deleted successfully!',
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const getReport = async (req, res) => {
    try {
        const reservedRooms = await RoomModel.find({ status: 'Reserved' });
        const checkInRooms = await RoomModel.find({ status: 'Checked-in' });
        const checkOutRooms = await RoomModel.find({ status: 'Checked-out' });
        const totalRooms = reservedRooms.length + checkInRooms.length + checkOutRooms.length;

        const date = new Date();
        const today = date - (date % 86400000);
        console.log(new Date(today));
        date.setTime(date.getTime() + 25200000);
        console.log(date);

        const currentReservedRooms = await RoomModel.find({ status: 'Reserved' })
            .where('updatedAt')
            .gte(today);
        const currentCheckInRooms = await RoomModel.find({ status: 'Checked-in' })
            .where('updatedAt')
            .gte(today);
        const currentCheckOutRooms = await RoomModel.find({ status: 'Checked-out' })
            .where('updatedAt')
            .gte(today);
        const currentTotalRooms =
            currentReservedRooms.length + currentCheckInRooms.length + currentCheckOutRooms.length;

        res.status(200).json({
            message: 'Get length successfully!',
            report: {
                total: {
                    total: totalRooms,
                    current: currentTotalRooms,
                },
                reserved: {
                    total: reservedRooms.length,
                    current: currentReservedRooms.length,
                },
                checkIn: {
                    total: checkInRooms.length,
                    current: currentCheckInRooms.length,
                },
                checkOut: {
                    total: checkOutRooms.length,
                    current: currentCheckOutRooms.length,
                },
            },
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getTodayAvailability = async (req, res) => {
    try {
        const singleRooms = await RoomModel.where('updatedAt').gte(
            date - (date % MILISECOND_PER_DAY)
        );
        const doubleRooms = await RoomModel.where('updatedAt').gte(
            date - (date % MILISECOND_PER_DAY)
        );
        const studioRooms = await RoomModel.where('updatedAt').gte(
            date - (date % MILISECOND_PER_DAY)
        );
        const deluxeRooms = reservedRooms.length + checkInRooms.length + checkOutRooms.length;

        res.status(200).json({
            message: 'Get length successfully!',
            report: [
                { name: 'Single Room', rooms: [3, 3, 5, 6, 5, 6, 8, 7] },
                { name: 'Double Room', rooms: [3, 3, 5, 6, 5, 6, 8, 7] },
                { name: 'Studio Room', rooms: [3, 3, 5, 6, 5, 6, 8, 7] },
                { name: 'Deluxe Room', rooms: [3, 3, 5, 6, 5, 6, 8, 7] },
            ],
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

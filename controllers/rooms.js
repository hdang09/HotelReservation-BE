import { RoomModel } from '../models/RoomModel.js';

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

        // 22 - 25 (db)
        // 26 - 28 => 200 => true
        // 18 - 21 => 200 => true
        // 20 - 24 => 400 => true
        // 24 - 29 => 200 => true
        // 23 - 29 => 400 => true
        // 23 - 24 => 400 => true

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
        const currentReservedRooms = await RoomModel.find({ status: 'Reserved' })
            .where('updatedAt')
            .gte(date - (date % 86400000));
        const currentCheckInRooms = await RoomModel.find({ status: 'Checked-in' })
            .where('updatedAt')
            .gte(date - (date % 86400000));
        const currentCheckOutRooms = await RoomModel.find({ status: 'Checked-out' })
            .where('updatedAt')
            .gte(date - (date % 86400000));
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

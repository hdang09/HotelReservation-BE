import { RoomModel } from '../models/RoomModel.js';

export const getRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const bookRoom = async (req, res) => {
  try {
    const newRoom = req.body;
    const room = new RoomModel(newRoom);

    await room.save();

    res.status(200).json(room);
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

    // await room.save();

    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

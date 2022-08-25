import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      default: 'Anonymous',
    },
    checkIn: {
      type: Date,
      required: false,
    },
    checkOut: {
      type: Date,
      required: false,
    },
    idCard: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    services: {
      type: Object,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export const RoomModel = mongoose.model('Room', schema);

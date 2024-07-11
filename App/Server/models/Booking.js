import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
    name: String,
    userId: String,
    room: String,
    startTime: Date,
    finishTime: Date,
    allDay: Boolean,
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;

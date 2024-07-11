import mongoose from "mongoose";

const RoomUseSchema = new mongoose.Schema(
  {
    use: Boolean,
    deviceID: {
            type: String,
            required: true,
            max: 50,
            unique: true,
    },
  },
  { timestamps: true }
);

const RoomUse = mongoose.model("RoomUse", RoomUseSchema);
export default RoomUse;

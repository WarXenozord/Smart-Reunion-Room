import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
            unique: true,
        },
        deviceID: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        manager: {
            type: [mongoose.Types.ObjectId],
            ref: "User",
        },
        access: Array,
    },
    { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);
export default Room;
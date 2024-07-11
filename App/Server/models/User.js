import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
        },
    surname: {
        type: String,
        required: true,
        min: 2,
        max: 100,
        },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    occupation: String,
    phoneNumber: String,
    bookings: Array,
    role: {
      type: String,
      enum: ["Usuário", "Gestor", "Administrador", "Super Administrador"],
      default: "Usuário",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

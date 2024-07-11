import express from "express";
import { getUser, getBookings, postBook, deleteBooking/*, getDashboardStats */ } from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/bookings", getBookings);
router.post("/book", postBook);
router.delete("/book/:id", deleteBooking);
/*router.get("/dashboard", getDashboardStats);*/

export default router;

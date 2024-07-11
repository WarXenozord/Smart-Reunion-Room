import express from "express";
import { getUsers, getRooms } from "../controllers/management.js";

//import { getAdmins, getUserPerformance } from "../controllers/management.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/rooms", getRooms);
//router.get("/admins", getAdmins);
//router.get("/performance/:id", getUserPerformance);

export default router;

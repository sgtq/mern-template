import express from "express";
import { createPin, getAllPins } from "../Controller/PinController.js";

const router = express.Router();

router.get("/", getAllPins);
router.post("/", createPin);

export default router;

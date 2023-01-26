import express from "express";
import { register, login } from "../Controller/UserController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);

export default router;

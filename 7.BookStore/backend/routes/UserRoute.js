import express from "express";
import { Signup } from "../controller/userController.js";
import { Login } from "../controller/userController.js";
const router = express.Router();

router.post("/signup", Signup);

router.post("/login", Login);

export default router;

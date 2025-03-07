const express = require("express");
const router = express.Router();
const User = require("../models/Usermodel");
const bcrypt = require("bcryptjs");
const {
  getUser,
  SignUp,
  Login,
  DeleteUser,
  UpdateUser,
  getUserBookings,
} = require("../controllers/UserController");

router.get("/", getUser);

router.post("/signup", SignUp);

router.post("/login", Login);

router.delete("/delete", DeleteUser);

router.put("/update/:id", UpdateUser);
router.get("/book/:id", getUserBookings);

module.exports = router;

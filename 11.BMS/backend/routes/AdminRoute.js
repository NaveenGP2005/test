const express = require("express");
const router = express.Router();

const {
  SignUpAdmin,
  LoginAdmin,
  getAdmin,
} = require("../controllers/AdminController");

router.post("/signup", SignUpAdmin);

router.post("/login", LoginAdmin);

router.get("/get", getAdmin);

module.exports = router;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminModel");

const SignUpAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  const admin = new Admin({ username, email, password: hashedPassword });
  try {
    await admin.save();
    res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: "Admin does not exist" });
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(200).json({ token, admin, message: "Login successful" });
};

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();
    if (admin) {
      res.status(200).json({ admin });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { SignUpAdmin, LoginAdmin, getAdmin };

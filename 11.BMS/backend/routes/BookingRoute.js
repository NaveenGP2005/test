const express = require("express");
const router = express.Router();
const {
  newBooking,
  getBookings,
  deleteBookings,
  getBookingsbyId,
} = require("../controllers/BookingController");

router.post("/new", newBooking);
router.get("/get", getBookings);
router.get("/get/:id", getBookingsbyId);

router.delete("/delete/:id", deleteBookings);

module.exports = router;

const Booking = require("../models/BookingsModel");
const Movie = require("../models/MovieModel");
const User = require("../models/Usermodel");
const mongoose = require("mongoose");

const newBooking = async (req, res) => {
  const { user, seatNumber, movieName, date } = req.body;

  console.log("Received booking request:", req.body);

  if (!user || !seatNumber || !movieName || !date) {
    console.error("Validation error: Missing fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(movieName)) {
    console.error("Validation error: Invalid movie ID");
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(user)) {
    console.error("Validation error: Invalid user ID");
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const existingMovie = await Movie.findById(movieName);
    if (!existingMovie) {
      console.error("Movie not found");
      return res.status(400).json({ message: "Movie not found" });
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      console.error("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    const newBooking = new Booking({ user, seatNumber, movieName, date });

    let session = null;
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      await newBooking.save({ session });
      await User.findByIdAndUpdate(
        user,
        { $addToSet: { bookings: newBooking._id } },
        { session }
      );
      await Movie.findByIdAndUpdate(
        movieName,
        { $addToSet: { bookings: newBooking._id } },
        { session }
      );

      await session.commitTransaction();
      res
        .status(200)
        .json({ message: "Booking created successfully", data: newBooking });
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }
      console.error("Transaction error:", error.message);
      res.status(500).json({ message: error.message });
    } finally {
      if (session) {
        session.endSession();
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getBookings = async (req, res) => {
  const bookings = await Booking.find();
  if (!bookings) {
    return res.status(404).json({ message: "No bookings found" });
  }
  res.status(200).json(bookings);
};

const getBookingsbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBookings = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: error.message });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { newBooking, getBookings, deleteBookings, getBookingsbyId };

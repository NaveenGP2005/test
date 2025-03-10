const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seatNumber: { type: String, required: true },
    movieName: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" ,required:true},
    date:{type:String,required:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);

const { default: mongoose } = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    genre: { type: String, required: true },
    language: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    releaseDate: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);

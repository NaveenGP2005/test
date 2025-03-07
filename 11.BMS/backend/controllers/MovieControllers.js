const Movie = require("../models/MovieModel");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");
const AddMovie = async (req, res) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken) {
    return res.status(400).json({ message: "Invalid token" });
  }
  const adminId = jwt.verify(
    extractedToken,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
      return decoded.id;
    }
  );
  const { name, description, image, rating, releaseDate, language, genre } =
    req.body;
  if (!name || !description || !image || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const movie = new Movie({
    name,
    description,
    image,
    rating,
    releaseDate,
    language,
    genre,
  });

  try {
    await movie.save();
    res.status(200).json({ message: "Movie added successfully" });
    console.log(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (!movies) {
      return res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json(movies);
  } catch (error) {
    req.statusCode(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { AddMovie, getMovies, getMovieById };

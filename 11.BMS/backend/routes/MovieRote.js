const express = require("express");
const router = express.Router();
const Admin = require("../models/AdminModel");

const {
  AddMovie,
  getMovies,
  getMovieById,
} = require("../controllers/MovieControllers");

router.post("/add", AddMovie);
router.get("/get", getMovies);
router.get("/get/:id", getMovieById);

module.exports = router;

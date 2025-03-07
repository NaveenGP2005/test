import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../api-helpers/apihelp";

function MovieDetails() {
  const [input, setInput] = useState({ seat: "", date: "" });
  const id = useParams().id;
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    getMovieDetails(id)
      .then((data) => setMovie(data))
      .catch((err) => setError("Failed to fetch movie details"));
  }, [id]);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = localStorage.getItem("user"); // Retrieve user data with "user" key
      if (!user) {
        console.error("No user data found in localStorage");
        return;
      }

      const parsedUser = JSON.parse(user);
      const userId = parsedUser._id;
      if (!userId) {
        console.error("User ID is missing");
        return;
      }

      await newBooking({ ...input, movie: movie._id, user: userId });
      console.log("Booking successful");
    } catch (err) {
      console.error("Error submitting booking:", err.message);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {movie && (
        <div className="bg-zinc-900 w-full h-screen">
          <h1 className="mt-20 text-white text-3xl uppercase items-center flex justify-center">
            Tickets For: {movie.name}
          </h1>
          <div className="container flex">
            <div className="left flex flex-col justify-col items-center w-1/2">
              {movie.image && (
                <img src={movie.image} alt={movie.name} className="mt-10" />
              )}
              <p className="text-white mt-10">{movie.genre}</p>
              <p className="text-white mt-10">Release: {movie.releaseDate}</p>
              <p className="text-white mt-10">Language: {movie.language}</p>
              <p className="text-white mt-10">About: {movie.description}</p>
            </div>
            <div className="right mt-10 flex flex-col items-center justify-around w-1/2">
              <form onSubmit={handleSubmit}>
                <label htmlFor="seat" className="text-white">
                  Enter Seat Number
                </label>
                <input
                  value={input.seat}
                  onChange={handleChange}
                  type="text"
                  id="seat"
                  name="seat"
                />
                <br />
                <br />
                <br />
                <label htmlFor="date" className="text-white">
                  Select Date
                </label>
                <input
                  value={input.date}
                  onChange={handleChange}
                  type="text"
                  id="date"
                  name="date"
                />
                <br />
                <br />
                <br />
                <button type="submit" className="text-white bg-green-500">
                  Book
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;

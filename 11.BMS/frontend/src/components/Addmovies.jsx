import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store";
import { useNavigate } from "react-router-dom";
import { AddNewMovies } from "../api-helpers/apihelp";

function userLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    language: "",
    genre: "",
    rating: "",
  });

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const {
    register,

    formState: { errors },
  } = useForm();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    AddNewMovies(input)
      .then((data) => {
        console.log(data);
        if (data.message === "Movie added successfully") {
          alert("Movie added successfully");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <dialog id="my_modal_0" className="modal">
        <div className="modal-box">
          <form method="dialog " onSubmit={handleSubmit}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_0").close()}
            >
              ✕
            </button>
            <div className="text-white">
              <h1 className="font-bold text-lg flex justify-center mb-5">
                Add Movies
              </h1>
              <label>Movie Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
              <br />
              <br />
              <label>Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={input.description}
                onChange={handleChange}
              />
              <br />
              <br />
              <label>Image:</label>
              <input
                type="text"
                id="image"
                name="image"
                value={input.image}
                onChange={handleChange}
              />
              <br />
              <br />
              <label>Language:</label>
              <input
                type="text"
                id="language"
                name="language"
                value={input.language}
                onChange={handleChange}
              />
              <br />
              <br />
              <label>Genre:</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={input.genre}
                onChange={handleChange}
              />
              <br />
              <br />
              <label>ReleaseDate:</label>
              <input
                type="text"
                id="releaseDate"
                name="releaseDate"
                value={input.releaseDate}
                onChange={handleChange}
              />
              <br />
              <br />
              <label>Rating:</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={input.rating}
                onChange={handleChange}
              />
              <br />
              <br />
              <button type="submit" className="bg-blue-900 rounded-xl p-2">
                Add
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default userLogin;

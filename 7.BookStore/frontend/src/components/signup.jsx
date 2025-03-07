import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/user/signup",
        userInfo
      );
      if (res.data.message === "User created successfully") {
        alert("User created successfully");
      } else {
        alert("Sign up failed: " + res.data.message);
      }
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error(err);
      alert("Error signing up: " + err.response.data.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <Link to="/">✕</Link>
          </button>

          <h3 className="font-bold text-lg">Sign Up!</h3>
          <br />
          <div>
            <span>Username</span>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              className="ml-2 rounded-xl px-3"
              {...register("username", { required: true })}
            />
            <br />
            <br />
            <span>Email</span>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="ml-10 rounded-xl px-3"
              {...register("email", { required: true })}
            />
            <br />
            <br />
            <span>Password</span>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="ml-3 rounded-xl px-3"
              {...register("password", { required: true })}
            />
          </div>
          <div className="flex justify-around mt-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

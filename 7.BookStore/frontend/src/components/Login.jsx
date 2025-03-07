import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/user/login",
        userInfo
      );

      if (res.data.message === "Login successful") {
        alert("Login successful");
        localStorage.setItem("user", JSON.stringify(res.data.User)); // Ensure this is the correct path
        console.log(res.data); // Check the structure of the response

        // Optionally redirect or update state
      } else {
        alert("Login failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert(
        "Error logging in: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Login!</h3>
            <br />
            <div>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="ml-10 rounded-xl px-3"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </label>
              <br />
              <br />
              <label>
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="ml-3 rounded-xl px-3"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </label>
            </div>
            <div className="flex justify-around mt-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
              <p>
                Not Registered? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;

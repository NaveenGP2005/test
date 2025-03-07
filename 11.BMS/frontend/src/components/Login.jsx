import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store";
import { useNavigate } from "react-router-dom";

function userLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const response = await axios.post(
        "http://localhost:8080/user/login",
        userInfo
      );

      if (response.data && response.data.message === "Login successful") {
        alert("Login successful");
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Use "user" key
        console.log(response.data); // Check the structure of the response
        dispatch(userActions.login());
        navigate("/"); // Redirect to a dashboard or another page after login
      } else {
        alert("Login failed: " + (response.data?.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || err.message || "Unknown error";
      alert(`Error logging in: ${errorMessage}`);
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
                Not Registered? <Link to="/admin/signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default userLogin;

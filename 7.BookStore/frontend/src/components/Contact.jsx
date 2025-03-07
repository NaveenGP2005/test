import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <Link to="/">✕</Link>
          </button>

          <h3 className="font-bold text-lg">Contact US!</h3>
          <br />
          <div className="">
            <span>Username</span>
            <input
              type="text"
              placeholder="Enter username"
              className="ml-2 rounded-xl px-3"
            ></input>
            <br />
            <br />
            <span>Email</span>
            <input
              type="email"
              placeholder="Enter Email"
              className="ml-10 rounded-xl px-3"
              {...register("email", { required: true })}
            ></input>
            <br />
            <br />
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter Password"
              className="ml-3 rounded-xl px-3"
              {...register("password", { required: true })}
            ></input>
          </div>
          <div className="flex justify-around mt-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;

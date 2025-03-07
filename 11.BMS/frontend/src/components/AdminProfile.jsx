import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBooking, getUserBookings } from "../api-helpers/apihelp";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useState(null);

  const user1 = localStorage.getItem("Admin"); // Retrieve user data with "user" key
  if (!user1) {
    throw new Error("User not found in localStorage");
  }

  const parsedUser = JSON.parse(user1);
  const username = parsedUser.admin.username;
  const email = parsedUser.admin.email;

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_1").close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-blue-700 text-lg uppercase justify-center flex">
              Admin Profile
            </h3>
            <p className="text-white font-semibold">Name: {username}</p>
            <p className="text-white font-semibold">Email: {email}</p>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default UserProfile;

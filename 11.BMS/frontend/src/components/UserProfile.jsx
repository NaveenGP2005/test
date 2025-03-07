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
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    getUserBookings()
      .then((data) => {
        console.log("API Response:", data); // Debugging output
        setUser(data);
        setUserBookings(data.bookings || []); // Ensure bookings is an array
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => {
        setUserBookings(userBookings.filter((booking) => booking._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const user1 = localStorage.getItem("user"); // Retrieve user data with "user" key
  if (!user1) {
    throw new Error("User not found in localStorage");
  }

  const parsedUser = JSON.parse(user1);
  const username = parsedUser.username;
  const email = parsedUser.email;

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
              User Profile
            </h3>

            <p className="text-white text-sm mt-5">Username: {username}</p>

            <p className="text-white text-sm mt-5">Email: {email}</p>

            <p className="text-white text-sm mt-5">Bookings:</p>
            <ul>
              {userBookings.length > 0 ? (
                userBookings.map((booking) => (
                  <li key={booking._id} className="text-white text-sm mt-5">
                    <p>Movie: {booking.movieName}</p>
                    <p>Seat: {booking.seatNumber}</p>
                    <p>Date: {booking.date}</p>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-blue-900 rounded-xl p-2"
                    >
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-white text-sm mt-5">No bookings found</p>
              )}
            </ul>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default UserProfile;

import React, { useEffect, useState } from "react";
import { SiBookmyshow } from "react-icons/si";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { getAllMovies } from "../api-helpers/apihelp";
import Login from "./Login";
import AdminLogin from "./AdminLogin";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import AdminProfile from "./AdminProfile";
import Addmovies from "./Addmovies";

function Navbar() {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies();
        console.log(response);
        setMovies(response.data); // Adjust based on actual API response structure
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    // Perform search logic here, or redirect based on search input
    navigate(`/search?query=${event.target.searchInput.value}`);
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <details>
                <summary className="text-white">City</summary>
                <ul className="text-white p-2 mt-2 bg-base-100 rounded-box shadow-lg">
                  <li>
                    <a>Bengaluru</a>
                  </li>
                  <li>
                    <a>Mumbai</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl text-white">
          <SiBookmyshow /> BookMyShow
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary className="text-white">City</summary>
              <ul className="text-white p-2 mt-2 bg-base-100 rounded-box shadow-lg">
                <li>
                  <a>Bengaluru</a>
                </li>
                <li>
                  <a>Mumbai</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="search hidden md:flex">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            name="searchInput"
            className="input input-bordered grow"
            placeholder="Search"
          />
          <button type="submit" className="btn btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="navbar-end">
        {!isUserLoggedIn && !isAdminLoggedIn && (
          <div className="flex">
            <a
              className="btn ml-3"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              User
            </a>
            <Login />
            <a
              className="btn ml-3"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Admin
            </a>
            <AdminLogin />
          </div>
        )}
        {isUserLoggedIn && (
          <div className="flex">
            <a className="btn ml-3" onClick={() => window.location.reload()}>
              Logout
            </a>

            <a
              className="btn ml-3"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Admin
            </a>
            <AdminLogin />
          </div>
        )}
        {isAdminLoggedIn && (
          <div className="flex">
            <a className="btn ml-3" onClick={() => window.location.reload()}>
              Logout
            </a>

            <a
              className="btn ml-3"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              User
            </a>
            <Login />
          </div>
        )}
        {isAdminLoggedIn && (
          <div className="flex">
            <a
              className="btn ml-3"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Profile
            </a>
            <AdminProfile />
            <a
              className="btn ml-3"
              onClick={() => document.getElementById("my_modal_0").showModal()}
            >
              AddMovies
            </a>
            <Addmovies />
          </div>
        )}
        {isUserLoggedIn && (
          <div className="">
            <a
              className="btn ml-3"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Profile
            </a>
            <UserProfile />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

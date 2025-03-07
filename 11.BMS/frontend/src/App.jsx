import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import MovieDetail from "./components/MovieDetails"; // Import the MovieDetail component
import Login from "./components/Login";
import Signup from "./components/signup";
import AdminSignup from "./components/AdminSignup";
import { useSelector } from "react-redux";


export default function App() {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  console.log(isUserLoggedIn, isAdminLoggedIn);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies />
            </>
          }
        />

        <Route path="/movie/get/:id" element={<MovieDetail />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
      </Routes>
    </Router>
  );
}

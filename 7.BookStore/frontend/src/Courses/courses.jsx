import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import list from "../../public/list.json";
import Course from "../components/course";

function courses() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Course />
      </div>
      <Footer />
    </div>
  );
}

export default courses;

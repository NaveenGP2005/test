import React from "react";
import Home from "./Home/Home";
import Course from "./Courses/courses";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Contact from "./components/Contact";

function App() {
  return (
    <div>
      <div className="dark bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Course" element={<Course />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/banner";
import Freebook from "../components/freebook";
import Footer from "../components/footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <hr></hr>
      <Freebook />
      <Footer />
    </div>
  );
}

export default Home;

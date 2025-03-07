// src/components/Movies.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { getAllMovies } from "../api-helpers/apihelp";
import "./Movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getAllMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="uppercase font-bold text-white text-3xl mt-10">
        Trending Movies
      </h1>
      <div className="w-full h-[50vh] mt-20">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            1024: { slidesPerView: 3, spaceBetween: 10 },
            600: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 1, spaceBetween: 10 },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              onClick={() => navigate(`/movie/get/${movie._id}`)}
            >
              <div className="relative cursor-pointer">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-4 rounded-b-lg">
                  <h2 className="text-xl font-semibold">{movie.name}</h2>
                  <p>{movie.genre}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

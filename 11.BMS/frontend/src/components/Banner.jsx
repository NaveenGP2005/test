import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Pagination } from "swiper/modules";

export default function App() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div className="relative w-full h-1/2">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="w-full h-1/2" // Tailwind class for height one-third of the parent
      >
        <SwiperSlide>
          <img
            className="object-center w-full h-full"
            src="https://tse3.mm.bing.net/th?id=OIP.zFqk3JkHS0uKXfby5JmnBwHaEK&pid=Api&P=0&h=180"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-center w-full h-full"
            src="https://tse2.mm.bing.net/th?id=OIP.N4Mhuc9pjBzT2SKGDSisugHaEO&pid=Api&P=0&h=180"
            alt="Slide 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-center w-full h-full"
            src="https://huzzaz.com/procoverphotos/movie-5.jpg?1508687838"
            alt="Slide 3"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

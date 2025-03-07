import React from "react";
import List from "../../public/list.json";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import Cards from "./cards";
import axios from "axios";

function freebook() {
  const freeData = List.filter((data) => data.category === "Free");
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Free courses</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ab
          dignissimos laboriosam autem facere quidem temporibus, consectetur
          consequatur voluptas ipsa?
        </p>
      </div>
      <div className="">
        <Slider {...settings}>
          {freeData.map((items) => (
            <Cards item={items} key={items.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default freebook;

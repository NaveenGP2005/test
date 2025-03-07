import React, { useEffect, useState } from "react";
import Cards from "./cards";
import List from "../../public/list.json";
import axios from "axios";

function course() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getbook = async () => {
      try {
        const res = await axios.get("http://localhost:8000/book");
        console.log(res.data);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getbook();
  }, []);
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="item-center justify-center text-center pt-20 ">
        <h1 className="text-3xl font-semibold mb-10">Welcome to courses</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta porro
          ipsum ullam itaque inventore error quisquam, voluptas corporis.
          Perferendis, illo ea doloremque labore, dolor assumenda dolorem cumque
          beatae ratione asperiores, optio qui quos dignissimos?
        </p>
        <button
          className="btn btn-primary hover:bg-blue-700"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {book.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default course;

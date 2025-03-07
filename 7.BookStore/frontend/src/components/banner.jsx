import React from "react";

function banner() {
  return (
    <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row ">
      <div className="order-2 md:order-1 left w-full md:w-1/2 mt-10">
        <h1 className="text-3xl font-bold mb-5 mt-10">
          Hello and welcome to{" "}
          <span className="text-blue-900 uppercase ">Bookstore</span>
        </h1>
        <p className="font-semibold mb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
          vitae, exercitationem et, aliquam iure quasi doloribus voluptatum
          perferendis accusamus dolorem assumenda incidunt perspiciatis dolor
          velit ad a maiores libero ab quia laudantium blanditiis voluptas!
        </p>
        <label className="input input-bordered flex items-center gap-2 w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Email" />
        </label>
        <div className="">
          <a className="btn mt-3 mb-3 bg-blue-600">Submit</a>
        </div>
      </div>
      <div className="right order-1 mb-10 md:order-2 w-full md:w-1/2">
        <img
          className="w-full mt-10 mb "
          src="https://tse1.mm.bing.net/th?id=OIP.s6qkxOqsGKB_7JnvbKujWAHaE2&pid=Api&P=0&h=180"
          alt="book"
        />
      </div>
    </div>
  );
}

export default banner;

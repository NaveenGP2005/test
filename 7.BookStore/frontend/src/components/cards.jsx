import React from "react";

function cards({ item }) {
  return (
    <div>
      <div className="">
        <div className="card bg-base-100 w-96 shadow-xl hover:scale-105 duration-200">
          <figure>
            <img src={item.image} alt="book" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.title}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary hover:bg-blue-700">
                ${item.price}
              </button>
              <button className="btn btn-primary hover:bg-blue-700">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default cards;

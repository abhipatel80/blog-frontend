import React from "react";
import { NavLink } from "react-router-dom";

const NoBlog = ({ msg }) => {
  return (
    <div
      className="bg-white md:w-[50rem] w-[18rem] h-[11rem] mx-auto md:h-[30rem] flex items-center justify-center rounded-md 
    shadow-lg md:mt-28 mt-16"
    >
      <h2 className="text-center md:text-3xl text-base">{msg}</h2>
      <NavLink to="/" className="md:mt-32 mt-24 absolute">
        <button
          className="md:py-1.5 py-1 md:px-6 px-4 text-md text-white hover:bg-purple-700
         bg-purple-600 rounded-md"
        >
          Home
        </button>
      </NavLink>
    </div>
  );
};

export default NoBlog;

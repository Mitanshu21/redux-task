import React from "react";
import style from "./Spinner.module.css";

function Spinner({ message }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <div
        className={`${style.loader} ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4`}
      ></div>
      <h2 className="text-center text-white text-xl font-semibold">
        {message}
      </h2>
    </div>
  );
}

Spinner.defaultProps = {
  message: "Loading...",
};

export default Spinner;
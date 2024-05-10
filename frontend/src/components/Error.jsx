import React from "react";

const Error = ({ error }) => {
  return (
    <div className=" mt-[20vh] justify-center text-center bg-white p-16 rounded-2xl shadow-lg shadow-red-500">
      <h1 className="text-3xl font-bold mb-6">Sorry! There is an error occured.</h1>
      <p className=" text-xl text-gray-400">{error}</p>
    </div>
  );
};

export default Error;

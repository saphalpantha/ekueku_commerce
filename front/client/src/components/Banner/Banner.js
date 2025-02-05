import React from "react";

const Banner = () => {
  return (
    <div className="relative md:w-[75%] w-full mx-auto h-[200px] md:h-[400px] md:mt-[8%] mt-[25%] sm:mt-[14%]  px-0 object-center">
      <div className="absolute flex justify-center items-center bg-gradient-to-r from-[#e2f3ff] to-[#27a9ff] opacity-80  w-full h-full">
        <div className="skew-x-1 text-center">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900  dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-blue-900">
              Unbeatable
            </span>
            Prices on Top Brands!
          </h1>
        </div>
      </div>
      <img
        src="https://img.freepik.com/premium-psd/hand-holding-mockup-smartphone_67155-9734.jpg?w=1480"
        className="object-cover rounded-md w-full h-full"
      />
    </div>
  );
};

export default Banner;

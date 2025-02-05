import React from "react";
const NewsLetter = () => {
  return (
    <div className="flex justify-center  items-center py-10 px-10">
      <div className="bg-white flex flex-col gap-3 sm:flex-row items-center justify-around py-5 drop-shadow-lg rounded-lg max-w-5xl w-full px-5">
        <div className="max-w-lg flex justify-center flex-col gap-3">
          <h2 className="text-2xl lg:text-4xl  font-bold text-start">
            Let&apos; bring your dream to real
          </h2>
          <p className="text-base md:text-lg text-gray-500">
            Are looking for going fast in your business?
            <br /> Send your mail address we will contact you soon.&quot;
          </p>
          <div className="flex flex-col sm:flex-row gap-5 max-w-md">
            <input
              type="text"
              className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#3651BF] focus:border-transparent"
              placeholder="Email"
            />
            <button
              className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-[#32439B] focus:outline-none focus:ring-2 focus:ring-[#547FDD] focus:ring-offset-2 focus:ring-offset-[#C7D9F6]"
              type="submit"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center sm:justify-end max-w-xs w-full">
          <img
            src="https://www.tailwindtap.com/assets/components/subscription-cta/jar.jpg"
            alt="flower image"
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default NewsLetter;

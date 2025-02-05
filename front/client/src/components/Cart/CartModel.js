"use client";
import React from "react";
import CartCard from "./CartCard";
import Subtotal from "./Subtotal";

const CartModel = () => {
  return (
    <div className="grid grid-cols-1 py-[6%] justify-center  gap-5  sm:grid-cols-1 md:grid-cols-12  ">
      <div className="ml-0 col-span-8 md:ml-[2%] border-[1px]  md:max-w-6xl border-slate-50">
        <div className="grid py-[2rem] w-full  px-2  overflow-scroll  grid-cols-1  justify-between gap-4 items-center ">
          <div className="flex justify-between">
            <h1 className="text-2xl  md:text-4xl sm:text-3xl font-medium">
              Shopping Cart
            </h1>
          </div>
          {[1, 2,3].map((i) => (
            <CartCard />
          ))}
        </div>
        {/* <div className="bg-white  p-2  shadow-md border-[1px]   rounded-md  border-[#bbc3c3]  h-[60px]"></div> */}
      </div>
          <div className="  col-span-3 md:mr-[5%]   py-[23%]">
          <Subtotal/>
          </div>
    </div>
  );
};

export default CartModel;

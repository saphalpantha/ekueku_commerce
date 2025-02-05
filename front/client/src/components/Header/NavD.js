"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { Search } from "./ui/Search";
import Menu from "./Menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GearIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";




const TextOnHover = ({ main, label }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="">{main}</TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};








const NavD = () => {

  return (

    <Fragment>  
    <header className="flex absolute z-10 top-0 w-full justify-between  items-center h-24 px-4 border-b bg-[#FAF9F6] md:px-12 dark:bg-gray-950">
      <Link className="flex items-center  gap-10 mr-4" href="#">
        <SunIcon className="w-5 h-5 fill-current" />
        <span className="font-semibold">EKU Inc</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-8 flex-1">
        <Search />
        <Link className="font-medium" href="#">
          All Products
        </Link>
        <Link className="font-medium" href="#">
          Contact
        </Link>
        <Link className="font-medium" href="#">
          MyOrders
        </Link>
        <Link className="font-medium" href="#">
          Reviews
        </Link>
      </nav>
      <div className="flex justify-center items-center  gap-4">
      <a href="#_" class="px-5 py-2 relative rounded-md group font-medium text-white font-medium inline-block">
<span class="absolute top-0 left-0 w-full h-full rounded-md opacity-50 filter blur-sm bg-gradient-to-br from-blue-600 to-blue-500"></span>
<span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-md opacity-50 from-blue-600 to-blue-500"></span>
<span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-md shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-blue-600 to-blue-500"></span>
<span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-md bg-gradient-to-br to-blue-600 from-blue-500"></span>
<span class="relative">Sign In</span>
</a>

        <TextOnHover
          label={"Your Shopping Cart"}
          main={
            <button
              onClick={() => setIsModelOpen(true)}
              class="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
              aria-label="Cart"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span class="absolute inset-0 object-right-top -mr-6">
                <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-blue-500 text-white">
                  10
                </div>
              </span>
            </button>
          }
        />
        <Button className="" variant size="sm">
          <TextOnHover
            label={"Settings"}
            main={<GearIcon className="w-[1.5rem] h-[1.5rem]" />}
          />
        </Button>
      </div>
    </header>
</Fragment>
  );
};

function SunIcon(props) {
  return (
    <svg
    {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M14 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 10.41 10.41" />
      <path d="M2 100h2" />
      <path d="M50 100h2" />
      <path d="m6.34 17.66-10.41 10.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export default NavD;

import React, { Fragment } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CartCard = () => {
  return (
    <Fragment>
      <div className="bg-white grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  p-2  shadow-md border-[1px] h-auto   md:h-[200px] rounded-md  border-[#bbc3c3]">
        <div className="flex w-auto md:w-[260px]  p-1 rounded-md">
          {/* <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" className="flex justify-center items-center"/> */}
          <img
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg"
            className="flex justify-center items-center"
          />
        </div>
        <div className="flex gap-2 px-2 md:px-0  col-span-2 flex-col">
          <h1 className="text-[1rem]  md:px-0 max-w-md text-justify">
            NIBOSI Watch for Men Analog Quartz Tempor enim sint aliqua velit
            esse mollit fugiat labore veniam sunt do amet.{" "}
          </h1>
          <span className="max-w-md text-red-600 text-[0.8rem]">
            Only 1 stock left
          </span>
          <div>
            <h1 className="text-[0.8rem]">Colour: Black Silver</h1>
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[75px]">
                <SelectValue placeholder="Qty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Qty</SelectLabel>
                  <SelectItem value="apple">1</SelectItem>
                  <SelectItem value="banana">2</SelectItem>
                  <SelectItem value="blueberry">3</SelectItem>
                  <SelectItem value="grapes">4</SelectItem>
                  <SelectItem value="pineapple">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <button className="bg-white px-2 text-[0.9rem]  hover:bg-red-500 hover:text-white  text-red-500     shadow-md border-[1px] h-auto    rounded-md  border-[#bbc3c3]">
              Delete
            </button>
            <button className="bg-white px-2 text-[0.9rem]  text-blue-600  hover:bg-blue-600 hover:text-white   shadow-md border-[1px] h-auto    rounded-md  border-[#bbc3c3]">
              Share
            </button>
            <button className="bg-white px-2  text-[0.9rem]   text-yellow-400 hover:bg-yellow-400 hover:text-white  shadow-md border-[1px] h-auto    rounded-md  border-[#bbc3c3]">
              Add to WishList
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartCard;

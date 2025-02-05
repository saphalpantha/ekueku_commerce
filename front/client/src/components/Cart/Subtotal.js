import React from 'react'

const Subtotal = () => {
  return (
    <div className='p-2  shadow-md border-[1px]  w-[100%] flex flex-col gap-2 py-4 h-fit   rounded-md  border-[#bbc3c3]  mt-0 mx-2 '>  
                    <h1 className="text-2xl  md:text-2xl sm:text-xl font-medium">
              Subtotal(8 items) : Rs 48,433.00
            </h1>

            <button className='h-[30px] w-fit px-4   text-[0.9rem] hover:brightness-110 bg-yellow-400 hover:text-white  shadow-md border-[1px]    rounded-md  border-[#bbc3c3]'>Proceed to Buy</button>


    </div>
  )
}

export default Subtotal
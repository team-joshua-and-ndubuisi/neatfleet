import React from 'react'

interface BookingProps{
    name: string,
    status: string,
    date: number|string,
    details: string,
    rating: number
}

   const BookingCard: React.FC<BookingProps>=({name,status,date,details,rating})=>{
    return (
      <div className="parent-container">
       <div className="flex py-10">
            <div className="border border-black py-3 w-1/5 text-wrap text-center lg:text-xl md:text-xl text-sm  border-round-5x rounded-tl-lg rounded-bl-lg">

                 <span> Name: {name}</span>
            </div>
            <div className="border border-black py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x">
                <span>{status}</span>
            </div>
            <div className="border border-black py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x">
                <span>Service Date: {date}</span>
            </div>
            <div className="border border-black py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x">

                <span>{details}</span>
            </div>
             <div className="flex flex-row border border-black py-3 text-wrap text-center w-1/5 lg:text-xl md:text-xl text-sm border-round-5x rounded-br-lg rounded-tr-lg text-center">
                <span>Rating: {rating}</span>
            </div>
       </div>
      </div>
    )
  }
  export default BookingCard

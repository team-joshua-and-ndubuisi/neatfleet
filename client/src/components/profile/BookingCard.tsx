import React from 'react'

interface BookingProps{
    name: string,
    status: string,
    date: number,
    details: string,
    rating: number
}
  
   const BookingCard: React.FC<BookingProps>=({name,status,date,details,rating})=>{
    return (
      <div>
       <div className="w-full flex py-10">
            <div className="border border-black py-5 px-15 text-xl border-round-5x rounded-tl-lg rounded-bl-lg">
                Name
                 <span>{name}</span>
            </div>
            <div className="border border-black py-5 px-15 text-xl border-round-5x">
                Status
                <span>{status}</span>
            </div>
            <div className="border border-black py-5 px-15 text-xl border-round-5x">
                Rating
                <span>{date}</span>
            </div>
            <div className="border border-black py-5 px-15 text-xl border-round-5x">
                Details
                <span>{details}</span>
            </div>
             <div className="border border-black py-5 px-15 text-xl border-round-5x rounded-br-lg rounded-tr-lg">
                Rating
                <span>{rating}</span>
            </div>
       </div>
      </div>
    )
  }
  export default BookingCard
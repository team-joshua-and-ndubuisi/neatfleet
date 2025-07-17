import React from 'react'

interface BookingDetails{
    name: string,
    status: string,
    date: number,
    details: string,
    rating: number
}
  
   const BookingCard=(props: BookingDetails)=> {
    return (
      <div>
       <div className="w-full flex py-10">
            <div className="border border-black py-5 px-15 text-xl border-round-5x rounded-tl-lg rounded-bl-lg">
                Name
                 <span>{props.name}</span>
            </div>
            <div className="border border-black py-5 px-15 text-xl border-round-5x">
                Status
                <span>{props.status}</span>
            </div>
            <div className="border border-black py-5 px-15 text-xl border-round-5x">
                Rating
                <span>{props.date}</span>
            </div>
            <div className="border border-black py-5 px-15 text-xl border-round-5x">
                Details
                <span>{props.details}</span>
            </div>
             <div className="border border-black py-5 px-15 text-xl border-round-5x rounded-br-lg rounded-tr-lg">
                Rating
                <span>{props.rating}</span>
            </div>
       </div>
      </div>
    )
  }
  export default BookingCard
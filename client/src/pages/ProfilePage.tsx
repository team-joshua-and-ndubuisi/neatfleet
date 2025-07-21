import React from 'react';
// import {useState, useEffect} from 'react';
// import axios from "axios";
import BookingCard from '@/components/profile/BookingCard'
import BookingSnippet from '@/components/profile/BookingSnippet'
import ProfileMain from '@/components/profile/ProfileMain'
import ProfileContainer from '@/components/profile/ProfileContainer'

//for when the api is set up
// const endpoint='/profile'
// const URL = 'http://localhost5432'+endpoint

const userData = {
  type: "driver",
  name: "JohnDoe123",
  bc: 42,
  years: 5,
  rating: 4.7,
  bookings: [
    {
      name: "Alice Johnson",
      status: "completed",
      date: 1672531200000, // January 1, 2023
      details: "Airport transfer from downtown to JFK",
      rating: 5
    },
    {
      name: "Robert Smith",
      status: "completed",
      date: 1675209600000, // February 1, 2023
      details: "Business meeting commute",
      rating: 4
    },
    {
      name: "Maria Garcia",
      status: "cancelled",
      date: 1677888000000, // March 3, 2023
      details: "Weekend city tour",
      rating: 0
    },
    {
      name: "James Wilson",
      status: "upcoming",
      date: 1680566400000, // April 5, 2023
      details: "Concert venue drop-off",
      rating: 0
    }
  ],
  location: "New York, NY",
  image: "https://example.com/profile-pictures/johndoe.jpg"
};

const ProfilePage: React.FC = () => {
// const [userData, setUserData]=useState(null)
let bookings = userData.bookings

// useEffect(() =>{
//Fetch for user model + bookings
//      axios.get(URL).then((response) => {
//        setUserData(response.data);
//      })
//      let bookings:[] = userData.bookings
// }, [])
  return(
    <div>
      <ProfileContainer>
        <ProfileMain
          userType={userData.type}
          userName={userData.name}
          bookingsCompleted={userData.bc}
          years={userData.years}
          rating={userData.rating}
          bookings={userData.bookings.length}
          location={userData.location}
          image={userData.image}
        />
        <BookingSnippet>
           { bookings.map((booking, index)=>{
            return <BookingCard
                key={index}
                name={booking.name}
                status={booking.status}
                date={booking.date}
                details={booking.details}
                rating={booking.rating}
               />

            })}

        </BookingSnippet>
      </ProfileContainer>
    </div>
  )

}

export default ProfilePage

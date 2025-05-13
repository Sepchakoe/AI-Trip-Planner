import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/config/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { GrSend } from "react-icons/gr";
import placeholder from '@/assets/placeholder.jpg';


function InfoSection({trip}) {

  const [photoUrl,setPhotoUrl] = useState();

  useEffect(()=>{
    trip && GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userPreference?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name);

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <div>
        <img src = {photoUrl?photoUrl:{placeholder}} className='h-[340px] w-full object-cover rounded-xl'/>

        <div className='flex justify-between items-center'>
            <div className=' my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userPreference?.location?.label}</h2>
                <div className=' hidden sm:flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📅 {trip.userPreference?.noOfTrips} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰 {trip.userPreference?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🥂 Traveler: {trip.userPreference?.noOfTraveler} </h2>
                </div>
            </div>
            {/* <Button><GrSend /></Button> */}
        </div>
    </div>
  )
}

export default InfoSection
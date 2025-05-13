import { GetPlaceDetails, PHOTO_REF_URL } from '@/config/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import hotelImg from '@/assets/Hotel.jpg';


function HotelCardItem({ hotel }) {

  const [photoUrl,setPhotoUrl] = useState();
  useEffect(()=> {
    hotel && GetPlacePhoto();
  },[hotel])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:hotel?.hotelName
    }

    try {
      const resp = await GetPlaceDetails(data);
      const photos = resp?.data?.places?.[0]?.photos;

      if (photos && photos.length > 0) {
        const photoName = photos[0].name; // safer than photos[3]
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl(null); // fallback
      }
    } catch (error) {
      console.error('Error fetching hotel image:', error);
      setPhotoUrl(null);
    }
  };
  //   const result = await GetPlaceDetails(data).then(resp => {
  //     console.log(resp.data.places[0].photos[3].name);

  //     const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
  //     setPhotoUrl(PhotoUrl);
  //   })
  // }
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} target='_blank' >
            <div className='hover:scale-105 transition-all cursor-pointer'>

                <img src = {photoUrl || hotelImg} className='rounded-xl h-[180px] w-full object-cover' />
                
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium '>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500 '>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐ {hotel?.rating}</h2>

                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem


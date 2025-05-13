import { GetPlaceDetails, PHOTO_REF_URL } from '@/config/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import placeImg from '@/assets/places.jpg';


function UserTripCardItem({trip}) {
    const [photoUrl,setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userPreference?.location?.label
    }

    try {
      const resp = await GetPlaceDetails(data);
      const photos = resp?.data?.places?.[0]?.photos;

      if (photos && photos.length > 0) {
        const photoName = photos[0].name;
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl(null); // fallback
      }
    } catch (error) {
      console.error('Error fetching trip photo:', error);
      setPhotoUrl(null);
    }
  };
  //   const result=await GetPlaceDetails(data).then(resp=>{
  //     console.log(resp.data.place[0].photos[3].name);

  //     const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
  //     setPhotoUrl(PhotoUrl);
  //   })
  // }
  return (
    <Link to={'/view-trip/' + trip?.id}>
    <div className = 'hover:scale-105 transition-all '>
        <img src={photoUrl || placeImg }
        className="object-cover rounded-xl h-[220px]"/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userPreference?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userPreference.noOfTrips} Days trip with {trip?.userPreference?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
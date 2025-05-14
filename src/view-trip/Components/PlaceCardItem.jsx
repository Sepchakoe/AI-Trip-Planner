import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/config/GlobalAPI";
import { FaMapLocationDot } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeImg from "@/assets/places.jpg";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };

    try {
      const response = await GetPlaceDetails(data);
      const photos = response?.data?.places?.[0]?.photos;

      if (photos && photos.length > 0) {
        const photoName = photos[0].name; // to be safer than photos[3]
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl(null); // fallback
      }
    } catch (error) {
      console.error("Error loading place image:", error);
      setPhotoUrl(null);
    }
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        place.placeName +
        "," +
        place?.placeAddress
      }
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={{ photoUrl } || placeImg}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />

        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <p className="mt-2">🎫 {place.ticketPricing}</p>
          <p className="text-sm mt-2 text-orange-950">
            🕦 {place.timeToTravel}
          </p>
          {/* <Button size="sm"><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;

import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlaceToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div className="mt-3">
            <h2 className="font-medium text-lg">{item.day}</h2>
            <div className="grid gap-5">
              {item.plan.map((place, index) => (
                <div>
                  <h2 className="font-medium text-sm text-orange-700 mt-2">
                    {place.time}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceToVisit;

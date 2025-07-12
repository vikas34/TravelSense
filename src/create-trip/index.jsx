import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-30 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preference</h2>
      <p className="mt-3 text-gray-600 text-medium font-bold">
        Just provide some basic imformation, and our &nbsp;
        <span className="text-blue-400 font-bold">Travel</span>
        <span className="text-orange-500 font-bold">Sense</span> &nbsp;will
        generate a customized itinerary based on your preference.{" "}
      </p>

      <div className="mt-20">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is Destination of Choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                console.log(v);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;

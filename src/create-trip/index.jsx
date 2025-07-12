import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelsList } from "@/Constants/Options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = () => {
    if (formData.noOfDays > 15) {
      return;
    }
    console.log(formData);
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-30 px-5 mt-15 mb-15">
      <h2 className="font-bold text-3xl">
        Tell us your travel preference 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-600 text-medium font-bold">
        Just provide some basic imformation, and our &nbsp;
        <span className="text-blue-400 font-bold">Travel</span>
        <span className="text-orange-500 font-bold">Sense</span> &nbsp;will
        generate a customized itinerary based on your preference.{" "}
      </p>

      <div className="mt-20 flex flex-col gap-8  ">
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
                handleInputChange("location", v);
                // console.log(v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            {" "}
            How many days are planning your trip?
          </h2>
          <Input
            placeholder={"Ex-5"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div className="">
          <h2 className="text-xl my-3 font-medium"> What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5 cursor-pointer">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg 
                  ${formData.budget == item.title && "shadow-lg border-black"}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <h2 className="text-xl my-3 font-medium">
            {" "}
            Who do you plan on travelling with on your next advanture?{" "}
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5 cursor-pointer">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("members", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg 
                  ${
                    formData.members == item.people && "shadow-lg border-black"
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" text-center my-10">
        <Button onClick={onGenerateTrip} className=" cursor-pointer ">
          {" "}
          Generate Trip
        </Button>
      </div>
    </div>
  );
};

export default CreateTrip;

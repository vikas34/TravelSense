import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  SelectBudgetOptions,
  SelectTravelsList,
  AI_Prompt,
} from "@/Constants/Options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Current Form Data:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  // ✅ Make this async!
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      !formData.location ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.members
    ) {
      toast("Please fill all the details.");
      return;
    }

    if (Number(formData.noOfDays) > 5) {
      toast("Trip duration should not exceed 5 days.");
      return;
    }

    const FINAL_PROMPT = AI_Prompt.replace(
      "{location}",
      formData.location.label
    )
      .replace("{totalDays}", formData.noOfDays)
      // .replace("{members}", `${formData.members} people`)
      .replace("{members}", formData.members)

      .replace("{budget}", formData.budget);

    console.log("FINAL_PROMPT:", FINAL_PROMPT);

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: FINAL_PROMPT }],
          },
        ],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      const generatedText =
        result?.candidates?.[0]?.content?.parts?.[0]?.text || "No output";

      console.log("Generated Itinerary:", generatedText);
      toast("Check console for your generated trip!");
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Something went wrong while generating your trip.");
    }

    console.log(result.response.text());
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        onGenerateTrip();
        setOpenDialog(false);
        console.log(resp);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
    console.log("User Profile:", userInfoResponse.data);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-30 px-5 mt-15 mb-15">
      <h2 className="font-bold text-3xl">
        Tell us your travel preference 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-600 text-medium font-bold">
        Just provide some basic information, and our{" "}
        <span className="text-blue-400 font-bold">Travel</span>
        <span className="text-orange-500 font-bold">Sense</span> will generate a
        customized itinerary based on your preference.
      </p>

      <div className="mt-20 flex flex-col gap-8">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning for your trip?
          </h2>
          <Input
            placeholder="Ex: 5"
            type="number"
            min={1}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5 cursor-pointer">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg ${
                  formData.budget === item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5 cursor-pointer">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("members", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg ${
                  formData.members === item.people && "shadow-lg border-black"
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

      <div className="text-center my-10">
        <Button onClick={onGenerateTrip} className="cursor-pointer">
          Generate Trip
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" alt="" style={{ height: "110px" }} />
              <h2 className="font-bold text-lg mt-7">Sign-In with Google</h2>
              <p>Sign-In to the app with Google authentication securly.</p>

              <Button
                onClick={login}
                className="mt-5 w-full flex gap-3 items-center"
              >
                <FcGoogle className="h-7 w-7" /> Sign-In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;

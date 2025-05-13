import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { chatSession } from "@/config/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess:(codeResp) => GetUserProfile(codeResp),
    onError:(error) => console.log(error)
  })

  const OnGenerateTrip = async() => {

    const user = localStorage.getItem('user');

    if(!user)
    {
      setOpenDialog(true)
      return;
    }

    if (!formData?.location || !formData?.noOfTrips || !formData?.budget || !formData?.noOfTraveler) 
    {
      toast("Please fill all the details.")
      return;
    }
    
    setLoading(true);
    toast('Please wait... We are working on it...')

    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfTrips)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfTrips)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--",result?.response?.text());
    setLoading(false);
    SaveAITrip(result?.response?.text())
  }

  const SaveAITrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()

    await setDoc(doc(db, "AITrips", docId), {
      userPreference: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId)
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>

          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
            place, 
            onChange:(v) => {setPlace(v); handleInputChange('location', v)}
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Example: 3'} type="number" 
            onChange={(e)=>handleInputChange('noOfTrips', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index)=>(
              <div key={index} 
                onClick={()=>handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-xl hover:shadow-lg
              ${formData?.budget == item.title && 'shadow-lg border-black'}
              `}>
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How do you plan to travel with?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index)=>(
              <div key={index} 
                onClick={()=>handleInputChange('noOfTraveler', item.people)}
              className={`p-4 border cursor-pointer rounded-xl hover:shadow-lg
              ${formData?.noOfTraveler == item.people && 'shadow-lg border-black'}
              `}>
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button 
          disabled = {Loading}
        onClick={OnGenerateTrip}>
          {Loading ?
          <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/>: 'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>        
        <DialogContent>
          <DialogHeader>
          <DialogTitle className="text-center">
            <img src='/logo.svg' className="w-28 mx-auto mb-4" alt="Logo" />
            Sign In with Google
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in to the App with Google authentication securely.
          </DialogDescription>

          <Button 
          onClick={login}
          className="w-full mt-5 flex gap-4 items-center">
            <FcGoogle className="h-7 w-7"/>
            Sign In With Google
          </Button>
          
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip
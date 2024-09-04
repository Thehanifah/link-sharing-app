/* eslint-disable react-hooks/exhaustive-deps */
import { HiOutlinePhoto } from "react-icons/hi2";
import { StateContext } from "../context/state";
import React, { useContext, useState, useEffect, ChangeEvent, FormEvent} from "react";
import { createOrUpdateUserProfile, getUserProfile, deleteUserProfile } from '../app/firebase/firebaseFunctions';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../app/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";





interface StateContextType {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    Lname: string;
    setLName: React.Dispatch<React.SetStateAction<string>>;
    emailad: string;
    setEmailad: React.Dispatch<React.SetStateAction<string>>;
    selectedPlatform: string;
    setSelectedPlatform: React.Dispatch<React.SetStateAction<string>>;
  }
  
  // Profile data type
  interface ProfileData {
    name: string;
    Lname: string;
    emailad: string;
    photoURL: string;
  }
  
  function AddProfile() {
      const { name, setName, Lname, setLName, emailad, setEmailad, selectedPlatform, setSelectedPlatform } = useContext<StateContextType>(StateContext);
      const [user] = useAuthState(auth);
      const router = useRouter();
      const [userSession, setUserSession] = useState<string | null>(null);
      const [photoURL, setPhotoURL] = useState<string>("");
      const [isLoading, setIsLoading] = useState<boolean>(false);
  
      useEffect(() => {
          if (user) {
            fetchUserProfile();
          }
      }, [user]);
      
      async function fetchUserProfile() {
          if (user) {
            setIsLoading(true);
            const userProfile = await getUserProfile(user.uid);
            if (userProfile) {
              setName(userProfile.name || "");
              setLName(userProfile.Lname || "");
              setEmailad(userProfile.emailad || "");
              setPhotoURL(userProfile.photoURL || "");
            }
            setIsLoading(false);
          }
      }
      
      async function handleProfileSubmit(e: FormEvent<HTMLFormElement>) {
          e.preventDefault();
          if (!user) return;
          setIsLoading(true);
          const profileData: ProfileData = {
            name,
            Lname,
            emailad,
            photoURL,
          };
          await createOrUpdateUserProfile(user.uid, profileData);
          setIsLoading(false);
      }
      
      async function handleDeleteProfile() {
          if (user && window.confirm("Are you sure you want to delete your profile?")) {
            setIsLoading(true);
            await deleteUserProfile(user.uid);
            setName("");
            setLName("");
            setEmailad("");
            setPhotoURL("");
            setIsLoading(false);
          }
      }
      
      async function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
          const file = e.target.files?.[0];
          if (file && user) {
            setIsLoading(true);
            const storage = getStorage();
            const storageRef = ref(storage, `profilePhotos/${user.uid}`);
            try {
              const snapshot = await uploadBytes(storageRef, file);
              const downloadURL = await getDownloadURL(snapshot.ref);
              setPhotoURL(downloadURL);
              await createOrUpdateUserProfile(user.uid, { photoURL: downloadURL });
            } catch (error) {
              console.error("Error uploading photo: ", error);
            }
            setIsLoading(false);
          }
      }

      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleProfileSubmit(e);
    };
// const {
//     name: contextName, 
//     setName: contextsetName, 
//     Lname:contextLName, 
//     setLName: contextsetLName, 
//     emailad: contextemailad,
//   setEmailad: contextsetEmailad
//  } = useContext(StateContext);
  return (
    <> <div className="w-full h-auto sm:h-[834px] rounded-[12px] bg-white">
    <div className="w-full h-[auto] sm:h-[739px] p-[40px] gap-[40px] flex flex-col">
        <div>
            <p className="text-[#333333] font-instrument-sans text-[24px] md:text-[32px] font-bold leading-[48px] text-left">
                Profile details
            </p>
            <p className="text-[#737373] font-instrument-sans text-[16px] font-normal leading-[24px] text-left">
                Add your details to create a personal touch to your profile.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full h-auto flex flex-col justify-between gap-[24px]">
            <div className="w-full h-auto p-[20px] rounded-[12px] bg-[#FAFAFA] flex flex-col sm:flex-row justify-between items-start md:items-center">
                <p className="text-[#888888] font-[Instrument Sans] text-[16px] font-normal leading-[24px] text-left mb-3 md:mb-0">
                    Profile picture
                </p>

                <div className="md:w-[432px] w-[70%] flex flex-col sm:flex-row justify-between items-start lg:w[60%] md:items-center">
                    <div className="w-[193px] h-[193px] rounded-[12px] bg-[#EFEBFF] text-[#633CFF] mb-3 md:mb-0 flex flex-col justify-center items-center">
                        {photoURL ? (
                            <Image src={photoURL} alt="Profile" width={193} height={193} className="rounded-[12px]" />
                        ) : (
                            <>
                                <HiOutlinePhoto className="text-[32px]" />
                                <label htmlFor="photo-upload" className="cursor-pointer">
                                    <span className="font-instrument-sans text-[16px] font-semibold leading-[24px]">
                                        +Upload Photo
                                    </span>
                                </label>
                            </>
                        )}
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                        />
                    </div>
                    <p className="font-instrument-sans text-[12px] md:w-[40%] font-normal w-full lg:w-[215px] leading-[18px] text-[#737373] text-left">
                        Image must be below 1024x1024px. Use PNG or JPG format.
                    </p>
                </div>
            </div>

            <div className="w-full h-auto p-[20px] gap-[12px] rounded-[12px] bg-[#FAFAFA]">
                <div className="space-y-4">
                    <div className="flex sm:items-center items-start justify-between flex-col sm:flex-row">
                        <label
                            htmlFor="first-name"
                            className="font-instrument-sans text-[16px] font-medium text-[#333333]"
                        >
                            First Name
                        </label>
                        <input
                            id="first-name"
                            type="text"
                            className="input-page lg:w-[432px] sm:w-[70%] w-full px-3 py-2 border focus:outline-none m-0 border-[#D9D9D9] rounded-md font-instrument-sans text-[16px] text-[#333333]"
                            placeholder="e.g John"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex sm:items-center items-start justify-between flex-col sm:flex-row">
                        <label
                            htmlFor="last-name"
                            className="font-instrument-sans text-[16px] font-medium text-[#333333]"
                        >
                            Last Name
                        </label>
                        <input
                            id="last-name"
                            type="text"
                            className="input-page lg:w-[432px] sm:w-[70%] w-full px-3 py-2 border focus:outline-none border-gray-300 rounded-md font-instrument-sans text-[16px] text-[#333333]"
                            placeholder="e.g. Appleseed"
                            value={Lname}
                            onChange={(e) => setLName(e.target.value)}
                        />
                    </div>

                    <div className="flex sm:items-center items-start justify-between flex-col sm:flex-row">
                        <label
                            htmlFor="email"
                            className="font-instrument-sans text-[16px] font-medium text-[#333333]"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="input-page lg:w-[432px] sm:w-[70%] m-0 w-full px-3 py-2 border focus:outline-none border-gray-300 rounded-md font-instrument-sans text-[16px] text-[#333333]"
                            placeholder="e.g example@example.com"
                            value={emailad}
                            onChange={(e) => setEmailad(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-between">
                <button
                    type="button"
                    onClick={handleDeleteProfile}
                    className="sm:w-[91px] w-[45%] h-[46px] p-[11px] text-white px-[27px] rounded-[8px] bg-red-500"
                    disabled={isLoading}
                >
                    Delete
                </button>
                <button
                    type="submit"
                    className="sm:w-[91px] w-[45%] h-[46px] p-[11px] text-white px-[27px] rounded-[8px] bg-[#633CFF]"
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    </div>
</div>

    </>
  )
}

export default AddProfile





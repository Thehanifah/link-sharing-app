"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase/config";
import { useRouter } from "next/navigation";
import React, { useEffect, useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaLink } from "react-icons/fa6";
import "./page.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import SocialMediaForm from "../components/SocialMediaForm";
import { StateContext } from "../context/state";
import DisplaySelectedPlatforms from "../components/DisplaySelectedPlatforms";
import AddLinkButton from "../components/AddLinkButton"
import AddProfile from "../components/AddProfile";






export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [userSession, setUserSession] = useState(null);
  const {name, setName, Lname, setLName, emailad, setEmailad, selectedPlatform, setSelectedPlatform} = useContext(StateContext)
  const [showProfile, setShowprofile] = useState<boolean>(true);
  const [showLinks, setShowlinks] = useState<boolean>(false);
  
  

  

  const {
    name: contextName, 
    setName: contextsetName, 
    Lname:contextLName, 
    setLName: contextsetLName, 
    emailad: contextemailad,
  setEmailad: contextsetEmailad
 } = useContext(StateContext);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session:any = sessionStorage.getItem('user');
      setUserSession(session);
    }
  }, []);

  console.log({ user, userSession });
  console.log({user})

  if (!user && !userSession){
   return  router.push('/sign-up')
  } ;

  


  const handleShowprofile = () => {
    setShowprofile(true);
    setShowlinks(false);
  };

  const handleShowlinks = () => {
    setShowprofile(false);
    setShowlinks(true);
  };

    

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100">
      <nav className="w-full max-w-[1440px] h-[126px] p-[24px] flex items-center justify-between bg-gray-100">
        <div className="w-full max-w-[1392px] h-[78px] pl-[24px] pr-[16px] pt-[16px] pb-[16px] flex items-center justify-between gap-[8px] bg-white rounded-[12px]">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="logo" width={27} height={27} className="w-10 h-10 mr-2" />
            <h2 className="text-2xl font-bold text-[#333333] sm:block hidden">
              devlinks
            </h2>
          </div>

          <div className="flex items-center md:gap-2 gap-0">
            <button
              onClick={handleShowlinks}
              className={`w-auto nav-btn flex  items-center justify-between h-auto px-[27px] py-[11px] gap-[8px] rounded-[8px] font-instrument-sans text-[16px] font-semibold leading-[24px] text-left bg-none text-[#737373] hover:text-[#633CFF] ${
                showLinks ? "bg-[#EFEBFF] text-[#633CFF]" : ""
              }`}
            >
              <FaLink
                className={`font-extrabold text-[24px] ${
                  showLinks ? "text-[#633CFF]" : ""
                } `}
              />
              <span
                className={`sm:block hidden ${
                  showLinks ? "text-[#633CFF]" : ""
                } `}
              >
                Links
              </span>
            </button>
            <button
              onClick={handleShowprofile}
              className={`w-auto nav-btn flex  items-center justify-between h-auto px-[27px] py-[11px] gap-[8px] rounded-[8px] font-instrument-sans text-[16px] font-semibold leading-[24px] text-left bg-none text-[#737373] hover:text-[#633CFF] ${
                showProfile ? "bg-[#EFEBFF] text-[#633CFF]" : ""
              }`}
            >
              <CgProfile
                className={`font-extrabold  text-[24px] ${
                  showProfile ? "text-[#633CFF]" : ""
                }`}
              />
              <span
                className={`sm:block hidden ${
                  showProfile ? "text-[#633CFF]" : ""
                } `}
              >
                Profile Details
              </span>
            </button>
          </div>

          <div className="flex items-center">
            <button className="w-auto h-auto sm:px-[27px] px-4 hover:bg-[#EFEBFF]  py-[11px] gap-[8px] rounded-[8px] font-instrument-sans text-[16px] font-semibold leading-[24px] text-left bg-none border border-[#633CFF] text-[#633CFF]">
              <MdOutlineRemoveRedEye className="font-extrabold sm:hidden block text-[24px]" />{" "}
              <span className="sm:block hidden">Preview</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex w-full max-w-[1440px] h-[858px] p-[24px] gap-[24px] mx-auto pt-0 ">
      <div className="relative w-[40%] h-[834px] pt-[24px] rounded-[12px] bg-white hidden md:block">
       <div className="mock-up absolute inset-0 flex items-center justify-center">
      <svg width="308" height="632" viewBox="0 0 308 632" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z" stroke="#737373"/>
      <path d="M12 55.5C12 30.9233 31.9233 11 56.5 11H80.5C86.8513 11 92 16.1487 92 22.5C92 30.5081 98.4919 37 106.5 37H201.5C209.508 37 216 30.5081 216 22.5C216 16.1487 221.149 11 227.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z" fill="white" stroke="#737373"/>
        </svg>
        </div>
       <div className="absolute inset-0 flex flex-col items-center justify-center w-full">
        <div className="tops mb-4 flex flex-col items-center justify-center ">
        {!contextName && !contextLName ? (
    <div className="h-[96px] w-[96px] rounded-full bg-[#EEEEEE] mb-4"></div>
  ) : ""}
  
  {!contextName && !contextLName ? (
    <div className="w-[160px] h-[16px] rounded-[12px] bg-[#EEEEEE] mb-2 placeholder"></div>
  ) : (
    <p className="font-instrument-sans text-lg font-semibold leading-[27px] text-center name text-[#333333]">
      {contextName} {contextLName}
    </p>
  )}
  
  {!contextemailad ? (
    <div className="w-[72px] h-[8px] rounded-[12px] bg-[#EEEEEE] placeholder"></div>
  ) : (
    <p className="font-instrument-sans text-sm font-normal leading-[21px] text-center text-[#737373] name">
      {contextemailad}
    </p>
  )}</div>
           

        <div className="tops w-[40%] h-[300px] flex flex-col items-center gap-6 mt-6">
        <DisplaySelectedPlatforms/>
        <div className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] "></div>
        <div className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] "></div>
        <div className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] "></div>
        <div className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] "></div>
        <div className="w-full h-[44px] rounded-[12px] bg-[#EEEEEE] "></div>
        </div>
       </div>
       </div>
       
        {showProfile && (
          <div className=" md:w-[60%] w-[100%] sm:h-[834px] h-[fit-content] rounded-[12px] bg-white ">
        <AddProfile/>  </div>
        )}

        {showLinks && (
          <div className="md:w-[60%] w-[100%]  sm:h-[834px] h-[fit-content] rounded-[12px] bg-white">
            <div className="w-full h-[739px] p-[40px] gap-[40px] flex flex-col justify-between ">
              <div>
                <p className="text-[#333333] font-instrument-sans text-[24px] md:text-[32px] font-bold leading-[48px] text-left">
                  Customize your links
                </p>
                <p className="text-[#737373] font-instrument-sans  text-[16px] font-normal leading-[24px] text-left">
                  Add/edit/remove links below and then share all your profiles
                  with the world!
                </p>
              </div>
              <AddLinkButton/>
                              
              <SocialMediaForm/>
              
            </div>

            <div className="w-full h-[95px] p-[40px] flex flex-col justify-center items-end border border-t-gray">
              <button className="sm:w-[91px] w-full h-[46px] p-[11px] text-white px-[27px] rounded-[8px]  bg-[#633CFF] ">
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

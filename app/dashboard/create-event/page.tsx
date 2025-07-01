
/* eslint-disable react/jsx-no-undef */
"use client";
import { useState } from "react";
import Image from "next/image";
import { Check, CheckCircle, ChevronDown, ChevronUp, Crown, MapPin, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X, 
  Calendar,
  Users,
  Clock,
  Settings,
  HelpCircle,
   Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { FiPlus, FiBell, FiChevronDown, FiMapPin, FiSearch } from "react-icons/fi";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false)
  const [rsvpStatus, setRsvpStatus] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();
  const [showOrganizerModal, setShowOrganizerModal] = useState(false)




    

      

  const handleContinue = () => {
    setShowModal(false);
    router.push("/create-event"); // navigation to creation page
  };

           {/** function to navigate to the RSVP section */}
  const handleRSVPClick = (eventName: string) => {
    setShowNotifications(false)
    router.push("/create-event")
           }


           {/** function to navigate to the VIEW TICKETS section */}
  const handleViewTicketsClick = (eventName: string) => {
    setShowNotifications(false)
    router.push("/tickets")
           }

const handleRSVPConfirm = () => {
    if (rsvpStatus === "confirm") {
      setShowConfirmation(true)
      setTimeout(() => setShowConfirmation(false), 3000)
    }
  }

           

 

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900  text-white">
      {/* Sidebar */}
      <aside
        className={`bg-black fixed top-0 left-0 z-20 transition-all duration-300 h-screen ${
          sidebarOpen ? "w-1/5" : "w-20"
        } p-4`}
      >
        <div className="flex items-center justify-between mb-6">

             {/** for the clust icon */}

                      <a href="./"> <Image 
                      src="image\Frame 2147224772.svg" 
                      alt="Clust-logo" 
                      width={50} 
                      height={50}   
                      />
                      </a>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
        <hr className="border-gray-700 mb-4" />
        <nav className="space-y-4">
          <NavItem icon={<Menu />} label="Dashboard" sidebarOpen={sidebarOpen} />
          <NavItem icon={<Calendar />} label="Events" sidebarOpen={sidebarOpen} />
          <NavItem icon={<Users />} label="Groups" sidebarOpen={sidebarOpen} />
          <NavItem icon={<Clock />} label="Rsvp" sidebarOpen={sidebarOpen} />
          <NavItem icon={<Settings />} label="Settings" sidebarOpen={sidebarOpen} />
          <NavItem icon={<HelpCircle />} label="Help" sidebarOpen={sidebarOpen} />
        </nav>
      </aside>

      {/* Main layout */}
      <div
        className={`flex flex-col flex-1 ${
          sidebarOpen ? "ml-[20%]" : "ml-[5rem]"
        } h-screen`}
      >
        {/* Topbar */}
           <nav className="flex items-center justify-between border-b p-4">

    {/** for the search bar */}
             <div className="flex items-center border-1 border-[#EFEFEF] rounded-full px-3 py-2.5 w-[40%] mx-4">
                 <FiSearch className="mr-2 text-xs text-[#C8CCD0]" />
                 <p className="text-xs text-[#C8CCD0]">Search for group or evevnts</p>
                 <div className="border border-[#EFEFEF] h-5 ml-20"></div>
                 <FiMapPin className="ml-2 text-[#595959]"/>
                 <p className="text-xs ml-2 text-[#C8CCD0]">Location...</p>
             </div> 

             {/*** for the create button */}
                          <div className="flex items-center gap-10">
                                   <button  onClick={() => setShowOrganizerModal(true)} className="bg-[#1BAAF8] text-white text-xs px-3 py-2 rounded-sm flex items-center gap-2">
                                        <FiPlus /> <p>Create Event</p>
                                   </button>
              {showOrganizerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        
          <div className="absolute inset-0  bg-opacity" onClick={() => setShowOrganizerModal(false)}></div>

        
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            
            <button
              onClick={() => setShowOrganizerModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

           
            <div className="mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                <Crown className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">You are about to be an Organizer</h2>

            <p className="text-gray-600 mb-6 font-medium">You have the power to:</p>

            <ul className="text-left space-y-3 mb-8 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Create and host events for free or paid
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Share event links and invite people directly
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                       Collect feedback after your event  
            </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
               Upload images, videos or event flyers
              </li>
            </ul>

            <button
              className="w-[55%] rounded-md bg-[#1BAAF8] mb-8 hover:bg-blue-700 text-white py-2"
              onClick={() => {
                
                setShowOrganizerModal(false)
               
                console.log("Navigate to event creation page")
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}


                                   {/** the notification button */}
                                   <div   className="relative cursor-pointer"
                                onClick={() => setShowNotifications(true)}>
                                    <FiBell  size={20}/>
                                    <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span>   
                                   {showNotifications && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowNotifications(false)}></div>

          <div className="absolute right-0 top-0 h-[95%] w-200 bg-white shadow-2xl overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className=" text-black text-xl font-semibold">Notifications</h2>
                <div className="flex items-center">

                </div>
                <button
                  className="text-blue-600 text-xl font-medium hover:text-blue-700"
                  onClick={() => {
                  }}
                >
                  Mark all as read
                </button>
                 
              </div>


              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-xl font-medium text-gray-900 border-b-1 border-text-[#595959] pb-2">
                  All
                  <span className="bg-[#EBF8FE] text-black text-xl px-2 py-1 rounded-full">2</span>
                </button>
                <button className="text-xl text-gray-500 hover:text-gray-700 pb-2">Unread</button>
                <button className="text-xl text-gray-500 hover:text-gray-700 pb-2">Favorite</button>
              </div>
              <hr className="text-[#595959] text-xs " />
            </div>
            <div>
              <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="relative">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Image src="/image/fluent-color_mail-16 (2).svg" 
                      alt="Clust-logo" 
                      width={30} 
                      height={30} />
                  </div>
                  
                  <div className="absolute -top-0.5 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                
                </div>
                
                <div className="flex-1">
                  <p className="text-base text-gray-700">
                    <span className="font-bold">John,</span> you have been invited to{" "}
                    <span className="font-bold">&quot;Music live concert"</span> secure
                    <br />
                    <span>your spot now!</span>
                  </p>
                </div>
                <button className="bg-[#EBF8FE] hover:bg-blue-700 text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                  onClick={() => handleRSVPClick("Music live concert")}>
                  RSVP NOW
                </button>
              </div>
                            <hr className="text-[#595959] w-[90%] text-xs ml-10" />

              <div className="flex items-start gap-3 p-5 hover:bg-gray-50 rounded-lg">
                <div className="relative">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                       <Image src="/image/fluent-color_mail-16 (1).svg" 
                      alt="Clust-logo" 
                      width={50} 
                      height={50} />
                  </div>
                  <div className="absolute -top-0.5 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-base text-gray-700 mb-2">
                    <span className="font-bold">Ticket Confirmed!</span> your ticket for have been invited to{" "}
                    <span className="font-bold">&quot;Summer
                      <br />
                       Beach Brunch&quot;</span> secure your spot now!
                  </p>
                </div>
                <button  className="bg-[#EBF8FE] hover:bg-blue-700 text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                  onClick={() => handleViewTicketsClick("Summer Beach Brunch")}>
                  VIEW TICKETS
                </button>
              </div>
              <hr className="text-[#595959] w-[90%] text-xs ml-10" />
              <div className="flex items-start gap-3 p-5 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center">
                  <Image src="/image/fluent-color_mail-16.svg" 
                      alt="Clust-logo" 
                      width={50} 
                      height={50} />
                </div>
                <div className="flex-1">
                  <p className=" text-gray-700 text-base mb-2">
                    <span className="font-bold ">John,</span> your rsvp to{" "}
                    <span className="font-bold">"Summer 
                      Beach Brunch"</span> is still pending.
                    <br />
                    Kindly Confirm your attendance.
                  </p>
                </div>
                <button  className="bg-[#EBF8FE] hover:bg-blue-700 text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                  onClick={() => handleRSVPClick("Music live concert")}>
                  RSVP NOW
                </button>
              </div>
              <hr className="text-[#595959] w-[90%] text-xs ml-10" />
              <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                       <Image src="/image/fluent-color_mail-16 (2).svg" 
                      alt="Clust-logo" 
                      width={50} 
                      height={50} />               
                       </div>
                <div className="flex-1 ">
                  <p className=" text-gray-700 text-base mb-2">
                    <span className="font-bold">John,</span> you have been invited to{" "}
                    <span className="font-bold">"Fitness Fest 2025"
                      </span> secure 
                      <br/>
                      <span>  your spot now!</span> 
                  </p>
                </div>
                <button  className="bg-[#EBF8FE] hover:bg-blue-700 text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                  onClick={() => handleRSVPClick("Music live concert")}>
                  RSVP NOW
                </button>
              </div>
              <hr className="text-[#595959] w-[90%] text-xs ml-10" />
              <div className="flex items-start gap-3 p-5 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center">
                     <Image src="/image/fluent-color_mail-16 (1).svg" 
                      alt="Clust-logo" 
                      width={50} 
                      height={50} />               
                       </div>               
                <div className="flex-1">
                   <p className="text-base text-gray-700 mb-2">
                    <span className="font-bold">Ticket Confirmed!</span> your ticket for have been invited to{" "}
                    <span className="font-bold">&quot;Summer 
                      <br/>
                      Beach Brunch&quot;</span> secure your spot now!
                  </p>
                </div>
                <button  className="bg-[#EBF8FE]  hover:bg-blue-700 text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                  onClick={() => handleViewTicketsClick("Summer Beach Brunch")}>
                            VIEW TICKETS
                 </button>
              </div>
              <hr className="text-[#595959] w-[90%] text-xs ml-10" />
              <div className="flex items-start gap-3 p-5 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center">
                     <Image src="/image/fluent-color_mail-16.svg" 
                      alt="Clust-logo" 
                      width={50} 
                      height={50} />               
                       </div>               
                <div className="flex-1">
                  <p className=" text-gray-700 text-base ">
                    <span className="font-bold">John,</span> your rsvp to{" "}
                    <span className="font-bold">"Summer Beach Brunch"</span> is still pending.
                    <br />
                    Kindly Confirm your attendance.
                  </p>
                </div>
                <button  className="bg-[#EBF8FE]  hover:bg-blue-700 text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                  onClick={() => handleRSVPClick("Music live concert")}>
                            RSVP
                 </button>
              </div>
                                          <hr className="text-[#595959] w-[90%] text-xs  ml-10" />

            </div>
          </div>
        </div>
      )}                     
   </div>  

                                   {/** for the dropdown */}                    
                                   <div className="flex items-center gap-2 relative">                               
                                    <FaUserCircle size={24}/>
                                          <div>
                                            <p className="text-xs">John</p>
                                            <p className="text-xs text-[#595959]">JohnFavor@gmail.com</p>
                                          </div>
                                          {/**for the dropdown */}
                                          <FiChevronDown 
                                          className="cursor-pointer"
                                          onClick={() => setDropdownOpen(prev => !prev)}
                                          />
                                         
                                         {dropdownOpen && (
                                            <div className="absolute top-full right-0 bg-white shadow-lg mt-2 w-48 rounded-lg  z-50 p-2">
                                                <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">Switch to Organizer</h3>
                                                <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">RSVP</h3>
                                                <hr className="text-[#595959] text-sm" />
                                                <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">Liked</h3>
                                                <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">Tickets (0)</h3>
                                                <hr className="text-[#595959] text-sm" />
                                                <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">Account settings</h3>
                                                <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">Logout</h3>
                                            </div>
                                         )
                                         }
                                   </div>
                                   <div>
        
                                   </div>
                               </div>
                               </nav>





   

                   {/** for the large image */}
        <main className="flex-1 overflow-y-auto mt-[80px] p-6">
          <section
            className="bg-cover bg-center rounded-lg h-64 mb-8 relative"
            style={{ backgroundImage: 'url("/image/Frame 2147225246.png")' }}
          >
            <div className="absolute bottom-5 left-5 space-y-2">
              <h1 className="text-3xl font-bold">Music Live Concert</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center gap-1">
                  <h3>Organized by Mainland block club.</h3>
                </div>
              </div>
            </div>
          </section>

     
     
  {/* for the event details container */}
        <div className="w-[70%] mx-auto mb-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Date</h3>
                <h3 className="font-bold">22nd January, 2025</h3>
              </div>


 <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Time</h3>
                <h3 className="font-bold">4:00 PM WAT</h3>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Location</h3>
                <h3 className="font-bold">Johnson Jakande Tinubu (JJT) Park</h3>
              </div>
            </div>
          </div>
        </div>

        {/* for the two divs */}
        <div className="flex gap-8">
          {/* for the first div */}
          <div className="flex-1">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">About Event</h1>
                <p className="text-gray-600 mb-8">Get ready for an unforgettable night of music, energy, and pure vibes at Soundwave Live 2025  the city’s biggest outdoor music concertJoin us as we bring together some of the hottest artists, emerging talents, and surprise guest performers for a one-of-a-kind experience. Expect electrifying performances, live DJ sets, interactive art installations, and premium food & drink vendors to keep the party going.
                 Whether you're a lover of afrobeats, hip-hop, indie, or dance music — this event promises something for everyone. Don’t miss your chance to vibe with fellow music lovers under the stars and be part of a concert night to remember.</p>

                <h1 className="text-3xl font-bold mb-4">Organizer</h1>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div>
                        <h3 className="font-semibold">By Mainland Block Club • 224 followers</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                            68 events hosted
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="bg-[#0794E2] hover:bg-blue-600 text-white px-4 py-2 rounded">Follow</button>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">Event highlights</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Live performances by top-charting and emerging artists
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Stunning sunset viewing from exclusive vantage point
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">Frequently asked question</h2>
                <div className="border-b">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50"
                  >
                    <span className="font-medium">What time does the concert start?</span>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-gray-100">
                      <h2 className="font-medium">Gates open at 4:00PM, and the first act hits the stage by 6:00PM</h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - RSVP Form (Fixed) */}
          <div className="w-80">
            <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                Would you like to attend this <br /> event?
              </h3>
              <p className="text-gray-600 mb-6">Your RSVP is pending by default</p>

              <div className="space-y-4 mb-6">
                <label
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer ${
                    rsvpStatus === "confirm" ? "bg-green-50 border-green-200" : "bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="rsvp"
                    value="confirm"
                    checked={rsvpStatus === "confirm"}
                    onChange={(e) => setRsvpStatus(e.target.value)}
                    className="text-blue-500"
                  />
                  <span className="flex-1">Confirm</span>
                </label>

                <label
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer ${
                    rsvpStatus === "decline" ? "bg-red-50 border-red-200" : "bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="rsvp"
                    value="decline"
                    checked={rsvpStatus === "decline"}
                    onChange={(e) => setRsvpStatus(e.target.value)}
                    className="text-blue-500"
                  />
                  <span className="flex-1">Decline</span>
                </label>

                <label
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer ${
                    rsvpStatus === "remind" ? "bg-yellow-50 border-yellow-200" : "bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="rsvp"
                    value="remind"
                    checked={rsvpStatus === "remind"}
                    onChange={(e) => setRsvpStatus(e.target.value)}
                    className="text-blue-500"
                  />
                  <span className="flex-1">Remind me later</span>
                </label>
              </div>

              <button
                onClick={handleRSVPConfirm}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  rsvpStatus
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!rsvpStatus}
                style={{ backgroundColor: rsvpStatus ? "#0794E2" : "#E0E0E0" }}
              >
                Confirm RSVP
              </button>
            </div>
          </div>
        </div>

        {/* Success Popup */}
        {showConfirmation && (
          <div className="fixed top-24 left-80 z-50 bg-black text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">{"You're officially Confirmed"}</h3>
                <p className="text-sm text-gray-300">Ticket sent to your email</p>





            </div>
            </div>
            </div>
        )}
        </div>
        


    
      

 
         


           {/**for the footer part */}
               <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 ">
        {/* for column 1 */}
        <div className="md:w-1/4">
          <a href="./"> <Image 
                      src="image\Frame 2147224772.svg" 
                      alt="Clust-logo" 
                      width={50} 
                      height={50}   
                      />
                      </a>
          <p className="text-sm text-gray-400">
            Plan small gatherings, big moments and everything in between.
          </p>
        </div>

        {/* for column 2 */}
        <div className="md:w-1/4">
          <h2 className="text-lg font-semibold mb-2">Services</h2>
          <div className="space-y-1 text-sm text-gray-400">
            <p>Host an Event</p>
            <p>Event Reminders</p>
            <p>Create a group</p>
            <p>Terms of use</p>
          </div>
        </div>

        {/* for column 3 */}
        <div className="md:w-1/4">
          <h2 className="text-lg font-semibold mb-2">Company</h2>
          <div className="space-y-1 text-sm text-gray-400">
            <p>Careers</p>
            <p>About us</p>
            <p>Blog</p>
            <p>FAQ</p>
            <p>Privacy Policy</p>
            <p>Terms of use</p>
          </div>
        </div>

        {/* for column 4 */}
        <div className="md:w-1/4">
          <h2 className="text-lg font-semibold mb-2">Connect with us</h2>
          <div className="space-y-1 text-sm text-gray-400 mb-4">
            <p>info@clust.com</p>
            <p>0703528587</p>
            <p>08000044593</p>
          </div>
          <div className="flex gap-3 mt-2">
            <div className="bg-blue-600 p-2 rounded-full">
              <Facebook size={16} className="text-white" />
            </div>
            <div className="bg-blue-600 p-2 rounded-full">
              <Twitter size={16} className="text-white" />
            </div>
            <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-2 rounded-full">
              <Instagram size={16} className="text-white" />
            </div>
            <div className="bg-blue-700 p-2 rounded-full">
              <Linkedin size={16} className="text-white" />
            </div>
            <div className="bg-red-600 p-2 rounded-full">
              <Youtube size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, sidebarOpen }) {
  return (
    <div className="flex items-center gap-3 hover:bg-gray-800 px-3 py-2 rounded-md cursor-pointer">
      {icon}
      {sidebarOpen && <h3>{label}</h3>}
    </div>
  );
}

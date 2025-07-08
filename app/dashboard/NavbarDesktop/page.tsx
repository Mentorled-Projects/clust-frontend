

"use client";
import { useState } from "react";
import Image from "next/image";
import { Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Bell,
  Plus,
  Calendar,
  Users,
  Clock,
  Settings,
  HelpCircle,

} from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { FiPlus, FiBell, FiChevronDown, FiMapPin, FiSearch } from "react-icons/fi";

export default function NavbarDesktop() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [likedEvents, setLikedEvents] = useState(Array(6).fill(false));
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false)
  const [showOrganizerModal, setShowOrganizerModal] = useState(false)
  const [eventDetails, setEventDetails] = useState(false)
  const toggleModal = () => {
    document.body.style.overflow = "hidden"
    setShowOrganizerModal(!showOrganizerModal)
  }


  const toggleNotification = () => {
    document.body.style.overflow = "hidden"
    setShowNotifications(!showNotifications)
  }

  const router = useRouter();
  const toggleLike = (index) => {
    const updatedLikes = [...likedEvents];
    updatedLikes[index] = !updatedLikes[index];
    setLikedEvents(updatedLikes);
  }; 

    const currentIndex = 0;

      

  const handleContinue = () => {
    setShowModal(false);
    router.push("/create-event"); // navigation to creation page
  };

           {/** function to navigate to the RSVP section */}
  const handleRSVPClick = (eventName: string) => {
    setShowNotifications(false)
    router.push("dashboard/create-event")
           }


           {/** function to navigate to the VIEW TICKETS section */}
  const handleViewTicketsClick = (eventName: string) => {
    setShowNotifications(false)
    router.push("/tickets")
           }


           
           {/** function to create an event */}
  const handleEventDetailsClick = (eventName: string) => {
    setEventDetails(false)
    router.push("dashboard/event-details")
  }


  return (
      <div className="flex h-screen overflow-hidden bg-black  text-white">
       <aside
               className={`bg-[#222124] fixed top-0 left-0 z-20 transition-all duration-300 h-screen ${
                 sidebarOpen ? "w-1/5" : "w-20"
               } p-4`}
             >
               <div className="flex items-center justify-between">
       
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
               <nav className="space-y-4 text-sm">
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
             <nav className="flex items-center justify-between bg-[#FFFFFF] border-b p-4">
  
      {/** for the search bar */}
               <div className="flex items-center border-1 border-[#EFEFEF] rounded-full px-3 py-2.5 w-[40%] mx-4">
                   <FiSearch className="mr-2 text-xs text-[#595959]" />
                   <p className="text-xs text-[#C8CCD0]">Search for group or evevnts</p>
                   <div className="border border-[#EFEFEF] h-5 ml-20"></div>
                   <FiMapPin className="ml-2 text-[#595959]"/>
                   <p className="text-xs ml-2 text-[#B7B7B7]">Location...</p>
               </div> 
  
               {/*** for the create button */}
                            <div className="flex items-center gap-10">
                                     <button  onClick={toggleModal} className="bg-[#1BAAF8] text-white text-xs px-2 sm:px-3 py-2 rounded-sm flex items-center gap-1 sm:gap-2">
                                          <FiPlus className="w-3 h-3 sm:w-4 sm:h-4"/><p>Create Event</p>
                                     </button>
                {showOrganizerModal && (
          <div className="fixed  inset-0  z-50 flex items-center justify-center">
          
            <div className="absolute bg-[rgba(0,0,0,0.5)] w-full bg-opacity-50 inset-0" onClick={toggleModal}></div>
  
          
            <div className="relative  bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
              
              <button
                onClick={toggleModal}
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
                className="w-[55%] rounded-md bg-[#1BAAF8] mb-8 text-white py-2"
                onClick={() => handleEventDetailsClick("/app/dashboard/create-event")}            >
                Continue
              </button>
            </div>
          </div>
        )}
  
  
                                     {/** the notification button */}
                                     <div   className="relative text-black cursor-pointer"
                                  onClick={toggleNotification}>
                                      <FiBell  size={20}/>
                                      <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span>   
                                     {showNotifications && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] w-full bg-opacity-50" onClick={toggleNotification}></div>
  
            <div className="absolute right-0 top-[10%] h-fit w-200 bg-white shadow-2xl overflow-y-auto">
              <div className="p-6 ">
                <div className="flex items-center justify-between mb-4">
                  <h2 className=" text-black text-sm font-semibold">Notifications</h2>
                  <div className="flex items-center">
  
                  </div>
                  <button
                    className="text-black text-sm font-medium hover:text-blue-700"
                    onClick={() => {
                    }}
                  >
                    Mark all as read
                  </button>
                   
                </div>
  
  
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-sm font-medium text-gray-900 border-b-1 border-text-[#595959] pb-2">
                    All
                    <span className="bg-[#EBF8FE] text-black text-sm px-2 py-1 rounded-full">2</span>
                  </button>
                  <button className="text-sm text-gray-500 hover:text-gray-700 pb-2">Unread</button>
                  <button className="text-sm text-gray-500 hover:text-gray-700 pb-2">Favorite</button>
                </div>
                <hr className="text-[#595959] text-xs" />
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
                    <p className="text-sm text-gray-700 mb-4">
                      <span className="font-bold">John,</span> you have been invited to{" "}
                      <span className="font-bold">&quot;Music live concert"</span> secure
                      <br />
                      <span>your spot now!</span>
                    </p>
                  </div>
                  <button className="bg-[#EBF8FE]  text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                    onClick={() => handleRSVPClick("/app/dashboard/create-event")}>
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
                    <p className="text-sm text-gray-700 mb-4">
                      <span className="font-bold">Ticket Confirmed!</span> your ticket for have been invited to{" "}
                      <span className="font-bold">&quot;Summer
                        <br />
                         Beach Brunch&quot;</span> secure your spot now!
                    </p>
                  </div>
                  <button  className="bg-[#EBF8FE] text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                    onClick={() => handleViewTicketsClick("Summer Beach Brunch")}>
                    VIEW TICKETS
                  </button>
                </div>
                <hr className="text-[#595959] w-[90%] text-xs ml-10" />
                <div className="flex items-start gap-3 p-5 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8  bg-blue-100 rounded-full flex items-center justify-center">
                    <Image src="/image/fluent-color_mail-16.svg" 
                        alt="Clust-logo" 
                        width={50} 
                        height={50} />
                  </div>
                  <div className="flex-1">
                    <p className=" text-gray-700 text-sm mb-4">
                      <span className="font-bold ">John,</span> your rsvp to{" "}
                      <span className="font-bold">"Summer 
                        Beach Brunch"</span> is still pending.
                      <br />
                      Kindly Confirm your attendance.
                    </p>
                  </div>
                  <button  className="bg-[#EBF8FE]  text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                    onClick={() => handleRSVPClick("/app/dashboard/create-event")}>
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
                    <p className=" text-gray-700 text-sm mb-4">
                      <span className="font-bold">John,</span> you have been invited to{" "}
                      <span className="font-bold">"Fitness Fest 2025"
                        </span> secure 
                        <br/>
                        <span>  your spot now!</span> 
                    </p>
                  </div>
                  <button  className="bg-[#EBF8FE] hover:bg-blue-700 text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                    onClick={() => handleRSVPClick("/app/dashboard/create-event")}>
                    RSVP NOW
                  </button>
                </div>
                <hr className="text-[#595959] w-[90%] text-xs ml-10" />
                <div className="flex items-start gap-3 p-5 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                       <Image src="/image/fluent-color_mail-16 (1).svg" 
                        alt="Clust-logo" 
                        width={50} 
                        height={50} />               
                         </div>               
                  <div className="flex-1">
                     <p className="text-sm text-gray-700 mb-4">
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
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                       <Image src="/image/fluent-color_mail-16.svg" 
                        alt="Clust-logo" 
                        width={50} 
                        height={50} />               
                         </div>               
                  <div className="flex-1">
                    <p className=" text-gray-700 text-sm mb-1">
                      <span className="font-bold">John,</span> your rsvp to{" "}
                      <span className="font-bold">"Summer Beach Brunch"</span> is still pending.
                      <br />
                      Kindly Confirm your attendance.
                    </p>
                  </div>
                  <button  className="bg-[#EBF8FE]  hover:bg-blue-700 text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
                    onClick={() => handleRSVPClick("/app/dashboard/create-event")}>
                              RSVP
                   </button>
                </div>
                                            <hr className="text-[#595959] w-[90%] text-xs  ml-10" />
  
              </div>
            </div>
          </div>
        )}                     
                                     </div>                      
                                     <div className="flex items-center gap-2 relative">                               
                                      <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                                       <FaUserCircle size={24} className="w-4 h-4 text-white"/>
                                             </div>
                                            <div>
                                              <p className="text-xs text-[#2F2B36]">John</p>
                                              <p className="text-xs text-[#B3BDC9]">JohnFavor@gmail.com</p>
                                            </div>
                                            {/**for the dropdown */}
                                            <FiChevronDown 
                                            className="cursor-pointer text-[#000000]"
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
  
  
  </div>
  </div>
  )
}


function NavItem({ icon, label, sidebarOpen }) {
  return (
    <div className="flex items-center gap-3 hover:bg-gray-800 px-3 py-2 rounded-md cursor-pointer">
      {icon}
      {sidebarOpen && <h3>{label}</h3>}
    </div>
  );
}
  
  

"use client";
import { useState } from "react";
import Image from "next/image";
import { CheckCircle, Crown, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { categories, events, rsvpEvents, moreEvents, discover } from "../assets/data";
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
  MapPin,
  Download,
  Heart,
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
                                   <button  onClick={toggleModal} className="bg-[#1BAAF8] text-white text-xs px-3 py-2 rounded-sm flex items-center gap-2">
                                        <FiPlus /> <p>Create Event</p>
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
                                   <div   className="relative cursor-pointer"
                                onClick={toggleNotification}>
                                    <FiBell  size={20}/>
                                    <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span>   
                                   {showNotifications && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] w-full bg-opacity-50" onClick={toggleNotification}></div>

          <div className="absolute right-0 top-[10%] h-fit w-200 bg-white shadow-2xl overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className=" text-black text-xl font-semibold">Notifications</h2>
                <div className="flex items-center">

                </div>
                <button
                  className="text-black text-xl font-medium hover:text-blue-700"
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
                  <p className="text-base text-gray-700 mb-2">
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



               {/** for the RSVP button */}


   



        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto mt-[80px] p-6">
          {/* Hero Section */}
          <section
            className="bg-cover bg-center rounded-lg h-64 mb-8 relative"
            style={{ backgroundImage: 'url("/image/Frame 2147225246.png")' }}
          >
            <div className="absolute bottom-5 left-5 space-y-2">
              <h1 className="text-3xl font-bold">The experience 2025</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <h3>Tafawa Balewa square, Lagos, Nigeria.</h3>
                </div>
                <div className="flex items-center gap-1">8th December 2025</div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-1 rounded-full">
                  Register Now
                </button>
                <button className="border border-white text-white px-4 py-1 rounded-full">
                  More info
                </button>
              </div>
            </div>
          </section>

          {/* Categories */}

                 <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-7 gap-0">
          
            {categories.map((cat, i) => (
              <div key={i} className="cursor-pointer w-[130px] hover:shadow-lg  duration-300 transition-shadow bg-white h-[120px] text-black rounded-lg shadow text-center">
                <div className="p-2 text-center">
                  <div
                    className={`w-12 h-12  flex items-center justify-center mx-auto mb-2`}
                  >
                     <div className="mt-3 ml-2">
                    <Image
                      src={cat.icon}
                      width={30}
                      height={30}
                      alt={cat.label}
                    />
                  </div>
                    {/* //<cat.icon className="w-6 h-6" /> */}
                  </div>
                  <p className="text-xs font-medium">{cat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div> 
     

          {/* Popular Events */}
          <section>
            <h3 className="text-xl font-bold mb-1">Popular events</h3>
            <p className="text-sm text-gray-400 mb-4">
              Events Happening Near You
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {events.map((item, i) => (
                <div key={i} className="bg-gray-800 p-3 rounded-lg">
                  <div className="relative">
                    <Image
                      src={item.icon}
                      width={400}
                      height={200}
                      className="w-full h-32 object-cover rounded-md"
                      alt={item.label}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button className="bg-white p-1 rounded-full">
                        <Download size={14} />
                      </button>
                      <button
                        className={`p-1 rounded-full transition ${
                          likedEvents[i] ? "bg-red-100" : "bg-white"
                        }`}
                        onClick={() => toggleLike(i)}
                      >
                        <Heart
                          size={14}
                          className={
                            likedEvents[i]
                              ? "text-red-500 fill-red-500"
                              : "text-black"
                          }
                        />
                      </button>
                    </div>
                  </div>
                  <h2 className="mt-3 font-bold text-lg">{item.label}</h2>
                  <div className="flex items-center text-sm gap-1">
                    <Clock size={14} />
                    26th January 2025 · 9:00pm
                  </div>
                  <div className="flex items-center text-sm gap-1">
                    <MapPin size={14} />
                    Wave beach
                  </div>
                  <h2 className="text-blue-400 font-semibold text-sm mt-1">
                    Free
                  </h2>
                  <button className="w-full border border-white text-white rounded-full py-1 hover:bg-blue-600 transition mt-2">
                    Join Event
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/**Discover Groups  */}
          <section className="mt-12">
            <h3 className="text-xl font-bold mb-1">Discover Groups</h3>
            <p className="text-sm text-gray-400 mb-4">
                 Find and join communities based on your interests
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {discover.map((item, i) => (
                <div key={i} className="bg-gray-800 p-3 rounded-lg">
                  <div className="relative">
                    <Image
                      src={item.icon}
                      width={400}
                      height={200}
                      className="w-full h-32 object-cover rounded-md"
                      alt={item.label}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      
                      <button
                        className={`p-1 rounded-full transition ${
                          likedEvents[i] ? "bg-red-100" : "bg-white"
                        }`}
                        onClick={() => toggleLike(i)}
                      >
                        <Heart
                          size={14}
                          className={
                            likedEvents[i]
                              ? "text-red-500 fill-red-500"
                              : "text-black"
                          }
                        />
                      </button>
                    </div>
                  </div>
                  <h2 className="mt-3 font-bold text-lg">{item.label}</h2>
                  <div className="flex items-center text-sm gap-1">
                    <Clock size={14} />
                    26th January 2025 · 9:00pm
                  </div>
                  <div className="flex items-center text-sm gap-1">
                    <MapPin size={14} />
                    Wave beach
                  </div>
                  <h2 className="text-blue-400 font-semibold text-sm mt-1">
                    Free
                  </h2>
                  <button className="w-full border border-white text-white rounded-full py-1 hover:bg-blue-600 transition mt-2">
                    Join Event
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/**Upcoming rsvp events */}
  <section className="mt-12">
         <div className="w-full px-6 py-8 bg-gray-900 text-white">
      <div className="flex flex-wrap gap-6 justify-center">
        {rsvpEvents.map((rsvpEvent, i) => (
          <div key={i} className="bg-gray-800 rounded-lg w-[500px] p-4 flex gap-4 items-start">
            {/* Image Section */}
            <div className="relative w-[130px] h-[130px] flex-shrink-0">
              <Image
                src={rsvpEvent.image}
                fill
                className="rounded-md object-cover"
                alt="event image"
              />
              <button
                className={`absolute top-2 left-2 text-xs text-white px-2 py-1 rounded-full ${rsvpEvent.statusColor}`}
              >
                {rsvpEvent.status}
              </button>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between h-full">
              <h2 className="text-lg font-bold mb-1">Book Lover Circle</h2>

              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar size={16} />
                <p>January 22nd, 2024</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
                <Clock size={16} />
                <p>9:00am</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
                <MapPin size={16} />
                <p>Tech Hub Downtown</p>
              </div>

              <p className="text-blue-400 text-sm mt-2">Event in 2 days</p>

              <button className="mt-2 border border-white text-white text-sm px-4 py-1 rounded-full hover:bg-blue-600 transition w-fit">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentIndex ? "bg-blue-500" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
          </section>
         

            {/** More Events */}
                 <section className="mt-12">
            <h3 className="text-xl font-bold mb-1">Popular events</h3>
            <p className="text-sm text-gray-400 mb-4">
              Events Happening Near You
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {moreEvents.map((item, i) => (
                <div key={i} className="bg-gray-800 p-3 rounded-lg">
                  <div className="relative">
                    <Image
                      src={item.icon}
                      width={400}
                      height={200}
                      className="w-full h-32 object-cover rounded-md"
                      alt={item.label}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button className="bg-white p-1 rounded-full">
                        <Download size={14} />
                      </button>
                      <button
                        className={`p-1 rounded-full transition ${
                          likedEvents[i] ? "bg-red-100" : "bg-white"
                        }`}
                        onClick={() => toggleLike(i)}
                      >
                        <Heart
                          size={14}
                          className={
                            likedEvents[i]
                              ? "text-red-500 fill-red-500"
                              : "text-black"
                          }
                        />
                      </button>
                    </div>
                  </div>
                  <h2 className="mt-3 font-bold text-lg">{item.label}</h2>
                  <div className="flex items-center text-sm gap-1">
                    <Clock size={14} />
                    26th January 2025 · 9:00pm
                  </div>
                  <div className="flex items-center text-sm gap-1">
                    <MapPin size={14} />
                    Wave beach
                  </div>
                  <h2 className="text-blue-400 font-semibold text-sm mt-1">
                    Free
                  </h2>
                  <button className="w-full border border-white text-white rounded-full py-1 hover:bg-blue-600 transition mt-2">
                    Join Event
                  </button>
                </div>
              ))}
            </div>
          </section>

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
          {/* <h2 className="text-2xl font-bold mb-2">Clust</h2> */}
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

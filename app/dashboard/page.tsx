
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, Crown, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { categories, events, rsvpEvents, moreEvents, discover } from "../assets/data";
import axios from "axios"
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
  //const [likedEvents, setLikedEvents] = useState(Array(6).fill(false));
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false)
  const [showOrganizerModal, setShowOrganizerModal] = useState(false)
  const [eventDetails, setEventDetails] = useState(false)
  const [likedEvents, setLikedEvents] = useState(Array(events.length).fill(false));

  const toggleModal = () => {
    document.body.style.overflow = "hidden"
    setShowOrganizerModal(!showOrganizerModal)
  }


  const toggleNotification = () => {
    document.body.style.overflow = "hidden"
    setShowNotifications(!showNotifications)
  }

  const router = useRouter();
  

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


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_time: "",
    end_time: "",
  });

  const toggleLike = (index: number) => {
    const updated = [...likedEvents];
    updated[index] = !updated[index];
    setLikedEvents(updated);
  };

  const handleCreateEvent = async () => {   //for create event
    try {
      const response = await axios.post("http://188.166.174.141:8000/api/v1/events/Create Events", formData);
      console.log("Event Created:", response.data);
      alert("Event created successfully!");
    } catch (error: any) {
      console.error("Create event failed:", error.response?.data || error.message);
    }
  };


  return (
    <>
    <div className="flex  overflow-hidden   text-white">
      <aside
        className={`bg-[#222124] fixed top-0 left-0 z-20 bg-opacity-50  transition-all duration-300 h-screen ${sidebarOpen ? "w-1/5" : "w-20"} p-4`}
      >
        <div className="flex items-center justify-between mb-6">

          {/** for the clust icon */}

          <a href="./"> <Image
            src="image\Frame 2147224772.svg"
            alt="Clust-logo"
            width={50}
            height={50} />
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
        className={`flex flex-col flex-1 ${sidebarOpen ? "ml-[20%]" : "ml-[5rem]"} h-screen`}
      >
        {/* Topbar */}
        <nav className="flex items-center justify-between bg-[#FFFFFF] border-b p-4">

          {/** for the search bar */}
          <div className="flex items-center border-1 border-[#EFEFEF] rounded-full px-3 py-2.5 w-[40%] mx-4">
            <FiSearch className="mr-2 text-xs text-[#595959]" />
            <p className="text-xs text-[#C8CCD0]">Search for group or evevnts</p>
            <div className="border border-[#EFEFEF] h-5 ml-20"></div>
            <FiMapPin className="ml-2 text-[#595959]" />
            <p className="text-xs ml-2 text-[#B7B7B7]">Location...</p>
          </div>

          {/*** for the create button */}
          <div className="flex items-center gap-10">
            <button onClick={toggleModal} className="bg-[#1BAAF8] text-white text-xs px-2 sm:px-3 py-2 rounded-sm flex items-center gap-1 sm:gap-2">
              <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" /><p>Create Event</p>
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
                    onClick={() => handleEventDetailsClick("/app/dashboard/create-event")}>
                    Continue
                  </button>
                </div>
              </div>
            )}


            {/** the notification button */}
            <div className="relative text-black cursor-pointer"
              onClick={toggleNotification}>
              <FiBell size={20} />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span>
              {showNotifications && (
                <div className="fixed inset-0 z-50">
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] w-full bg-opacity-50" onClick={toggleNotification}></div>

                  <div className="absolute right-0 top-[10%] h-fit w-200 bg-white shadow-2xl overflow-y-auto">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className=" text-black text-sm font-semibold">Notifications</h2>
                        <div className="flex items-center">

                        </div>
                        <button
                          className="text-black text-sm font-medium hover:text-blue-700"
                          onClick={() => {
                          } }
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
                        <button className="bg-[#EBF8FE] text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
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
                          <p className=" text-gray-700 text-sm mb-4">
                            <span className="font-bold ">John,</span> your rsvp to{" "}
                            <span className="font-bold">"Summer
                              Beach Brunch"</span> is still pending.
                            <br />
                            Kindly Confirm your attendance.
                          </p>
                        </div>
                        <button className="bg-[#EBF8FE]  text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
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
                            <br />
                            <span>  your spot now!</span>
                          </p>
                        </div>
                        <button className="bg-[#EBF8FE]  text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
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
                          <p className="text-sm text-gray-700 mb-2">
                            <span className="font-bold">Ticket Confirmed!</span> your ticket for have been invited to{" "}
                            <span className="font-bold">&quot;Summer
                              <br />
                              Beach Brunch&quot;</span> secure your spot now!
                          </p>
                        </div>
                        <button className="bg-[#EBF8FE] text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
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
                          <p className=" text-gray-700 text-sm mb-1 ">
                            <span className="font-bold">John,</span> your rsvp to{" "}
                            <span className="font-bold">"Summer Beach Brunch"</span> is still pending.
                            <br />
                            Kindly Confirm your attendance.
                          </p>
                        </div>
                        <button className="bg-[#EBF8FE] text-[9px] text-black px-5 py-2 rounded-full transition-colors duration-200 font-medium"
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
              <FaUserCircle size={24} className="w-4 h-4 text-white"/>
              <div>
                <p className="text-xs text-[#2F2B36]">John</p>
                <p className="text-xs text-[#B3BDC9]">JohnFavor@gmail.com</p>
              </div>
              {/**for the dropdown */}
              <FiChevronDown
                className="cursor-pointer text-[#000000]"
                onClick={() => setDropdownOpen(prev => !prev)} />

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
              )}
            </div>
            <div>

            </div>
          </div>
        </nav>







        {/* Hero Section */}


        <main className="flex-1 bg-[#FFFFFF] overflow-y-auto mt-[80px] p-6">
          <section
            className="bg-cover bg-center rounded-lg h-90 mb-8 relative"
            style={{ backgroundImage: 'url("/image/Frame 2147225139.png")' }}
          >
            <div className="absolute bottom-5 left-5 space-y-3">
              <h1 className="text-3xl font-bold">The experience 2025</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <h3 className="text-[#FAFAFA] text-sm">Tafawa Balewa square, Lagos, Nigeria.</h3>
                </div>
                <div className="flex items-center text-sm gap-1 text-[#FAFAFA]">
                  <Clock size={16} />
                  8th December 2025</div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-[#0794E2] text-xs text-[#FAFAFA] px-5 py-3 rounded-full">
                  Register Now
                </button>
                <button className="border text-xs border-[#E6E5E5] text-[#FAFAFA] px-4 py-1 rounded-full">
                  More info
                </button>
              </div>
            </div>
          </section>

          {/* Categories */}

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-[#0A033C]">Categories</h2>
            <div className="grid grid-cols-7 gap-0">

              {categories.map((cat, i) => (
                <div key={i} className="cursor-pointer w-[130px] hover:shadow-lg  duration-300 transition-shadow bg-white h-[120px] text-[#0A033C] rounded-lg shadow text-center">
                  <div className="p-2 text-center">
                    <div
                      className={`w-12 h-12  flex items-center justify-center mx-auto mb-2`}
                    >
                      <div className="mt-3 ml-2">
                        <Image
                          src={cat.icon}
                          width={30}
                          height={30}
                          alt={cat.label} />
                      </div>
                    </div>
                    <p className="text-xs font-medium">{cat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Popular Events */} for the end point

          {/* <section>
      <h3 className="text-xl font-bold mb-1 text-[#0A033C]">Popular events</h3>
      <p className="text-xs text-[#222124] mb-4">Events Happening Near You</p>
      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-2">Create New Event</h2>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mb-2 w-full"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 mb-2 w-full"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-2 mb-2 w-full"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2 mb-2 w-full"
          value={formData.start_time}
          onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2 mb-2 w-full"
          value={formData.end_time}
          onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
        />
        <button onClick={handleCreateEvent} className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((item, i) => (
          <div key={i} className="bg-white border-[#252C2B] p-5 rounded-lg">
            <div className="relative">
              <Image
                src={item.icon}
                width={400}
                height={200}
                className="w-[95%] h-40 object-cover rounded-lg"
                alt={item.label}
              />
              <div className="absolute top-2 right-6 flex gap-2">
                <button className="bg-white p-1 rounded-full">
                  <Download size={14} className="text-black" />
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
            <h2 className="mt-3 text-[#252C2B] font-bold text-lg">{item.label}</h2>
            <div className="flex text-[#626262] items-center text-sm gap-1">
              <Clock size={14} />
              26th January 2025 · 9:00pm
            </div>
            <div className="flex text-[#626262] items-center text-sm gap-1">
              <MapPin size={14} />
              Wave beach
            </div>
            <h2 className="text-[#1BAAF8] font-semibold text-sm mt-1">Free</h2>
            <button className="w-[95%] text-sm border border-[#E6E5E5] text-[#252C2B] rounded-full py-2 hover:bg-[#1BAAF8] transition mt-2">
              Join Event
            </button>
          </div>
        ))}
      </div>
    </section> */}
 

          <section>
            <h3 className="text-xl font-bold mb-1 text-[#0A033C]">Popular events</h3>
            <p className="text-xs text-[#222124] mb-4">
              Events Happening Near You
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {events.map((item, i) => (
                <div key={i} className="bg-white border-[#252C2B] p-5 rounded-lg">
                  <div className="relative">
                    <Image
                      src={item.icon}
                      width={400}
                      height={200}
                      className="w-[95%] h-40 object-cover rounded-lg"
                      alt={item.label} />
                    <div className="absolute top-2 right-6 flex gap-2">
                      <button className="bg-white p-1 rounded-full">
                        <Download size={14} className="text-black" />
                      </button>
                      <button
                        className={`p-1 rounded-full transition ${likedEvents[i] ? "bg-red-100" : "bg-white"}`}
                        onClick={() => toggleLike(i)}
                      >
                        <Heart
                          size={14}
                          className={likedEvents[i]
                            ? "text-red-500 fill-red-500"
                            : "text-black"} />
                      </button>
                    </div>
                  </div>
                  <h2 className="mt-3 text-[#252C2B] font-bold text-lg">{item.label}</h2>
                  <div className="flex text-[#626262] items-center text-sm gap-1">
                    <Clock size={14} />
                    26th January 2025 · 9:00pm
                  </div>
                  <div className="flex text-[#626262] items-center text-sm gap-1">
                    <MapPin size={14} />
                    Wave beach
                  </div>
                  <h2 className="text-[#1BAAF8] font-semibold text-sm mt-1">
                    Free
                  </h2>
                  <button className="w-[95%] text-sm border border-[#E6E5E5] text-[#252C2B] rounded-full py-2 hover:bg-[#1BAAF8] transition mt-2">
                    Join Event
                  </button>
                </div>
              ))}
            </div>
          // </section> 

          {/**Discover Groups  */}
          <section className="mt-12">
            <h3 className="text-xl font-bold mb-1 text-[#0A033C]">Discover Groups</h3>
            <p className="text-sm text-[#222124] mb-4">
              Find and join communities based on your interests
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {discover.map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-lg">
                  <div className="relative">
                    <Image
                      src={item.icon}
                      width={400}
                      height={200}
                      className="w-[95%] h-40 object-cover rounded-md"
                      alt={item.label} />
                    <div className="absolute top-2 right-7 flex gap-2">

                      <button
                        className={`p-1 rounded-full transition ${likedEvents[i] ? "bg-red-100" : "bg-white"}`}
                        onClick={() => toggleLike(i)}
                      >
                        <Heart
                          size={14}
                          className={likedEvents[i]
                            ? "text-red-500 fill-red-500"
                            : "text-black"} />
                      </button>
                    </div>
                  </div>
                  <h2 className="mt-3 text-[#252C2B] text-base">{item.label}</h2>
                  <div className="flex items-center text-[#626262] text-xs gap-1">
                    Monthly book discussions, author meetups, and literary exploration across various genres
                  </div>

                  <h2 className="text-[#0794E2] font-semibold text-xs mt-1">
                    23.5k members
                  </h2>
                  <button className="w-[95%] border text-sm border-[#E6E5E5] text-[#252C2B] rounded-full py-2 hover:bg-[#1BAAF8] transition mt-2">
                    Join Group
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/**Upcoming rsvp events */}
          <section className="mt-12">
            <div className="w-full px-8 py-8 bg-white text-white">
              <div className="flex flex-wrap gap-6 justify-center">
                {rsvpEvents.map((rsvpEvent, i) => (
                  <div key={i} className=" rounded-lg w-[500px] p-4 flex gap-4 items-start">
                    {/* Image Section */}
                    <div className="relative w-[45%] h-[150px] flex-shrink-0">
                      <Image
                        src={rsvpEvent.image}
                        fill
                        className="rounded-lg object-cover"
                        alt="event image" />
                      <button
                        className={`absolute top-2 py-0.9 left-2 text-[10px] text-white px-3 rounded-full ${rsvpEvent.statusColor} ${rsvpEvent.textColor}`}
                      >
                        {rsvpEvent.status}
                      </button>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-between h-full">
                      <h2 className="text-sm text-[#252C2B] mb-1">Javascript Meetup</h2>

                      <div className="flex items-center gap-2 text-xs text-[#626262]">

                        <Calendar size={16} />
                        <span>January 22nd, 2024</span>
                        <Clock size={16} />
                        <span>9:00am</span>
                      </div>


                      <div className="flex items-center gap-2 text-xs text-[#626262] mt-1">
                        <MapPin size={16} />
                        <p>Tech Hub Downtown</p>
                      </div>

                      <p className="text-[#1BAAF8] text-xs mt-2">Event in 2 days</p>

                      <button className="mt-2 border border-[#E6E5E5] text-[#252C2B] text-xs px-4 py-1 rounded-full hover:bg-[#1BAAF8] transition w-fit">
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
                    className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-[#1BAAF8]" : "bg-gray-500"}`} />
                ))}
              </div>
            </div>
          </section>


          {/** More Events */}
          <section className="mb-20">
            <h3 className="text-xl text-[#0A033C] font-bold mb-1">More events</h3>
            <p className="text-xs text-[#222124] mb-4">
              Events Happening Near You
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {moreEvents.map((item, i) => (
                <div key={i} className="bg- p-5 rounded-lg">
                  <div className="relative">
                    <Image
                      src={item.icon}
                      width={400}
                      height={200}
                      className="w-[95%] h-40 object-cover rounded-lg"
                      alt={item.label} />
                    <div className="absolute top-2 right-6 flex gap-2">
                      <button className="bg-white p-1 rounded-full">
                        <Download size={14} className="text-black" />
                      </button>
                      <button
                        className={`p-1 rounded-full transition ${likedEvents[i] ? "bg-red-100" : "bg-white"}`}
                        onClick={() => toggleLike(i)}
                      >
                        <Heart
                          size={14}
                          className={likedEvents[i]
                            ? "text-red-500 fill-red-500"
                            : "text-black"} />
                      </button>
                    </div>
                  </div>
                  <h2 className="mt-3 text-[#252C2B] font-bold text-lg">{item.label}</h2>
                  <div className="flex text-[#626262] items-center text-xs gap-1">
                    <Clock size={14} />
                    26th January 2025 · 9:00pm
                  </div>
                  <div className="flex items-center text-[#626262] text-xs gap-1">
                    <MapPin size={14} />
                    Wave beach
                  </div>
                  <h2 className="text-[#1BAAF8] font-semibold text-sm mt-1">
                    Free
                  </h2>
                  <button className="w-[95%] border border-[#E6E5E5] text-[#252C2B] text-sm rounded-full py-2 hover:bg-blue-600 transition mt-2">
                    Join Event
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/**for the footer part */}
          <footer className="bg-[#231F20] h-[50vh] text-white px-10 py-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 ">
              {/* for column 1 */}
              <div className="md:w-1/4">
                <a href="./"> <Image
                  src="image\Frame 2147224772.svg"
                  alt="Clust-logo"
                  width={50}
                  height={50} />
                </a>
                {/* <h2 className="text-2xl font-bold mb-2">Clust</h2> */}
                <p className="text-xs text-[#FFFFFF]">
                  Plan small gatherings, big moments and everything in between.
                </p>
              </div>

              {/* for column 2 */}
              <div className="md:w-1/4">
                <h2 className="text-sm text-{#FFFFFF] font-semibold mb-2">Services</h2>
                <div className="space-y-1 text-xs text-[#FFFFFF]">
                  <p>Host an Event</p>
                  <p>Event Reminders</p>
                  <p>Create a group</p>
                  <p>Terms of use</p>
                </div>
              </div>

              {/* for column 3 */}
              <div className="md:w-1/4">
                <h2 className="text-sm font-semibold mb-2">Company</h2>
                <div className="space-y-1 text-xs text-[#FFFFFF]">
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
                <h2 className="text-sm font-semibold mb-2">Connect with us</h2>
                <div className="space-y-1 text-xs text-[#FFFFFF] mb-4">
                  <p>info@clust.com</p>
                  <p>0703528587</p>
                  <p>08000044593</p>
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="bg-[#385295] p-2 rounded-full">
                    <Facebook size={16} className="text-white" />
                  </div>
                  <div className="bg-[#479FD7] p-2 rounded-full">
                    <Twitter size={16} className="text-[#FFFFFF]" />
                  </div>
                  <div className="bg-gradient-to-tr from-[#FDBE54] via-[#E63257] to-[#AB3C95] p-2 rounded-full">
                    <Instagram size={16} className="text-white" />
                  </div>
                  <div className="bg-[#487FC0] p-2 rounded-full">
                    <Linkedin size={16} className="text-white" />
                  </div>
                  <div className="bg-[#D12027] p-2 rounded-full">
                    <Youtube size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div></>
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

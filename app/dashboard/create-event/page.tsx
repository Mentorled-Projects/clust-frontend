/* eslint-disable react/jsx-no-undef */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Check, ChevronDown, ChevronUp, Crown, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { faqData } from "../../assets/data"
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
} from "lucide-react"
import { FaUserCircle } from "react-icons/fa"
import { FiPlus, FiBell, FiChevronDown, FiMapPin, FiSearch } from "react-icons/fi"

export default function EventPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false) 
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [rsvpStatus, setRsvpStatus] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const [showOrganizerModal, setShowOrganizerModal] = useState(false)
  const [openFAQs, setOpenFAQs] = useState({})

  const toggleModal = () => {
    document.body.style.overflow = "hidden"
    setShowOrganizerModal(!showOrganizerModal)
  }


  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false) 
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleContinue = () => {
    setShowModal(false)
    router.push("/create-event")
  }

    const toggleFAQ = (faqId) => {
    setOpenFAQs((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }))
  }

  const toggleNotification = () => {
    if (!isMobile) {
      document.body.style.overflow = "hidden"
    }
    setShowNotifications(!showNotifications)
  }

  const handleRSVPClick = (eventName: string) => {
    setShowNotifications(false)
    router.push("/dashboard/create-event")
  }

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

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white text-white">
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* for the sidebar */}
      <aside
        className={`bg-black fixed top-0 left-0 z-20 transition-all duration-300 h-screen ${
          sidebarOpen ? "w-64 lg:w-1/5" : "w-0 lg:w-20"
        } ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : ""} overflow-hidden`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <a href="./" className={sidebarOpen ? "block" : "hidden lg:block"}>
              <Image src="/image/Frame 2147224772.svg" alt="Clust-logo" width={50} height={50} />
            </a>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:block">
              {sidebarOpen ? <X /> : <Menu />}
            </button>
          </div>
          <hr className="border-gray-700 mb-4" />
          <nav className="space-y-4">
            <NavItem icon={<Menu />} label="Dashboard" sidebarOpen={sidebarOpen} onClick={closeSidebarOnMobile} />
            <NavItem icon={<Calendar />} label="Events" sidebarOpen={sidebarOpen} onClick={closeSidebarOnMobile} />
            <NavItem icon={<Users />} label="Groups" sidebarOpen={sidebarOpen} onClick={closeSidebarOnMobile} />
            <NavItem icon={<Clock />} label="Rsvp" sidebarOpen={sidebarOpen} onClick={closeSidebarOnMobile} />
            <NavItem icon={<Settings />} label="Settings" sidebarOpen={sidebarOpen} onClick={closeSidebarOnMobile} />
            <NavItem icon={<HelpCircle />} label="Help" sidebarOpen={sidebarOpen} onClick={closeSidebarOnMobile} />
          </nav>
        </div>
      </aside>

      {/* for the main layout */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isMobile ? "ml-0" : sidebarOpen ? "ml-64 lg:ml-[20%]" : "ml-0 lg:ml-20"
        } h-screen`}
      >
        {isMobile && !sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 left-4 z-30 bg-black p-2 rounded-md lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}

        {/* for the topbar */}
        <nav className="flex items-center justify-between border-b p-2 sm:p-4 bg-white">
          <div className="hidden md:flex items-center border border-[#EFEFEF] rounded-full px-3 py-2.5 flex-1 max-w-md mx-4">
            <FiSearch className="mr-2 text-xs text-[#C8CCD0]" />
            <input
              type="text"
              placeholder="Search for group or events"
              className="bg-transparent text-xs text-[#C8CCD0] flex-1 outline-none"
            />
            <div className="border border-[#EFEFEF] h-5 mx-2"></div>
            <FiMapPin className="text-[#595959]" />
            <input
              type="text"
              placeholder="Location..."
              className="bg-transparent text-xs text-[#C8CCD0] ml-2 outline-none w-20"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* for the create event button */}
            <button
              onClick={toggleModal}
              className="bg-[#1BAAF8] text-white text-xs px-2 sm:px-3 py-2 rounded-sm flex items-center gap-1 sm:gap-2"
            >
              <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Create Event</span>
              <span className="sm:hidden">Create</span>
            </button>

            {/* for the notification button */}
            <div className="relative cursor-pointer" onClick={toggleNotification}>
              <FiBell size={isMobile ? 18 : 20} className="text-black"/>
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span>
            </div>

      {showOrganizerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute bg-[rgba(0,0,0,0.5)] w-full bg-opacity-50 inset-0" onClick={toggleModal}></div>
          <div className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center">
            <button
              onClick={toggleModal}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              You are about to be an Organizer
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 font-medium text-sm sm:text-base">You have the power to:</p>
            <ul className="text-left space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-gray-700 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Create and host events for free or paid
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Share event links and invite people directly
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Collect feedback after your event
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Upload images, videos or event flyers
              </li>
            </ul>
            <button
              className="w-full sm:w-[55%] rounded-md bg-[#1BAAF8] hover:bg-blue-700 text-white py-2 text-sm sm:text-base"
              onClick={() => {
                setShowOrganizerModal(false)
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

            {/* for the user dropdown */}
            <div className="flex items-center gap-1 sm:gap-2 relative">
              <FaUserCircle size={isMobile ? 20 : 24} />   {/**an image is supposed to be here */}
              <div className="hidden sm:block">
                <p className="text-xs text-black">John</p>
                <p className="text-xs text-[#595959]">JohnFavor@gmail.com</p>
              </div>
              <FiChevronDown
                className="cursor-pointer w-3 h-3 text-black sm:w-4 sm:h-4"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />

              {dropdownOpen && (
                <div className="absolute top-full right-0 bg-white shadow-lg mt-2 w-48 rounded-lg z-50 p-2">
                  <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">
                    Switch to Organizer
                  </h3>
                  <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">RSVP</h3>
                  <hr className="text-[#595959] text-sm" />
                  <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">Liked</h3>
                  <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">
                    Tickets (0)
                  </h3>
                  <hr className="text-[#595959] text-sm" />
                  <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">
                    Account settings
                  </h3>
                  <h3 className="hover:bg-blue-100 text-[#595959] text-sm rounded px-3 py-2 cursor-pointer">Logout</h3>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* for the main content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          {/* for the hero image */}
          <section
            className="bg-cover bg-center rounded-lg h-60 sm:h-160 lg:h-130 mb-6 sm:mb-8 relative"
            style={{ backgroundImage: 'url("/image/Frame 2147225246 (1).png")' }}
          >
            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 space-y-1 sm:space-y-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Music Live Concert</h1>
              <h3 className="text-sm sm:text-base">Organized by Mainland block club.</h3>
            </div>
          </section>

          <div className="w-full lg:w-[70%] mx-auto mb-6 sm:mb-8 bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-9 sm:h-9 bg-[#EBF8FE] rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 sm:w-4 sm:h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-thin text-gray-600 text-sm sm:text-base">Date</h3>
                  <h3 className="font-bold text-black text-sm sm:text-semibold">22nd January, 2025</h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-9 sm:h-9 bg-[#EBF8FE] rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 sm:w-4 sm:h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-thin text-gray-600 text-sm sm:text-base">Time</h3>
                  <h3 className="font-semibold text-black text-sm sm:text-semibold">4:00 PM WAT</h3>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-9 sm:h-9 bg-[#EBF8FE] rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-4 sm:h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-thin text-gray-600 text-sm sm:text-base">Location</h3>
                  <h3 className="font-semibold text-black text-sm sm:text-semibold">Johnson Jakande Tinubu (JJT) Park</h3>
                </div>
              </div>
            </div>
          </div>

          {/* for the two divs */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* for the first div */}
            <div className="flex-1 order-2 lg:order-1">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h1 className="text-2xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">About Event</h1>
                  <p className="text-black mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                    Get ready for an unforgettable night of music, energy, and pure vibes at Soundwave
                    <br/>
                     Live 2025 the
                    city's biggest outdoor music concert! Join us as we bring together 
                    <br/>
                    some of the hottest artists,
                    emerging talents, and surprise guest performers for a 
                    <br/>
                    one-of-a-kind experience. Expect electrifying
                    performances, live DJ sets, 
                    <br/>
                    interactive art installations, and premium food & drink vendors to keep
                    the party 
                    <br/>
                    going. 
                    <br/>
                    Whether you're a lover of afrobeats, hip-hop, indie, or dance music — this event
                    <br/>
                    promises something for everyone. Don't miss your chance to vibe with fellow music
                    <br/>
                     lovers under the
                    stars and be part of a concert night to remember.
                  </p>

                  <h1 className="text-2xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">Organizer</h1>
                  <div className="bg-gray-100 p-7 sm:w-[90%] sm:p-4 rounded-lg mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                         <Image
                    src="\Ellipse 11.svg"
                    alt="Clust-logo"
                    width={40}
                    height={40}
                    className="sm:w-[50px] sm:h-[50px]"
                  />
                        <div>
                          <h3 className="font-thin text-black text-sm sm:text-base">
                            By Mainland Block Club • 224 followers
                          </h3>
                          <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-5 py-1 rounded-full text-xs sm:text-xs">
                              68 events hosted
                            </button>
                          </div>
                        </div>
                      </div>
                      <button className="bg-[#0794E2] hover:bg-blue-600 text-white px-3 sm:px-6 py-2 rounded-sm text-sm sm:text-base">
                        Follow
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4 text-black">Event highlights</h3>
                  <ul className="space-y-2 mb-4 sm:mb-6">
                    <li className="flex items-start text-black text-sm sm:text-lg ">
                      <span className="mr-2">•</span>
                      Live performances by top-charting and emerging artists
                    </li>
                    <li className="flex items-start text-black text-sm sm:text-lg">
                      <span className="mr-2">•</span>
                      Stunning sunset viewing from exclusive vantage point
                    </li>
                    <li className="flex items-start text-black text-sm sm:text-lg">
                      <span className="mr-2">•</span>
                        Surprise Guest Appearances you don’t want to miss            
                                </li>
                    <li className="flex items-start text-black text-sm sm:text-lg">
                      <span className="mr-2">•</span>
                         VIP Experience Lounge with media coverage          
                                   </li>
                  </ul>

                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">Frequently asked questions</h2>

                         <div className="space-y-4">
                    {faqData.map((faq, index) => (
                      <div key={faq.id} className="border-b border-gray-200">
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="flex items-center justify-between w-full p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-black text-sm sm:text-base pr-4">{faq.question}</span>
                          {openFAQs[faq.id] ? (
                            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
                          )}
                        </button>
                        {openFAQs[faq.id] && (
                          <div className="p-3 sm:p-4 bg-gray-100 border-t border-gray-200">
                            <p className="font-medium text-black text-sm sm:text-base">{faq.answer}</p>
                          </div>
                        )}
                        <div className="w-full  bg-black-300 mt-2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* for the second div */}
            <div className="w-full lg:w-80 order-1 lg:order-2">
              <div className="lg:sticky lg:top-6 border bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">
                  Would you like to attend 
                  <br/>
                  this event?
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-sm">Your RSVP is pending by default</p>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <label
                    className={`flex items-center space-x-2 p-3 rounded-full border cursor-pointer ${
                      rsvpStatus === "confirm" ? "bg-[#E7FFF0] border-green-200" : "border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="rsvp"
                      value="confirm"
                      checked={rsvpStatus === "confirm"}
                      onChange={(e) => setRsvpStatus(e.target.value)}
                      className="text-black"
                    />
                    <span className="flex-1 text-black text-sm sm:text-xs">Confirm</span>
                  </label>
                  <label
                    className={`flex items-center space-x-2 p-3 rounded-full border cursor-pointer ${
                      rsvpStatus === "decline" ? "bg-red-50 border-red-200" : "border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="rsvp"
                      value="decline"
                      checked={rsvpStatus === "decline"}
                      onChange={(e) => setRsvpStatus(e.target.value)}
                      className="text-black"
                    />
                    <span className="flex-1 text-black text-sm sm:text-xs">Decline</span>
                  </label>
                  <label
                    className={`flex items-center space-x-2 p-3 rounded-full border cursor-pointer ${
                      rsvpStatus === "remind" ? "bg-yellow-50 border-yellow-200" : "border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="rsvp"
                      value="remind"
                      checked={rsvpStatus === "remind"}
                      onChange={(e) => setRsvpStatus(e.target.value)}
                      className="text-black"
                    />
                    <span className="flex-1 text-black text-sm sm:text-xs">Remind me later</span>
                  </label>
                </div>
                <button
                  onClick={handleRSVPConfirm}
                  className={`w-full py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
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

          {/* Success Popup - Responsive positioning */}
          {showConfirmation && (
            <div
              className={`fixed z-50 bg-black text-white p-3 sm:p-4 rounded-lg shadow-lg ${
                isMobile ? "top-4 left-1/2 transform -translate-x-1/2" : "top-34 right-20"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">You're officially Confirmed</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Ticket sent to your email</p>
                </div>
              </div>
            </div>
          )}

        </main>



          {/* Footer */}
          <footer className="bg-[#231F20] text-white px-3 sm:px-6 py-6 sm:py-10 mt-8 sm:mt-12">
            <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 lg:flex-row lg:justify-between lg:gap-10">
              <div className="lg:w-1/4">
                <a href="./" className="inline-block mb-3 sm:mb-4">
                  <Image
                    src="/image/Frame 2147224772.svg"
                    alt="Clust-logo"
                    width={40}
                    height={40}
                    className="sm:w-[50px] sm:h-[50px]"
                  />
                </a>
                <p className="text-xs sm:text-xs text-[#FFFFFF]">
                  Plan small gatherings, big moments and everything in between.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:w-3/4">
                <div>
                  <h2 className="text-sm sm:text-base font-semibold mb-2">Services</h2>
                  <div className="space-y-1 text-xs sm:text-xs text-gray-400">
                    <p>Host an Event</p>
                    <p>Event Reminders</p>
                    <p>Create a group</p>
                    <p>Terms of use</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-base sm:text-base font-semibold mb-2">Company</h2>
                  <div className="space-y-1 text-xs sm:text-xs text-gray-400">
                    <p>Careers</p>
                    <p>About us</p>
                    <p>Blog</p>
                    <p>FAQ</p>
                    <p>Privacy Policy</p>
                    <p>Terms of use</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-base sm:text-base font-semibold mb-2">Connect with us</h2>
                  <div className="space-y-1 text-xs sm:text-xs text-gray-400 mb-3 sm:mb-4">
                    <p>info@clust.com</p>
                    <p>0703528587</p>
                    <p>08000044593</p>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <div className="bg-blue-600 p-1.5 sm:p-2 rounded-full">
                      <Facebook size={10} className="text-white sm:w-4 sm:h-4" />
                    </div>
                    <div className="bg-blue-600 p-1.5 sm:p-2 rounded-full">
                      <Twitter size={10} className="text-white sm:w-4 sm:h-4" />
                    </div>
                    <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1.5 sm:p-2 rounded-full">
                      <Instagram size={10} className="text-white sm:w-4 sm:h-4" />
                    </div>
                    <div className="bg-blue-700 p-1.5 sm:p-2 rounded-full">
                      <Linkedin size={10} className="text-white sm:w-4 sm:h-4" />
                    </div>
                    <div className="bg-red-600 p-1.5 sm:p-2 rounded-full">
                      <Youtube size={10} className="text-white sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
      </div>

    

      {/* Notifications Panel - Responsive */}
      {showNotifications && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleNotification}></div>
          <div
            className={`absolute bg-white shadow-2xl overflow-y-auto ${
              isMobile ? "inset-x-4 top-16 bottom-4 rounded-lg" : "right-0 top-[10%] h-fit w-80 lg:w-96"
            }`}
          >
            <div className="p-4 sm:p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-black text-lg sm:text-xl font-semibold">Notifications</h2>
                <button className="text-blue-600 text-sm sm:text-base font-medium hover:text-blue-700">
                  Mark all as read
                </button>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <button className="flex items-center gap-2 text-base sm:text-lg font-medium text-gray-900 border-b border-gray-300 pb-2">
                  All
                  <span className="bg-[#EBF8FE] text-black text-sm px-2 py-1 rounded-full">2</span>
                </button>
                <button className="text-sm sm:text-base text-gray-500 hover:text-gray-700 pb-2">Unread</button>
                <button className="text-sm sm:text-base text-gray-500 hover:text-gray-700 pb-2">Favorite</button>
              </div>
            </div>
            <div className="p-2 sm:p-4">
              <div className="flex items-start gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg">
                <div className="relative">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Image
                      src="/image/fluent-color_mail-16 (2).svg"
                      alt="Mail"
                      width={20}
                      height={20}
                      className="sm:w-[30px] sm:h-[30px]"
                    />
                  </div>
                  <div className="absolute -top-0.5 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-gray-700">
                    <span className="font-bold">John,</span> you have been invited to{" "}
                    <span className="font-bold">"Music live concert"</span> secure your spot now!
                  </p>
                </div>
                <button
                  className="bg-[#EBF8FE] hover:bg-blue-700 text-xs text-black px-3 sm:px-5 py-1 sm:py-2 rounded-full transition-colors duration-200 font-medium flex-shrink-0"
                  onClick={() => handleRSVPClick("Music live concert")}
                >
                  RSVP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    
  )
}

function NavItem({ icon, label, sidebarOpen, onClick }) {
  return (
    <div className="flex items-center gap-3 hover:bg-gray-800 px-3 py-2 rounded-md cursor-pointer" onClick={onClick}>
      {icon}
      {sidebarOpen && <h3 className="text-sm sm:text-base">{label}</h3>}
    </div>
  )
}






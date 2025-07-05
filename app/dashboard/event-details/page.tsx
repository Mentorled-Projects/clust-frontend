"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { categoriesDetails, months } from "../../assets/data"

import {
  Menu,
  X,
  Calendar,
  Users,
  Clock,
  Settings,
  HelpCircle,
  Upload,
  ChevronDown,
  Search,
  MapPin,
  Timer,
  Check,
  Plus,
  Bell,
  User,
} from "lucide-react"

export default function EventDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(17)
  const [selectedMonth, setSelectedMonth] = useState(4) 
  const [selectedYear, setSelectedYear] = useState(2025)
  const [showMonthDropdown, setShowMonthDropdown] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [date, setDate] = useState("12 May 2025")
  const [fromTime, setFromTime] = useState("00:00")
  const [toTime, setToTime] = useState("00:00")
  const [showCalendar, setShowCalendar] = useState(false)
  const [locationType, setLocationType] = useState("physical")
  const [address, setAddress] = useState("")
  const [showMap, setShowMap] = useState(false)
  const [guestEmail, setGuestEmail] = useState("")
  const [guestList, setGuestList] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)

  const [titleFocused, setTitleFocused] = useState(false)
  const [descriptionFocused, setDescriptionFocused] = useState(false)
  const [categoryFocused, setCategoryFocused] = useState(false)
  const [addressFocused, setAddressFocused] = useState(false)
  const [guestEmailFocused, setGuestEmailFocused] = useState(false)

  const fileInputRef = useRef(null)

 

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File dropped:", e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + "MB",
        type: file.type.includes("image") ? "image" : "document",
      }))
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const addGuest = () => {
    if (guestEmail.trim() && !guestList.includes(guestEmail.trim())) {
      setGuestList([...guestList, guestEmail.trim()])
      setGuestEmail("")
    }
  }

  const removeGuest = (email) => {
    setGuestList(guestList.filter((guest) => guest !== email))
  }

  const removeFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId))
  }

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory)
    setShowCategoryDropdown(false)
  }

  const toggleNotification = () => {
    setShowNotifications(!showNotifications)
  }


    const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  }

  const isWeekend = (date, month, year) => {
    const day = new Date(year, month, date).getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  const isPastDate = (date, month, year) => {
    const today = new Date()
    const checkDate = new Date(year, month, date)
    today.setHours(0, 0, 0, 0)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate < today
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setDate(`${date} ${months[selectedMonth]}, ${selectedYear}`)
    setShowCalendar(false)
  }

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex)
    setShowMonthDropdown(false)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>)
    }

    // Add days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const isSelected = date === selectedDate
      const isWeekendDay = isWeekend(date, selectedMonth, selectedYear)
      const isPast = isPastDate(date, selectedMonth, selectedYear)

      days.push(
        <div
          key={date}
          onClick={() => handleDateSelect(date)}
          className={`w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded-full transition-colors ${
            isSelected
              ? "bg-blue-500 text-white"
              : isPast
                ? "text-gray-300 hover:bg-gray-100"
                : isWeekendDay
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-900 hover:bg-gray-100"
          }`}
        >
          {date}
        </div>
      )
    }

    return days
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Collapsed Sidebar */}
      <aside className={`bg-black fixed top-0 left-0 z-20 transition-all duration-300 h-screen w-20 overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-center justify-center mb-6">
            <Image src="/image/Frame 2147224772.svg" alt="Clust-logo" width={32} height={32} />
          </div>
          <hr className="border-gray-700 mb-4" />
          <nav className="space-y-4">
            <NavItem icon={<Menu />} />
            <NavItem icon={<Calendar />} />
            <NavItem icon={<Users />} />
            <NavItem icon={<Clock />} />
            <NavItem icon={<Settings />} />
            <NavItem icon={<HelpCircle />} />
          </nav>
        </div>
      </aside>

      {/* Main layout */}
      <div className="flex flex-col flex-1 ml-20 h-screen">
        {/* Topbar */}
        <nav className="flex items-center justify-between border-b p-2 sm:p-4 bg-white">
          {/* Search bar */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-2.5 flex-1 max-w-md mx-4">
            <Search className="mr-2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for group or events"
              className="bg-transparent text-xs text-gray-600 flex-1 outline-none"
            />
            <div className="border border-gray-300 h-5 mx-2"></div>
            <MapPin className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Location..."
              className="bg-transparent text-xs text-gray-600 ml-2 outline-none w-20"
            />
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Create Event Button */}
            <button className="bg-[#1BAAF8] text-white text-xs px-2 sm:px-3 py-2 rounded-sm flex items-center gap-1 sm:gap-2">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Create Event</span>
              <span className="sm:hidden">Create</span>
            </button>

            {/* Notification Button */}
            <div className="relative cursor-pointer" onClick={toggleNotification}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span>
            </div>

            {/* User Dropdown */}
            <div className="flex items-center gap-1 sm:gap-2 relative">
              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs">John</p>
                <p className="text-xs text-gray-500">JohnFavor@gmail.com</p>
              </div>
              <ChevronDown
                className="cursor-pointer w-3 h-3 sm:w-4 sm:h-4"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />

              {dropdownOpen && (
                <div className="absolute top-full right-0 bg-white shadow-lg mt-2 w-48 rounded-lg z-50 p-2">
                  <h3 className="hover:bg-blue-100 text-gray-600 text-sm rounded px-3 py-2 cursor-pointer">
                    Switch to Organizer
                  </h3>
                  <h3 className="hover:bg-blue-100 text-gray-600 text-sm rounded px-3 py-2 cursor-pointer">RSVP</h3>
                  <hr className="border-gray-300 my-1" />
                  <h3 className="hover:bg-blue-100 text-gray-600 text-sm rounded px-3 py-2 cursor-pointer">Liked</h3>
                  <h3 className="hover:bg-blue-100 text-gray-600 text-sm rounded px-3 py-2 cursor-pointer">
                    Tickets (0)
                  </h3>
                  <hr className="border-gray-300 my-1" />
                  <h3 className="hover:bg-blue-100 text-gray-600 text-sm rounded px-3 py-2 cursor-pointer">
                    Account settings
                  </h3>
                  <h3 className="hover:bg-blue-100 text-gray-600 text-sm rounded px-3 py-2 cursor-pointer">Logout</h3>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">Create Event</h3>
              <p className="text-gray-600 text-xs">Fill in the details about your event</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Event Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                <div
                  className={`border-2 w-[30%] h-[200px] border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-5 h-5 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-600 text-xs mb-2">Drag & drop to upload</h3>
                  <h3 className="text-blue-500 text-xs cursor-pointer hover:text-blue-600">or browse</h3>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter event name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setTitleFocused(true)}
                  onBlur={() => setTitleFocused(false)}
                  className={`w-full text-xs px-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                    titleFocused ? "border-blue-500" : "border-gray-300"
                  }`}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe what your event is about...."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={() => setDescriptionFocused(true)}
                  onBlur={() => setDescriptionFocused(false)}
                  rows={4}
                  className={`w-full text-xs px-3 py-2 border rounded-lg focus:outline-none transition-colors resize-none ${
                    descriptionFocused ? "border-blue-500" : "border-gray-300"
                  }`}
                />
              </div>

              {/* Category */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onFocus={() => {
                      setCategoryFocused(true)
                      setShowCategoryDropdown(true)
                    }}
                    onBlur={() => setCategoryFocused(false)}
                    className={`w-full text-xs px-3 py-2 border rounded-lg focus:outline-none transition-colors pr-10 ${
                      categoryFocused ? "border-blue-500" : "border-gray-300"
                    }`}
                  />
                  <ChevronDown
                    className="absolute text-xs right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  />
                </div>
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                    {categoriesDetails.map((cat) => (
                      <div
                        key={cat}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleCategorySelect(cat)}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>








              

              {/* Date and Time */}
<div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="px-3 text-xs py-2 pr-10 w-[75%] border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      readOnly
                    />
                    <div
                      className="absolute right-15 top-1/2 transform -translate-y-1/2 bg-[#EBF8FE] p-1 rounded cursor-pointer"
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                    {showCalendar && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4 w-80">
                        <div className="flex items-center justify-between mb-4">
                          <div className="relative">
                            <button
                              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                              className="flex items-center gap-2 text-xs font-semibold text-gray-900 hover:text-blue-600"
                            >
                              {months[selectedMonth]} {selectedYear}
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            {showMonthDropdown && (
                              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-98 overflow-y-auto">
                                {months.map((month, index) => (
                                  <div
                                    key={month}
                                    onClick={() => handleMonthSelect(index)}
                                    className={`px-4 py-2 text-xs cursor-pointer hover:bg-gray-100 ${
                                      index === selectedMonth ? "bg-blue-50 text-blue-600" : "text-gray-900"
                                    }`}
                                  >
                                    {month}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <button onClick={() => setShowCalendar(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                            <div
                              key={day + index}
                              className={`w-8 h-8 flex items-center justify-center text-xs font-medium ${
                                index >= 5 ? "text-red-500" : "text-gray-600"
                              }`}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 ">{renderCalendar()}</div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600">From</span>
                  <div className="relative">
                    <input
                      type="text"
                      value={fromTime}
                      onChange={(e) => setFromTime(e.target.value)}
                      className="px-3 py-2 border text-xs border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-8 w-20"
                    />
                    <Timer className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-xs text-gray-600">to</span>
                  <div className="relative">
                    <input
                      type="text"
                      value={toTime}
                      onChange={(e) => setToTime(e.target.value)}
                      className="px-3 py-2 border text-xs border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-8 w-20"
                    />
                    <Timer className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

           

              {/* Location */}
              <div>
                <label className="block  text-sm font-medium text-gray-700 mb-4">Location</label>

                {/* Physical Location */}
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="locationType"
                      value="physical"
                      checked={locationType === "physical"}
                      onChange={(e) => setLocationType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-xs">Physical</span>
                  </label>

                  {locationType === "physical" && (
                    <div className="ml-6 space-y-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter a new address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          onFocus={() => setAddressFocused(true)}
                          onBlur={() => setAddressFocused(false)}
                          className={`w-full text-xs pl-10 pr-3 py-2 border rounded-lg focus:outline-none transition-colors ${
                            addressFocused ? "border-blue-500" : "border-gray-300"
                          }`}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-green-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-xs">Use your current location</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">Show map</span>
                          <ChevronDown
                            className="w-4 h-4 text-gray-400 cursor-pointer"
                            onClick={() => setShowMap(!showMap)}
                          />
                        </div>
                      </div>

                      {showMap && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="w-full">
                            <Image
                              src="/image/Rectangle%204911.png"
                              alt="Lagos Map"
                              width={600}
                              height={200}
                              className="w-full h-auto rounded-lg object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}


                  {/* Virtual Location */}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="locationType"
                      value="virtual"
                      checked={locationType === "virtual"}
                      onChange={(e) => setLocationType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-xs">Virtual</span>
                  </label>
                </div>
              </div>

              {/* Add Guest */}
                  <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add guest</h3>
                <div className="relative mb-4">
                  <input
                    type="email"
                    placeholder="Email Invitation"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    onFocus={() => setGuestEmailFocused(true)}
                    onBlur={() => setGuestEmailFocused(false)}
                    className={`w-full px-3 py-3 pr-20 text-xs border rounded-lg focus:outline-none transition-colors ${
                      guestEmailFocused ? "border-blue-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    onClick={addGuest}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded text-sm transition-colors ${
                      guestEmail.trim()
                        ? "bg-blue-500 text-white"
                        : "text-blue-500 bg-transparent border border-blue-500"
                    }`}
                  >
                    {guestEmail.trim() ? "Add" : "Send"}
                  </button>
                </div>

                {/* Guest List */}
                {guestList.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {guestList.map((email, index) => (
                      <div key={index} className="flex items-center w-[25%] justify-between bg-gray-100 px-3 py-2 rounded-lg">
                        <span className="text-xs">{email}</span>
                        <X
                          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500"
                          onClick={() => removeGuest(email)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upload Attachments */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-4">Upload attachments</label>
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 text-xs py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Select files
                </button>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{file.name}</span>
                          <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">{file.size}</div>
                        </div>
                        <X
                          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500"
                          onClick={() => removeFile(file.id)}
                        />
                      </div>
                    ))}

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <p className="text-sm text-gray-600">20/100</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-between sm:flex-row gap-3 pt-6">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-2 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => router.push("/dashboard/create-event")}
                  className="px-6 py-2 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Notifications Panel */}
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
            </div>
            <div className="p-2 sm:p-4">
              <div className="flex items-start gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg">
                <div className="relative">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="absolute -top-0.5 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-gray-700">
                    <span className="font-bold">John,</span> you have been invited to{" "}
                    <span className="font-bold">"Music live concert"</span> secure your spot now!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function NavItem({ icon }) {
  return (
    <div className="flex items-center justify-center hover:bg-gray-800 p-3 rounded-md cursor-pointer">
      <div className="text-white w-5 h-5">{icon}</div>
    </div>
  )
}

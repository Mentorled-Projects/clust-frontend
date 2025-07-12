"use client"

import type React from "react"
import type { ChangeEvent, KeyboardEvent } from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
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
import type { JSX } from "react/jsx-runtime"

interface UploadedFile {
  id: number
  name: string
  size: string
  type: string
}

export default function EventDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

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
  const [guestList, setGuestList] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [titleFocused, setTitleFocused] = useState(false)
  const [descriptionFocused, setDescriptionFocused] = useState(false)
  const [categoryFocused, setCategoryFocused] = useState(false)
  const [addressFocused, setAddressFocused] = useState(false)
  const [guestEmailFocused, setGuestEmailFocused] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const eventImageInputRef = useRef<HTMLInputElement>(null)

  const categories = ["Reading", "Technology", "Outdoor", "Fitness", "Photography", "Wellness", "Gaming"]

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      const imageFile = droppedFiles.find((file) => file.type.startsWith("image/"))

      if (imageFile) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setSelectedImage(event.target?.result as string)
        }
        reader.readAsDataURL(imageFile)
      }
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setSelectedImage(event.target?.result as string)
        }
        reader.readAsDataURL(file)
      }

      const newFiles: UploadedFile[] = Array.from(e.target.files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + "MB",
        type: file.type.includes("image") ? "image" : "document",
      }))
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const addGuest = () => {
    if (guestEmail.trim()) {
      if (!guestList.includes(guestEmail.trim())) {
        setGuestList([...guestList, guestEmail.trim()])
      }
      setGuestEmail("")
    }
  }

  const handleGuestEmailKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addGuest()
    }
  }

  const removeGuest = (email: string) => {
    setGuestList(guestList.filter((guest) => guest !== email))
  }

  const removeFile = (fileId: number) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId))
  }

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory)
    setShowCategoryDropdown(false)
  }

  const toggleNotification = () => {
    setShowNotifications(!showNotifications)
  }

  const [selectedDate, setSelectedDate] = useState(17)
  const [selectedMonth, setSelectedMonth] = useState(4) // May = 4 (0-indexed)
  const [selectedYear, setSelectedYear] = useState(2025)
  const [showMonthDropdown, setShowMonthDropdown] = useState(false)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number): number => {
    const firstDay = new Date(year, month, 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1
  }

  const isWeekend = (date: number, month: number, year: number): boolean => {
    const day = new Date(year, month, date).getDay()
    return day === 0 || day === 6
  }

  const isPastDate = (date: number, month: number, year: number): boolean => {
    const today = new Date()
    const checkDate = new Date(year, month, date)
    today.setHours(0, 0, 0, 0)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate < today
  }

  const handleDateSelect = (date: number) => {
    setSelectedDate(date)
    setDate(`${date} ${months[selectedMonth]}, ${selectedYear}`)
    setShowCalendar(false)
  }

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex)
    setShowMonthDropdown(false)
  }

  const renderCalendar = (): JSX.Element[] => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear)
    const days: JSX.Element[] = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>)
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const isSelected = date === selectedDate
      const isWeekendDay = isWeekend(date, selectedMonth, selectedYear)
      const isPast = isPastDate(date, selectedMonth, selectedYear)

      days.push(
        <div
          key={`date-${date}`}
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
        </div>,
      )
    }

    return days
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleEventImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setSelectedImage(event.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleEventImageBrowseClick = () => {
    eventImageInputRef.current?.click()
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`bg-black fixed top-0 left-0 z-20 transition-all duration-300 h-screen w-20 overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-center justify-center mb-6">
         <Image
  src={selectedImage || "/placeholder.svg"}
  alt="Selected preview"
  width={300} 
  height={200} 
  className="rounded-md object-cover"
/>
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

      <div className="flex flex-col flex-1 ml-20 h-screen">
        <nav className="flex items-center justify-between border-b p-2 sm:p-4 bg-white">
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

          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <button className="bg-[#1BAAF8] text-white text-xs px-2 sm:px-3 py-2 rounded-sm flex items-center gap-1 sm:gap-2">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Create Event</span>
              <span className="sm:hidden">Create</span>
            </button>

            <div className="relative cursor-pointer" onClick={toggleNotification}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span>
            </div>

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

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h3 className="text-sm sm:text-[20px] font-bold text-gray-900 mb-2">Create Event</h3>
              <p className="text-gray-600 text-xs">Fill in the details about your event</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                <input
                  type="file"
                  ref={eventImageInputRef}
                  onChange={handleEventImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  className={`border-2 w-[30%] h-[200px] border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
                    dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={handleEventImageBrowseClick}
                >
                  {selectedImage ? (
                    <div className="relative">
                      <Image
                        src={selectedImage || "/placeholder.svg"}
                        alt="Event preview"
                        className="max-w-full max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedImage(null)
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-xs mb-2">Drag & drop to upload</p>
                      <p className="text-blue-500 text-xs cursor-pointer hover:text-blue-600">or browse</p>
                    </>
                  )}
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  />
                </div>
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                    {categories.map((cat) => (
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
                      className="absolute right-15 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
                              className="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-blue-600"
                            >
                              {months[selectedMonth]} {selectedYear}
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            {showMonthDropdown && (
                              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-48 overflow-y-auto">
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
                        <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
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
                <label className="block text-sm font-medium text-gray-700 mb-4">Location</label>

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
                              src="/lagos-map.png"
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
                <h3 className="text-[16px] font-medium text-gray-900 mb-4">Add guest</h3>
                {guestList.length > 0 && (
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">
                      {guestList.length} guest{guestList.length !== 1 ? "s" : ""} added
                    </p>
                    <button
                      onClick={() => setGuestList([])}
                      className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                )}
                <div className="relative mb-4">
                  <input
                    type="email"
                    placeholder="Email Invitation"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    onKeyPress={handleGuestEmailKeyPress}
                    onFocus={() => setGuestEmailFocused(true)}
                    onBlur={() => setGuestEmailFocused(false)}
                    className={`w-full text-xs px-2 py-3 pr-20 border rounded-lg focus:outline-none transition-colors ${
                      guestEmailFocused ? "border-blue-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    onClick={addGuest}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded text-xs transition-colors ${
                      guestEmail.trim()
                        ? "bg-blue-500 text-white"
                        : "text-blue-500 bg-transparent border border-blue-500"
                    }`}
                  >
                    {guestEmail.trim() ? "Add" : "Send"}
                  </button>
                </div>

                {/* Guest List - Enhanced Flex Layout */}
                {guestList.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {guestList.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-blue-50 border border-blue-200 px-3 py-2 rounded-full"
                      >
                        <span className="text-sm text-blue-800 mr-2">{email}</span>
                        <X
                          className="w-4 h-4 text-blue-600 cursor-pointer hover:text-red-500 transition-colors"
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
              <div className="flex flex-col justify-between sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 text-xs py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => router.push("/dashboard/create-tickets")}
                  className="px-6 py-2 text-xs  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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

function NavItem({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center hover:bg-gray-800 p-3 rounded-md cursor-pointer">
      <div className="text-white w-5 h-5">{icon}</div>
    </div>
  )
}

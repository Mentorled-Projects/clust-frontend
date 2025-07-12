
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Edit, X, Trash2, Calendar, MapPin, ChevronRight, Lock, DollarSign, Heart, Check, ChevronLeft, Menu, Clock, HelpCircle, Settings, Users } from 'lucide-react';

export default function CreateEventPage() {
    const [selectedTicket, setSelectedTicket] = useState('Add ticket');
  const [selectedTicketType, setSelectedTicketType] = useState('Paid');
  const [showModal, setShowModal] = useState(false);
    const [showOrganizerModal, setShowOrganizerModal] = useState(false)

  const [activeType, setActiveType] = useState('');
  const [formData, setFormData] = useState({ name: '', capacity: '', price: '' });
  const [errors, setErrors] = useState({
     name: false,
     capacity: false,
     price: false,
  });

  const handleSelectType = (type: string) => {
    setActiveType(type);
    setFormData({ name: '', capacity: '', price: '' });
    setErrors({ name: false, capacity: false, price: false});
  };
 const toggleModal = () => {
    document.body.style.overflow = "hidden"
    setShowOrganizerModal(!showOrganizerModal)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: value.trim() === '' }));
    //    ({ ...prev, [name]: value })
    // setErrors({ ...errors, [name]: value.trim() === '' });
  };

  const handleSubmit = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      capacity: formData.capacity.trim() === '',
      price: formData.price.trim() === ''
    };
   
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(err => err)
    if(!hasErrors){
      console.log('Ticket Created:', formData);
      setShowModal(false)
    }
  };

  const pricePlaceholder = activeType === 'Free' ? 'free' : activeType === 'Donation' ? '#Any amount' : '# 0000';
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const ticketTypes = [
    {
      label: 'Paid',
      icon: <Lock className="text-blue-500" />, 
      description: 'Create a ticket that people have to pay for',
      bg: 'bg-blue-100',
    },
    {
      label: 'Free',
      icon: <DollarSign className="text-purple-500" />, 
      description: 'Create a free ticket for your event',
      bg: 'bg-purple-100',
    },
    {
      label: 'Donation',
      icon: <Heart className="text-red-500" />, 
      description: 'Let attendees donate any amount',
      bg: 'bg-red-100',
    },
  ];

  return (
    <div className="flex  min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 fixed top-0 left-0 h-full bg-black text-white flex flex-col items-center py-4 gap-4">
        <Image src="/logo.svg" alt="Clust Logo" width={30} height={30} />
        <ChevronLeft />
        <hr className="w-8 border-gray-600" />
        {/* Icons only */}
        <div className="space-y-4">
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

      {/* Main content wrapper */}
      <div className="flex-1 ml-16">
        {/* Top navbar */}
        <header className="fixed top-0 left-16 right-0 h-16 bg-white border-b z-10 flex items-center justify-between px-6">
          <div className="text-lg font-bold">Create Event</div>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-full">+ Create Event</button>
        </header>

        {/* Page content */}
        <main className="pt-20 px-6">
          {/* Back button */}
          <div className="flex items-center  mb-4 cursor-pointer" onClick={() => router.push("/dashboard")}>
            <ChevronLeft className="text-gray-700" size={18} />
            <button className="text-xs font-semibold">Back to event</button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="w-[40%] border rounded-lg space-y-4">
              <div className="flex justify-end gap-5 m-3">
                <div className="flex gap-1 items-center cursor-pointer" onClick={() => router.back()}>
                  <Edit size={15} /> <p className='text-xs'>Edit</p>
                </div>
                <div className="flex gap-1 items-center cursor-pointer text-red-600">
                  <Trash2 size={15} /> <p className='text-xs'>Delete</p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <Image
                  src="/image/Frame 2147225578.png"
                  width={150}
                  height={120}
                  alt="Event Image"
                  className="rounded-md object-cover"
                />

                <div className="space-y-2">
                  <h3 className="text-sm font-bold">Disco Party</h3>
                  <div className="flex items-center gap-2">
                    <Calendar size={13} />
                    <p className='text-xs'>22nd January 2025 
                      <br/>
                      · 9:00pm</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} />
                    <p className='text-xs'>Johnson Jakande Tinubu
                      <br/>
                    (JJT) Park
                    </p>
                  </div>

                
                </div>
              </div>
             <ul className="mt-2 space-y-2 text-sm">
  <li className="flex gap-2 items-center">
    <input
      type="radio"
      name="eventStep"
      value="Build event page"
      checked={selectedTicket === 'Build event page'}
      onChange={() => setSelectedTicket('Build event page')}
      className="accent-blue-600 text-xs"
    />
    Build event page
  </li>
  <li className="flex gap-2 items-center">
    <input
      type="radio"
      name="eventStep"
      value="Add ticket"
      checked={selectedTicket === 'Add ticket'}
      onChange={() => setSelectedTicket('Add ticket')}
      className="accent-blue-600 text-xs"
    />
    Add ticket
  </li>
  <li className="flex gap-2 items-center">
    <input
      type="radio"
      name="eventStep"
      value="Publish"
      checked={selectedTicket === 'Publish'}
      onChange={() => setSelectedTicket('Publish')}
      className="accent-blue-600 text-xs"
    />
    Publish
  </li>
</ul>

            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-4">
              <h2 className="text-lg text-center font-semibold">Create Your Tickets</h2>
              {ticketTypes.map((type) => (
                <div
                  key={type.label}
                  className={`border rounded-lg p-4 text-sm flex items-start justify-between cursor-pointer hover:border-blue-400 transition ${
                    selectedTicketType === type.label ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedTicketType(type.label)}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 flex text-xs items-center justify-center rounded ${type.bg}`}>{type.icon}</div>
                    <div>
                      <h3 className="font-semibold">{type.label}</h3>
                      <p className="text-xs text-gray-600">{type.description}</p>
                    </div>
                  </div>
                  <button
                  
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPopup(true);
                    }}
                    className="text-lg font-bold text-gray-500"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

           {showPopup && (
            <div className='fixed  inset-0  z-50 flex items-center justify-center'>
            <div className="absolute bg-[rgba(0,0,0,0.5)] w-full bg-opacity-50 inset-0" onClick={toggleModal}></div>

               <div className="relative bg-white rounded-2xl text-center w-full max-w-md p-8 mx-4">
                 <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-semibold">Add tickets</h3>
                                 </div>

                <div className="flex text-xs gap-2 mt-4">
                  {['Paid', 'Free', 'Donation'].map(type => (
                    <button key={type} onClick={() => handleSelectType(type)} className={`border px-4 py-2 rounded-full ${activeType === type ? 'border-blue-500 text-blue-600' : ''}`}>{type}</button>
                  ))}
                </div>

                {activeType && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Name</h3>
                      <input type="text" name="name" placeholder="General Admission" value={formData.name} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : 'text-black'}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Event Capacity</h3>
                      <input type="text" name="capacity" placeholder="E.g No of tickets" value={formData.capacity} onChange={handleChange} className={`w-full px-3 py-2 border rounded ${errors.capacity ? 'border-red-500' : 'text-black'}`} />
                      {errors.capacity && <p className="text-red-500 text-sm mt-1">Quantity required</p>}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Price</h3>
                      <input 
                      type='number'
                      name='price'
                      placeholder={pricePlaceholder}
                      value={formData.price}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded ${
                        errors.price ? 'border-red-500' : 'text-black'
                      }`}
                      />
                      {errors.price && (<p className="text-red-500 text-sm mt-1">Price is required</p>)}
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4 mt-6">
                  <button onClick={() => setShowModal(false)} className="px-6 py-2 text-xs border border-blue-500 text-blue-600 rounded hover:bg-blue-600 hover:text-white">Cancel</button>
                  <button onClick={handleSubmit} className="px-6 py-2 border text-xs border-blue-500 text-blue-600 rounded hover:bg-blue-600 hover:text-white">Save</button>
                </div>
              </div>
            </div>
          )} 
        </main>
      </div>
    </div>
  );
}

 function NavItem({ icon }) {
  return (
    <div className="flex items-center justify-center hover:bg-gray-800 p-3 rounded-md cursor-pointer">
      <div className="text-white w-5 h-5">{icon}</div>
    </div>
  );
}



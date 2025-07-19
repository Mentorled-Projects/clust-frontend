
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Edit, Trash2, Calendar, MapPin, MoreVertical, Lock, DollarSign, Heart, ChevronDown, ChevronLeft, Check
} from 'lucide-react';
import {
  Menu, Users, Clock, Settings, HelpCircle
} from "lucide-react";

export default function TicketSummaryPage() {
  const router = useRouter();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showAddMoreOptions, setShowAddMoreOptions] = useState(false);
      const [selectedTicket, setSelectedTicket] = useState('Add ticket');


  const steps = ['Build event page', 'Add ticket', 'Publish'];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 fixed top-0 left-0 h-full bg-black text-white flex flex-col items-center py-4 gap-4">
        <Image src="/logo.svg" alt="Clust Logo" width={30} height={30} />
        <ChevronLeft />
        <hr className="w-8 border-gray-600" />
        <nav className="space-y-4">
          <NavItem icon={<Menu />} />
          <NavItem icon={<Calendar />} />
          <NavItem icon={<Users />} />
          <NavItem icon={<Clock />} />
          <NavItem icon={<Settings />} />
          <NavItem icon={<HelpCircle />} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-16">
        {/* Top Navbar */}
        <header className="fixed top-0 left-16 right-0 h-16 bg-white border-b z-10 flex items-center justify-between px-6">
          <div className="text-lg font-bold">Tickets</div>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-full">+ Create Event</button>
        </header>

        {/* Content */}
        <main className="pt-20 px-6">
          <button className="text-black text-xs flex items-center gap-1 mb-4" onClick={() => router.back()}>
            <ChevronLeft size={15} /> Back to event
          </button>

          <h2 className="text-center text-xl font-bold mb-6">Tickets Summary</h2>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Panel */}
            <div className="flex-1 shadow-sm rounded-lg p-4 space-y-4">
              <div className="flex justify-end gap-5">
                <div className="flex gap-1 items-center text-blue-400 cursor-pointer" onClick={() => router.back()}>
                  <Edit size={14} /> <p className='text-xs'>Edit</p>
                </div>
                <div className="flex gap-1 items-center text-red-500 cursor-pointer">
                  <Trash2 size={14} /> <p className='text-xs'>Delete</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Image src="/image/Frame 2147225578.png" alt="Event" width={80} height={80} className="rounded" />
                <div className="space-y-1">
                  <h3 className="font-semibold">Disco Party</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Calendar size={14} /> <p>22nd January 2025 · 9:00pm</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin size={14} /> <p>Johnson Jakande Tinubu</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Steps</h3>
              <ul className="mt-2 space-y-2 text-sm">
  <li className="flex gap-2 text-xs items-center">
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
  <li className="flex gap-2 text-xs items-center">
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
  <li className="flex gap-2 text-xs items-center">
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
            </div>

            {/* Right Panel */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-9 bg-blue-100 flex items-center justify-center rounded">
                    <Lock className="text-blue-500" />
                  </div>
                  <div className='flex  gap-10 '>
                    <h3 className="font-medium text-xs">General Admission</h3>
                    <p className="text-xs">Sold: 0/15</p>
                    <p className="text-xs">#5000</p>
                  
                  
                  </div>
                   
                </div>
                    <MoreVertical size={15}
                    className="cursor-pointer"
                    onClick={() => setShowMoreOptions(!showMoreOptions)}
                  />
                 
                <div className="relative">
                  
                  {showMoreOptions && (
                    
                    <div className="absolute left-0 w-[100%] h-[120px] top-6 bg-white shadow rounded-lg text-sm">
                      <p className="p-2 text-xs hover:bg-gray-100 cursor-pointer">Edit</p>
                      <p className="p-2 text-xs hover:bg-gray-100 cursor-pointer">Copy</p>
                      <p className="p-2 text-xs hover:bg-gray-100 cursor-pointer text-red-500">Delete</p>
                  
                    </div>
                    
                  )}
                   <button
                  onClick={() => setShowAddMoreOptions(!showAddMoreOptions)}
                  className="text-white p-2 rounded-lg bg-blue-600 text-xs flex items-center gap-2"
                >
                  Add more ticket <ChevronDown size={10} />
                </button>
                </div>
              </div>

              <div className="relative">
              
                {showAddMoreOptions && (
                  <div className="absolute z-20 right-0 bg-white border shadow p-4 rounded-lg w-60 mt-2">
                    <div className="flex gap-2 items-center mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <Lock className="text-blue-500" size={20} />
                      </div>
                      <h3 className='text-xs'>Paid</h3>
                    </div>
                    <div className="flex gap-2 items-center mb-2">
                      <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                        <DollarSign className="text-purple-500" size={20} />
                      </div>
                      <h3 className='text-xs'>Free</h3>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <Heart className="text-red-500" size={20} />
                      </div>
                      <h3 className='text-xs'>Donation</h3>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => router.push('/dashboard/ready-to-publish')}
                className="bottom-20  absolute z-20 right-10 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
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

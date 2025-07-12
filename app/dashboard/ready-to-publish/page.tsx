
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Lock, Users, Upload, Trash2, Loader2, Plus, User } from 'lucide-react';

export default function PublishEventPage() {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
    const [description, setDescription] = useState("")
    const [descriptionFocused, setDescriptionFocused] = useState(false)
    const [guests, setGuests] = useState(['Tope22@gmail.com']);

  const [uploadedFiles, setUploadedFiles] = useState([
    { type: 'pdf', name: 'PDF Topic' },
    { type: 'jpeg', name: 'Image Name' },
  ]);
  const [guestEmails, setGuestEmails] = useState(['Tope22@gmail.com']);
const capacity = 15;

const addGuest = (email) => {
  if (email && !guests.includes(email) && guests.length < capacity) {
    setGuests([...guests, email]);
  }
};

const removeGuest = (email) => {
  setGuests(guests.filter(g => g !== email));
};


  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      router.push('/event/published');
    }, 2000);
  };

  const handleRemoveFile = (name) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== name));
  };

  const handleRemoveEmail = (email) => {
    setGuestEmails(prev => prev.filter(e => e !== email));
  };

  function email(value: string, index: number, array: string[]): ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 fixed top-0 left-0 h-full bg-black text-white flex flex-col items-center py-4 gap-4 z-20">
        <Image src="/logo.svg" alt="Clust Logo" width={30} height={30} />
        <hr className="w-8 border-gray-600" />
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-16">
        {/* Top Navbar */}
        <header className="fixed top-0 left-16 right-0 h-16 bg-white border-b z-10 flex items-center justify-between px-6">
          <div className="text-lg font-bold">Clust</div>
          <div className="flex items-center gap-4">
            <button className="bg-blue-500 text-white px-4 py-1 rounded-full">+ Create Event</button>
            <div className="flex flex-col text-sm">
              <span className="font-semibold">John</span>
              <span className="text-xs text-gray-500">JohnFavour@gmail.com</span>
            </div>
          </div>
        </header>

        <main className="pt-20 px-4 lg:px-8">
          <button onClick={() => router.push('/dashboard/ticket-summary')} 
          className="text-xs font-semibold text-black mb-4">&lt; Back to event</button>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Steps */}
            <div className="space-y-3 w-full lg:w-1/3">
              <p className="text-xs font-medium">Steps</p>
              {['Build event page', 'Add ticket', 'Publish'].map((step, index) => (
                <label key={step} className="flex text-xs items-center gap-2">
                  <input
                    type="radio"
                    checked={index < 2}
                    readOnly
                    className="accent-blue-600 "
                  />
                  <span>{step}</span>
                </label>
              ))}
            </div>

            {/* Preview and Details */}
            <div className="flex-1 space-y-2 ">
              <h3 className="text-lg font-semibold">Your event is almost ready to publish</h3>
              <p className="text-xs text-gray-600 mb-12">Here is a preview of your event</p>
              <div className="flex flex-col md:flex-row">
                {/* Event Summary */}
                <div className="flex-1  space-y-2">
                  <Image src="/image/Frame 2147225578.png" alt="Event" width={300} height={300} className="rounded-lg" />
                  <p className="font-bold text-sm">Disco party</p>
                  <div className="flex gap-2 items-center text-sm">
                    <Calendar size={12} />
                    <p className='text-xs'>22nd January 2025 · 9:00PM</p>
                  </div>
                  <div className="flex gap-2 items-center text-sm">
                    <MapPin size={12} />
                    <p className='text-xs'>Johnson Jakande Tinubu (JJT) Park</p>
                  </div>
                  <div className="flex gap-5 items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Lock size={12} className="text-blue-600" /> <p className='text-xs'>#5000</p>
                    </div>
                    <div className="flex items-center gap-1">
                     <User size={12} />
                     <p className="text-xs">{guests.length}/{capacity}</p>    
                  </div>
                  </div>
                </div>

                {/* Description & Guests */}
                <div className="flex-1 mr-35 space-y-4">
                     <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Get ready to groove under the shimmering lights! Join us for a night of non-stop disco classics, funky..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={() => setDescriptionFocused(true)}
                  onBlur={() => setDescriptionFocused(false)}
                  rows={4}
                  className={` text-xs w-[100%] px-3 py-2 border rounded-lg focus:outline-none transition-colors resize-none ${
                    descriptionFocused ? "border-blue-500" : "border-gray-300"
                  }`}
                />
              </div>

                  <div>
                    <h3 className="font-medium text-xs">Guest Added Via Email</h3>
                    {guests.map((email, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex gap-2 items-center">
                          <div className="relative w-6 h-6">
                            <User size={18} />
                            <Plus size={10} className="absolute -top-0.5 -right-0 bg-white text-black rounded-full" />
                          </div>
                          <p className='text-xs'>{email}</p>
                        </div>
                        <button
                          className="bg-red-500 text-black text-xs px-2 py-1 rounded-full flex items-center justify-center"
                          onClick={() => removeGuest(email)}
                        >
                          Cancel Invite
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-medium text-sm">Attachments</h3>
                    <hr className="my-2" />
                    {uploadedFiles.map(file => (
                      <div key={file.name} className="flex justify-between items-center text-xs">
                        <p>{file.type === 'pdf' ? '1 pdf' : '1 jpeg'} · {file.name}</p>
                        <Trash2 size={12} onClick={() => handleRemoveFile(file.name)} className="cursor-pointer text-red-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handlePublish}
                className="mt-6 right-5 absolute text-xs bg-blue-600 text-white px-6 py-2 rounded shadow-lg"
              >
                {isPublishing ? <Loader2 className="animate-spin" /> : 'Publish now'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

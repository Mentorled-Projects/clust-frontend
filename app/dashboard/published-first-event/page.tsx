
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ChevronLeft,
  Share2,
  Calendar,
  MapPin,
  User,
  X,
  Mail,
  Copy,
  Facebook,
  Twitter,
  Dot,
  ArrowRight
} from 'lucide-react';
import NavbarDesktop from '../NavbarDesktop/page';

export default function PublishedEventPage() {
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [guestCount, setGuestCount] = useState(2);

  return (
    <>
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Side Nav and Top Nav Components assumed to be persistent */}

      <main className="flex-1 p-6 md:p-10">
        <button
          className="text-sm flex items-center gap-1 mb-4"
          onClick={() => router.push('/ticket-summary')}
        >
          <ChevronLeft size={18} /> Back to event
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Div */}
          <div className="border-r pr-6 w-full md:w-1/2 space-y-3">
            <p className="font-semibold">Steps</p>
            <label className="flex items-center gap-2">
              <input type="radio" checked readOnly className="accent-blue-600" /> Build event page
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked readOnly className="accent-blue-600" /> Add ticket
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked readOnly className="accent-blue-600" /> Publish
            </label>

            <div className="bg-[#FCD6CE] p-4 rounded-lg mt-6 relative overflow-hidden">
              <div className="text-center space-y-1">
                <p className="font-bold">You published your first event. Now sell your tickets.</p>
                <p className="text-sm">Your event is in 20 days</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <div>
                <div className="flex items-center gap-2">
                    <Image src="/public/image/msg-deli.svg" width={15} height={15} alt='message-delivery'/>  <p className="font-semibold">Invitations sent</p>
                </div>
                <p className="text-xs text-gray-600">Emails have been delivered to {guestCount} guests</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-blue-500 font-bold text-lg">Jul</p>
                  <p className="font-bold text-xl">22</p>
                </div>
                <Image src="/event.jpg" alt="event" width={60} height={60} className="rounded" />
                <div>
                  <p className="font-bold">Disco Party</p>
                  <p className="text-xs text-gray-600">22nd January 2025 · 9:00PM</p>
                  <p className="text-xs text-gray-600">Johnson Jakande Tinubu (JJT) Park</p>
                </div>
                <button
                  className="ml-auto border border-black px-3 py-1 rounded-full text-sm"
                  onClick={() => setShowShareModal(true)}
                >
                  <Share2 size={14} className="inline-block mr-1" /> Share
                </button>
              </div>
            </div>
          </div>

          {/* Right Div */}
          <div className="flex-1 space-y-6">
            <h3 className="text-lg font-semibold">Promote your event</h3>
            <p className="text-sm text-gray-600">Resources and recommendations to get more audience</p>

            <div className="space-y-4">
              {["Marketing tool case study", "Marketing tool for organizer", "Marketing study"].map((title, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Dot />
                      <p className="font-semibold text-sm">{title}</p>
                    </div>
                    <p className="text-xs text-gray-500">Learn how other companies use marketing tools to sell out their events</p>
                  </div>
                  <ArrowRight className="text-gray-600 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>
              <div className="text-center">
                <h3 className="text-lg font-bold">Share event</h3>
                <p className="text-sm text-gray-600">Invite people for your event</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-blue-500 font-bold text-lg">Jul</p>
                    <p className="font-bold text-xl">22</p>
                  </div>
                  <Image src="/event.jpg" alt="event" width={60} height={60} className="rounded" />
                  <div>
                    <p className="font-bold">Disco Party</p>
                    <p className="text-xs text-gray-600">22nd January 2025 · 9:00PM</p>
                    <p className="text-xs text-gray-600">Johnson Jakande Tinubu (JJT) Park</p>
                  </div>
                </div>

                <div className="mt-4 border p-4 rounded-lg cursor-pointer flex items-center gap-3 hover:bg-gray-50">
                  <Mail />
                  <h3 className="text-sm font-semibold">Send email campaign</h3>
                </div>

                <p className="text-center text-xs my-3">OR</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Copy />
                    <button className="text-sm">Copy link</button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border p-2 rounded-lg">
                      <Facebook />
                      <button className="text-sm">Facebook</button>
                    </div>
                    <div className="flex items-center gap-2 border p-2 rounded-lg">
                      <Twitter />
                      <button className="text-sm">Twitter</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
        </>

  );
}

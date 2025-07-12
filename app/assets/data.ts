
export  const categories = [
    { label: "Clubs", icon: "/image/Mask group.svg" },
    { label: "Meetup", icon: "/image/Disco ball.svg" },
    { label: "Concerts", icon: "/image/Disco ball (1).svg" },
    { label: "Business", icon: "/image/Briefcase.svg" },
    { label: "Food & Drinks", icon: "/image/Fast food.svg" },
    { label: "Birthday", icon: "/image/Balloons.svg" },
    { label: "Hobbies", icon: "/image/Camera.svg" },
  ];

  
  export const events = [
    { label: "Silent Discos", icon: "/image/Frame 2147225589.png" },
    { label: "Entreprenuer Conference", icon: "/image/Image-10.png" },
    { label: "Art Work Time", icon: "/image/Image-9.png" },
    { label: "Listening Shows", icon: "/image/Image-8.png" },
    { label: "Music Live Oscura", icon: "/image/Image-1.png" },
    { label: "Music Live Concert", icon: "/image/Frame 2147225246 (1).png" },
  ];



  export const discover = [
    { label: "Book Lover Circle", icon: "/image/Image-5.png" },
    { label: "Cyber security", icon: "/image/Image-4.png" },
    { label: "Weekend Hikers", icon: "/image/Image-3.png" },
    { label: "Book Lover Circle", icon: "/image/Frame 2147225589.png" },
    { label: "Cyber security", icon: "/image/Image-4.png" },
    { label: "Weekend Hikers", icon: "/image/Image-3.png" },
  ];

   export const moreEvents = [
    { label: "Silent Discos", icon: "/image/Frame 2147225589.png" },
    { label: "Entreprenuer Conference", icon: "/image/Image-10.png" },
    { label: "Art Work Time", icon: "/image/Image-9.png" },
  ];
  

                               


  export const rsvpEvents = [
    { status: "• Confirmed", statusColor: "bg-[#349024]", textColor: "text-[#E7FFF0]", image: "/image/Image-2.png" },
    { status: "• Pending", statusColor: "bg-yellow-400", textColor: "text-[#606006]", image: "/image/Image-10.png" },
    { status: "• Confirmed", statusColor: "bg-[#349024]", textColor: "text-[#E7FFF0]", image: "/image/Image-9.png" },
    { status: "• Pending", statusColor: "bg-yellow-400", textColor: "text-[#606006]", image: "/image/Image-8.png" },
    { status: "• Confirmed", statusColor: "bg-[#349024]", textColor: "text-[#E7FFF0]", image: "/image/Image-1.png" },
    { status: "• Pending", statusColor: "bg-yellow-400", textColor: "text-[#606006]", image: "/image/Frame 2147225246 (1).png" },
  ];

  export const faqData = [
    {
      id: 1,
      question: "What time does the concert start?",
      answer: "Gates open at 4:00PM, and the first act hits the stage by 6:00PM",
    },
    {
      id: 2,
      question: "What time does the concert start?",
      answer: "Gates open at 4:00PM, and the first act hits the stage by 6:00PM",
    },
    {
      id: 3,
      question: "What time does the concert start?",
      answer: "Gates open at 4:00PM, and the first act hits the stage by 6:00PM",
    },
    {
        id: 4,
      question: "What time does the concert start?",
      answer: "Gates open at 4:00PM, and the first act hits the stage by 6:00PM",
    },
    
  ]


   export const categoriesDetails = ["Reading", 
    "Technology", 
    "Outdoor", 
    "Fitness", 
    "Photography", 
    "Wellness",
    "Gaming"]
    
   
  


    export const months = [
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





  // 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { X, Edit, Trash2, Calendar, MapPin, ChevronRight, Lock, DollarSign, Heart, ChevronLeft } from 'lucide-react';
// import {
//   Menu,
//   Users,
//   Clock,
//   Settings,
//   HelpCircle,
// } from "lucide-react"

// export default function CreateEventPage() {
//   const router = useRouter();
//   const [selectedTicket, setSelectedTicket] = useState('Add ticket');
//   const [selectedTicketType, setSelectedTicketType] = useState('Paid');
//   const [showPopup, setShowPopup] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeType, setActiveType] = useState('');
//   const [formData, setFormData] = useState({ name: '', capacity: '', price: '' });
//   const [errors, setErrors] = useState({});

//   const ticketTypes = [
//     {
//       label: 'Paid',
//       icon: <Lock className="text-blue-500" />, 
//       description: 'Create a ticket that people have to pay for',
//       bg: 'bg-blue-100',
//     },
//     {
//       label: 'Free',
//       icon: <DollarSign className="text-purple-500" />,
//       description: 'Create a free ticket for your event',
//       bg: 'bg-purple-100',
//     },
//     {
//       label: 'Donation',
//       icon: <Heart className="text-red-500" />, 
//       description: 'Let attendees donate any amount',
//       bg: 'bg-red-100',
//     },
//   ];

//   const handleSelectType = (type) => {
//     setActiveType(type);
//     setFormData({ name: '', capacity: '', price: '' });
//     setErrors({});
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: value.trim() === '' });
//   };

//   const handleSubmit = () => {
//     const newErrors = {};
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value.trim() === '') {
//         newErrors[key] = true;
//       }
//     });
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       console.log('Saved Ticket Info:', formData);
//       setShowModal(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <button onClick={() => setShowModal(true)}>&gt;</button>

//       {showModal && (
//         <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg w-full max-w-lg p-6">
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-semibold">Add tickets</h3>
//               <button onClick={() => setShowModal(false)}><X /></button>
//             </div>

//             <div className="flex gap-2 mt-4">
//               {['Paid', 'Free', 'Donation'].map((type) => (
//                 <button
//                   key={type}
//                   onClick={() => handleSelectType(type)}
//                   className={`border px-4 py-2 rounded-full ${activeType === type ? 'border-blue-500 text-blue-600' : ''}`}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>

//             {activeType && (
//               <div className="mt-6 space-y-4">
//                 <div>
//                   <h3 className="text-sm font-medium">Name</h3>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="General Admission"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : 'text-black'}`}
//                   />
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium">Event Capacity</h3>
//                   <input
//                     type="text"
//                     name="capacity"
//                     placeholder="E.g No of tickets"
//                     value={formData.capacity}
//                     onChange={handleChange}
//                     className={`w-full px-3 py-2 border rounded ${errors.capacity ? 'border-red-500' : 'text-black'}`}
//                   />
//                   {errors.capacity && (
//                     <p className="text-red-500 text-sm mt-1">Quantity required</p>
//                   )}
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium">Price</h3>
//                   <input
//                     type="number"
//                     name="price"
//                     placeholder={activeType === 'Free' ? 'Free' : activeType === 'Donation' ? '# Any amount' : '# 0000'}
//                     value={formData.price}
//                     onChange={handleChange}
//                     className={`w-full px-3 py-2 border rounded ${errors.price ? 'border-red-500' : 'text-black'}`}
//                   />
//                   {errors.price && (
//                     <p className="text-red-500 text-sm mt-1">Price is required</p>
//                   )}
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-center gap-4 mt-6">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-6 py-2 border border-blue-500 text-blue-600 rounded hover:bg-blue-600 hover:text-white"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-6 py-2 border border-blue-500 text-blue-600 rounded hover:bg-blue-600 hover:text-white"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


  
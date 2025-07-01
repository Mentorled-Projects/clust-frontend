
'use client'
import { useState, useEffect } from "react"
import { FiChevronDown, FiBell, FiSearch, FiMapPin, FiPlus } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import Image from 'next/image'


const categoriesList = [
    'Concerts',
    'Music', 
    'Fitness', 
    'Birthdays', 
    'Business',
    'Book Clubs', 
    'Podcast', 
    'Food & Drinks',  
    'Cooking & Booking', 
      'Fiesta', 
      'Volunteering', 
      'Sports',
      'Arts', 
      'Fashion'
];

function shuffleArray(arr: string[]){
    return[...arr].sort(() => 0.5 - Math.random())
}

export default function CateoryPage(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
   
   
    useEffect(() => {
        setCategories(shuffleArray(categoriesList))
    }, []);

   const handleCategoryClick = (category: string) => {
    if(selectedCategories.includes(category)){
        setSelectedCategories(selectedCategories.filter(item => item !== category))
    } else if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category])
    }
   };

   return (
    <div className="min-h-screen bg-white text-[#595959]">

        
{/*for the navbar*/}
   <nav className="flex items-center justify-between border-b p-4">
            {/** for the clust icon */}
             <Image 
            src="image\Frame 2147224772.svg" 
            alt="Clust-logo" 
            width={50} 
            height={50}   
            />
             
             {/** for the search bar */}
             <div className="flex items-center border-1 border-[#EFEFEF] rounded-full px-3 py-2.5 w-[40%] mx-4">
                 <FiSearch className="mr-2 text-xs text-[#C8CCD0]" />
                 <p className="text-xs text-[#C8CCD0]">Search for group or evevnts</p>
                 <div className="border border-[#EFEFEF] h-5 ml-20"></div>
                 <FiMapPin className="ml-2 text-[#595959]"/>
                 <p className="text-xs ml-2 text-[#C8CCD0]">Location...</p>
             </div> 
      

                       {/** for the other icons */}
                       <div className="flex items-center gap-10">
                           <button className="bg-[#1BAAF8] text-white text-xs px-3 py-2 rounded-sm flex items-center gap-2">
                                <FiPlus /> <p>Create Event</p>
                           </button>
                           <div className="relative">
                            <FiBell  size={20}/>
                            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span>   
                           </div>
                           <div className="flex items-center gap-2 relative">
                            <FaUserCircle size={24}/>
                                  <div>
                                    <p className="text-xs">John</p>
                                    <p className="text-xs text-[#595959]">JohnFavor@gmail.com</p>
                                  </div>
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

   {/** the category selection part */}
   <div className="text-center mt-20 ">
       <h2 className="text-xl font-bold mb-2 text-[#000000]">Pick one or more categories <br/> you're interested in</h2>
        <p className="text-[#000000] text-xs mb-6">Get connected to events and communities that match your vibe.</p>
   
   <div className="flex flex-wrap w-[30%] justify-center gap-6 mb-6 max-w-4xl mx-auto">
    {categories.map((caty, idx) => {
          const isSelected = selectedCategories.includes(caty);
          return (
            <button 
            key={idx}
            onClick={() => handleCategoryClick(caty)}
            className={`border mt-3 px-4 py-2 rounded-full text-xs transition-all duration-200
                ${isSelected ? 'bg-[#0794E2] text-white border-[#0794E2]' : 'bg-white border-[#0794E2] text-[#0794E2]'}
                `}
            >
                   {caty}
            </button>
          )

    })}

   </div>
   

   <button 
   className={`px-6 py-2 text-xs w-[23%] rounded-md font-semibold transition-all
   ${selectedCategories.length === 3 ? 'bg-[#0794E2] text-white' : 'bg-[#F1F1F1] text-[#E0E0E0]'}
   `}
    disabled={selectedCategories.length !== 3}
    >
        Continue
</button>
   <p className={`mt-3 text-xs ${selectedCategories.length === 3 ?'text-[#222124]' : 'text-[#979797]'}`}>
   {selectedCategories.length === 3 ? 'Great Job!' : 'Follow at least three categories to continue'}
   </p>
   

   
   </div>
    </div>
   )








}


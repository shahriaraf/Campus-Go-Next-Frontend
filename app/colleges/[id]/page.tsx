/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, use } from "react"; // Import 'use'
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Trophy, Star } from "lucide-react";

// 1. Type params as a Promise
export default function CollegeDetails({ params }: { params: Promise<{ id: string }> }) {
  // 2. Unwrap the params using React.use()
  const { id } = use(params); 
  
  const [college, setCollege] = useState<any>(null);

  useEffect(() => {
    // 3. Use the unwrapped 'id' here
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/colleges/${id}`)
      .then(res => setCollege(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!college) return <div className="pt-32 text-center text-brand-dark">Loading Details...</div>;

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header Image */}
      <div className="relative h-[400px] w-full">
        <Image 
          src={college.image} 
          alt={college.name}
          fill
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-brand-dark/60 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 pb-10 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{college.name}</h1>
            <div className="flex items-center gap-4 text-brand-light">
               <span className="flex items-center gap-1"><Star className="fill-yellow-400 text-yellow-400" size={18}/> {college.rating} Rating</span>
               <span className="flex items-center gap-1"><Calendar size={18}/> Admission: {college.admissionDates}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-8">
           
           {/* Admission Process */}
           <section className="bg-white p-8 rounded-2xl shadow-sm border border-brand-light">
             <h2 className="text-2xl font-bold text-brand-dark mb-4">Admission Process</h2>
             <p className="text-gray-600 leading-relaxed">{college.admissionProcess}</p>
           </section>

           {/* Events Details */}
           <section className="bg-white p-8 rounded-2xl shadow-sm border border-brand-light">
             <h2 className="text-2xl font-bold text-brand-dark mb-4 flex items-center gap-2">
               <Calendar className="text-brand-medium"/> Events Details
             </h2>
             <ul className="grid grid-cols-1 gap-3">
               {college.events?.map((e:string, i:number) => (
                 <li key={i} className="flex items-center gap-2 text-gray-700 bg-brand-light/20 p-3 rounded-lg">
                   <div className="w-2 h-2 rounded-full bg-brand-medium"></div> {e}
                 </li>
               ))}
             </ul>
           </section>

           {/* Sports Categories */}
           <section className="bg-white p-8 rounded-2xl shadow-sm border border-brand-light">
             <h2 className="text-2xl font-bold text-brand-dark mb-4 flex items-center gap-2">
               <Trophy className="text-brand-medium"/> Sports Facilities
             </h2>
             <div className="flex flex-wrap gap-3">
               {college.sports?.map((s:string, i:number) => (
                 <span key={i} className="px-4 py-2 bg-brand-dark text-white rounded-full text-sm font-semibold">
                   {s}
                 </span>
               ))}
             </div>
           </section>
        </div>

        {/* Sidebar Call to Action */}
        <div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-brand-medium sticky top-24">
             <h3 className="text-xl font-bold text-brand-dark mb-4">Ready to Apply?</h3>
             <p className="text-sm text-gray-500 mb-6">Secure your seat for the upcoming batch.</p>
             <Link 
               href="/admission" 
               className="block w-full text-center bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-medium transition-colors shadow-lg shadow-brand-light"
             >
               Apply Now
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
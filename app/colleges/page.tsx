/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Calendar, Microscope, ArrowRight, Star } from "lucide-react";

// 1. Create a Child Component that handles the Search Logic
function CollegeList() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const url = search 
          ? `${process.env.NEXT_PUBLIC_API_URL}/colleges?search=${search}`
          : `${process.env.NEXT_PUBLIC_API_URL}/colleges`;
        const res = await axios.get(url);
        setColleges(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, [search]);

  if (loading) {
    return <div className="text-center py-20 text-brand-medium">Loading colleges...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {colleges.map((college: any) => (
        <div key={college._id} className="bg-white rounded-2xl shadow-lg border border-brand-light overflow-hidden hover:shadow-2xl transition duration-300 group">
          {/* Image */}
          <div className="h-48 w-full overflow-hidden relative">
            <Image 
              src={college.image} 
              alt={college.name} 
              fill
              className="object-cover group-hover:scale-110 transition duration-500" 
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-brand-dark shadow-sm z-10">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              {college.rating}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-brand-dark mb-4">{college.name}</h3>
            
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-brand-medium" />
                <span>Admission: <span className="font-semibold">{college.admissionDates}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Microscope size={16} className="text-brand-medium" />
                <span>Research: <span className="font-semibold">{college.researchCount || 50}+ Projects</span></span>
              </div>
            </div>

            <Link 
              href={`/colleges/${college._id}`}
              className="flex items-center justify-center gap-2 w-full bg-brand-light/20 text-brand-dark font-bold py-3 rounded-xl border border-brand-medium/30 hover:bg-brand-dark hover:text-white transition-all"
            >
              Details <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// 2. Main Page Component (Wraps the logic in Suspense)
export default function Colleges() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-dark mb-8 border-l-8 border-brand-medium pl-4">
          All Campuses
        </h1>

        {/* This boundary makes the build happy */}
        <Suspense fallback={<div className="text-center py-20">Loading Search Results...</div>}>
          <CollegeList />
        </Suspense>
        
      </div>
    </div>
  );
}
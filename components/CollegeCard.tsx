"use client";
import { Star, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CollegeProps {
  _id: string;
  name: string;
  image: string;
  rating: number;
  admissionDates: string;
  researchCount: number;
}



export default function CollegeCard({ data }: { data: CollegeProps }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={data.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f"}
          alt={data.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-800 shadow-sm">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          {data.rating}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {data.name}
        </h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={14} className="text-pink-500" />
            <span>Admits: {data.admissionDates}</span>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-indigo-600">{data.researchCount}+</span> Research Papers
          </div>
        </div>

        <Link 
          href={`/colleges/${data._id}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-indigo-600 hover:text-white hover:border-transparent transition-all duration-300"
        >
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
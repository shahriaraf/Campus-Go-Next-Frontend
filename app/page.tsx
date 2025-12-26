/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import added
import { Search, ArrowRight, Calendar, Trophy, Microscope, BookOpen, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/colleges`);
        setColleges(res.data.slice(0, 3));
      } catch (error) {
        console.error("Backend not connected yet");
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(search.trim()) {
      router.push(`/colleges?search=${search}`);
    }
  };

  return (
    <main className="min-h-screen pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-medium py-24 px-4 text-center text-white relative overflow-hidden">
        {/* Background blobs omitted for brevity, keeping same structure */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 relative z-10">
          Find Your Dream Campus
        </h1>
        <p className="text-brand-light text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
          Explore admission dates, research history, and sports facilities of top universities.
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative z-10">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search for a college name..." 
              className="w-full py-4 px-8 rounded-full text-brand-dark placeholder-brand-medium/70 shadow-2xl focus:outline-none focus:ring-4 focus:ring-brand-light/30 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-2 bg-brand-dark hover:bg-brand-medium text-white p-2.5 rounded-full transition-colors">
              <Search size={24} />
            </button>
          </div>
        </form>
      </section>

      {/* 2. THREE COLLEGE CARDS SECTION */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="flex items-end justify-between mb-10">
           <div>
             <h2 className="text-3xl font-bold text-brand-dark">Featured Colleges</h2>
             <div className="h-1 w-20 bg-brand-medium mt-2 rounded-full"></div>
           </div>
           <Link href="/colleges" className="text-brand-medium font-semibold hover:text-brand-dark flex items-center gap-1">
             View All <ArrowRight size={18} />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {colleges.length > 0 ? (
            colleges.map((college: any) => (
              <div key={college._id} className="bg-white rounded-2xl shadow-lg border border-brand-light overflow-hidden hover:shadow-2xl transition duration-300 group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={college.image} 
                    alt={college.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-dark mb-4">{college.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-brand-medium" />
                      <span>Admits: <span className="font-semibold">{college.admissionDates}</span></span>
                    </div>
                    {/* Other details omitted for brevity, keeping existing structure */}
                  </div>
                  <Link href={`/colleges/${college._id}`} className="block w-full text-center bg-brand-light/30 text-brand-dark font-bold py-3 rounded-xl border border-brand-light hover:bg-brand-dark hover:text-white transition-all">
                    Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse"></div>
            ))
          )}
        </div>
      </section>

      {/* 3. GRADUATE GALLERY SECTION */}
      <section className="bg-brand-light/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-12">Our Community Gallery</h2>
          
          {/* Defined strict heights to prevent collapsing */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80", // 1. Large Group
              "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",    // 2. Hats
              "https://images.unsplash.com/photo-1687709348710-05314eea5476?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 3. Happy Student
              "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcHVzJTIwbGlmZXxlbnwwfHwwfHx8MA%3D%3D", // 4. Study Group
              "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHVzJTIwbGlmZXxlbnwwfHwwfHx8MA%3D%3D", // Large Auditorium
            ].map((src, index) => (
              <div 
                key={index} 
                className={`relative rounded-xl overflow-hidden shadow-md group ${
                  // Logic: Item 0 and Item 5 span 2 rows and cols.
                  // We explicitly set heights: 400px for large, 190px for small.
                  index === 0 || index === 5 
                    ? 'col-span-2 row-span-2 h-[250px] md:h-[400px]' 
                    : 'col-span-1 h-[120px] md:h-[190px]'
                }`}
              >
                <Image 
                  src={src} 
                  alt={`Gallery Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RESEARCH PAPER LINKS SECTION */}
      <section className="max-w-5xl mx-auto py-20 px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-brand-light p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light rounded-bl-full opacity-50"></div>
          
          <h2 className="text-3xl font-bold text-brand-dark mb-8 flex items-center gap-3">
            <BookOpen className="text-brand-medium" /> 
            Student Research Papers
          </h2>
          
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="block group bg-gray-50 hover:bg-brand-light/20 p-4 rounded-xl transition-colors border border-transparent hover:border-brand-medium/30"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-brand-dark group-hover:text-brand-medium transition-colors">
                      {item === 1 ? "Impact of AI on Modern Education Systems" : 
                       item === 2 ? "Sustainable Architecture in Urban Campuses" : 
                       "Quantum Computing Advances 2024"}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Published by Students of MIT • March 2024</p>
                  </div>
                  <ArrowRight size={20} className="text-gray-300 group-hover:text-brand-dark transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REVIEWS SECTION */}
      <section className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Student Reviews & Feedback</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-brand-light/50 transition duration-300">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, star) => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p className="text-brand-light italic mb-6 leading-relaxed">
                  "The application process was incredibly smooth. I found all the details about the research facilities which helped me make my decision."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-medium flex items-center justify-center font-bold text-white">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <h4 className="font-bold">Student Name</h4>
                    <span className="text-xs text-brand-light opacity-70">Harvard University</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
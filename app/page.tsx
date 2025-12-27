/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; 
import { Search, ArrowRight, Calendar, Trophy, Microscope, BookOpen, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Footer from "@/components/Footer";

export default function Home() {
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState([]);
  const [reviews, setReviews] = useState([]); // <--- New State for Reviews
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Colleges
        const resColleges = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/colleges`);
        setColleges(resColleges.data.slice(0, 3));

        // 2. Fetch Reviews (REAL DATA)
        const resReviews = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admission/reviews`);
        setReviews(resReviews.data);
        
      } catch (error) {
        console.error("Backend error");
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
      
      {/* 1. HERO SECTION (Kept same) */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-medium py-24 px-4 text-center text-white relative overflow-hidden">
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

      {/* 2. FEATURED COLLEGES (Kept same) */}
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
          {colleges.map((college: any) => (
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
                </div>
                <Link href={`/colleges/${college._id}`} className="block w-full text-center bg-brand-light/30 text-brand-dark font-bold py-3 rounded-xl border border-brand-light hover:bg-brand-dark hover:text-white transition-all">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GRADUATE GALLERY (Kept same) */}
      <section className="bg-brand-light/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-12">Our Community Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
              "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
              "https://images.unsplash.com/photo-1687709348710-05314eea5476?q=80&w=1170&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?w=500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?w=500&auto=format&fit=crop",
            ].map((src, index) => (
              <div key={index} className={`relative rounded-xl overflow-hidden shadow-md group ${index === 0 || index === 5 ? 'col-span-2 row-span-2 h-[250px] md:h-[400px]' : 'col-span-1 h-[120px] md:h-[190px]'}`}>
                <Image src={src} alt="Gallery" fill className="object-cover transition duration-700 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RESEARCH PAPER (Kept same) */}
      <section className="max-w-5xl mx-auto py-20 px-4">
        {/* ... (Kept existing code for research) ... */}
        <div className="bg-white rounded-2xl shadow-xl border border-brand-light p-8 md:p-12 relative overflow-hidden">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 flex items-center gap-3">
            <BookOpen className="text-brand-medium" /> Student Research Papers
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="block bg-gray-50 p-4 rounded-xl border border-transparent">
                 <h3 className="font-bold text-brand-dark">Research Paper {item}</h3>
                 <p className="text-sm text-gray-500">Published by Students of MIT</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REVIEWS SECTION (DYNAMIC) */}
      <section className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Student Reviews & Feedback</h2>
          
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((rev: any) => (
                <div key={rev._id} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-brand-light/50 transition duration-300">
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(rev.rating || 5)].map((_, star) => <Star key={star} size={16} fill="currentColor" />)}
                  </div>
                  
                  <p className="text-brand-light italic mb-6 leading-relaxed line-clamp-4">
                    "{rev.review}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-full bg-brand-medium overflow-hidden border border-white/30">
                      <Image 
                        src={rev.userId?.image || "https://ui-avatars.com/api/?background=4988C4&color=fff"} 
                        alt="User" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{rev.userId?.name || "Anonymous"}</h4>
                      <span className="text-xs text-brand-light opacity-70">{rev.collegeId?.name || "University"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-brand-light/50">
              No reviews yet. Be the first to add one!
            </div>
          )}
        </div>
      </section>

      <Footer></Footer>
    </main>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Register User in Backend
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
      
      toast.success("Account created successfully!");
      
      // 2. Redirect to Login
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      
    } catch (error: any) {
      // Handle Backend Errors
      const msg = error.response?.data?.message || "Registration failed. Try again.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden bg-gray-50">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-light/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-medium/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-white/50 p-8 md:p-10 relative">
        
        {/* Decorative Icon */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-dark text-white p-4 rounded-2xl shadow-lg shadow-brand-light">
          <Sparkles size={32} />
        </div>

        <div className="text-center mt-6 mb-8">
          <h1 className="text-3xl font-extrabold text-brand-dark mb-2">Create Account</h1>
          <p className="text-gray-500">Join Campus Go and start your journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Input */}
          <div className="relative group">
            <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-brand-medium transition-colors" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-medium focus:ring-4 focus:ring-brand-light/30 outline-none transition-all duration-300"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-brand-medium transition-colors" />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-medium focus:ring-4 focus:ring-brand-light/30 outline-none transition-all duration-300"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          
          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-brand-medium transition-colors" />
            <input
              type="password"
              placeholder="Password (Min 6 chars)"
              required
              minLength={6}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-medium focus:ring-4 focus:ring-brand-light/30 outline-none transition-all duration-300"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-dark to-[#2c6cb3] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-light hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>Sign Up <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-brand-dark hover:text-brand-medium transition-colors underline decoration-brand-light decoration-2 underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
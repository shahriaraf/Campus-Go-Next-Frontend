/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Mail, Lock, Github } from "lucide-react";

// Firebase Imports
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/firebase"; 

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1. Standard Email/Password Login
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    handleResponse(result);
  };

  // 2. Social Login Logic
  const handleSocialLogin = async (provider: any) => {
    if (loading) return;

    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const signInResult = await signIn("credentials", {
        redirect: false,
        firebaseToken: token,
      });

      handleResponse(signInResult);
    } catch (error: any) {
      console.log("Popup closed or failed", error.code);
      setLoading(false);

      if (
        error.code === 'auth/popup-closed-by-user' || 
        error.code === 'auth/cancelled-popup-request'
      ) {
        return; 
      }

      toast.error("Login failed");
    }
  };

  const handleResponse = (result: any) => {
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("Welcome back!");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-brand-light p-8">
        <h1 className="text-3xl font-bold text-brand-dark mb-2 text-center">Student Login</h1>
        
        {/* Email Form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4 mt-8">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20}/>
            <input
              type="email"
              placeholder="Email Address"
              className="input-field pl-10"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20}/>
            <input
              type="password"
              placeholder="Password"
              className="input-field pl-10"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          {/* --- FORGOT PASSWORD LINK ADDED HERE --- */}
          <div className="text-right">
             <Link href="/forgot-password" className="text-sm text-brand-medium hover:underline font-medium">
               Forgot Password?
             </Link>
          </div>
          {/* -------------------------------------- */}

          <button disabled={loading} className="btn-primary w-full">
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-sm text-gray-400">OR SOCIALS</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <div className="space-y-3">
          {/* Google Button */}
          <button 
            type="button"
            onClick={() => handleSocialLogin(googleProvider)} 
            className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >
            <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} alt="Google"/>
            Sign in with Google
          </button>

          {/* GitHub Button */}
          <button 
            type="button"
            onClick={() => handleSocialLogin(githubProvider)} 
            className="w-full bg-[#24292e] text-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-[#333] transition font-medium"
          >
            <Github size={20} fill="currentColor" />
            Sign in with GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm">
          New here? <Link href="/register" className="font-bold text-brand-medium hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
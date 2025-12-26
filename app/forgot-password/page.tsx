"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft, KeyRound, Mail, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>(""); 
  const [stage, setStage] = useState<number>(1); // 1 = Input Email, 2 = Input Token/Password
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password-request`, { email });
      toast.success("Reset link generated!");
      
      // --- SIMULATION START ---
      // In production, this token goes to email. 
      // Here we set it to state to show the user immediately.
      setToken(res.data.token); 
      // --- SIMULATION END ---
      
      setStage(2);
    } catch (e) {
      console.error(e);
      toast.error("Email not found");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Explicitly cast e.target to HTMLFormElement to use FormData
    const formData = new FormData(e.currentTarget);
    
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        token: formData.get("token"),
        newPassword: formData.get("password")
      });
      toast.success("Password Changed Successfully!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (e) {
      console.error(e);
      toast.error("Invalid or Expired Token");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-brand-light p-8">
        
        <Link href="/login" className="flex items-center gap-1 text-sm text-gray-500 mb-6 hover:text-brand-dark transition">
          <ArrowLeft size={16}/> Back to Login
        </Link>
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-brand-light/30 text-brand-dark rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound size={24} />
          </div>
          <h1 className="text-2xl font-bold text-brand-dark">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-1">
            {stage === 1 ? "Enter your email to receive instructions" : "Create a new strong password"}
          </p>
        </div>

        {stage === 1 ? (
          <form onSubmit={handleRequest} className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20}/>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="input-field pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button disabled={loading} className="btn-primary w-full">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            
            {/* SIMULATION BOX */}
            <div className="bg-blue-50 p-4 rounded-xl text-xs text-blue-900 border border-blue-100 break-all">
               <div className="flex items-center gap-2 font-bold mb-1">
                 <CheckCircle size={14} /> Email Sent (Simulation)
               </div>
               Copy this token:<br/>
               <span className="font-mono bg-white px-1 rounded select-all">{token}</span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Paste Token</label>
              <input name="token" placeholder="Paste token here" className="input-field" required />
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">New Password</label>
              <input name="password" type="password" placeholder="Min 6 characters" className="input-field" required minLength={6} />
            </div>

            <button disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg">
              {loading ? "Updating..." : "Set New Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
  };
}

export default function Admission() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession() as { data: Session | null };
  const router = useRouter();

  // Fetch college list for the dropdown/selection
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/colleges`).then(res => setColleges(res.data));
  }, []);

  const onSubmit = async (data: any) => {
    if(!session) return toast.error("Please login first");
    setLoading(true);

    try {
      // 1. Image Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", data.image[0]);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      // 2. Send Data to Backend
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admission`, 
        { ...data, image: uploadRes.data.secure_url },
        { headers: { Authorization: `Bearer ${session?.user?.accessToken}` }}
      );

      toast.success("Application Submitted!");
      router.push("/my-college"); // Redirect to My College
    } catch (err) {
      toast.error("Submission Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-brand-light/30 to-white flex justify-center items-center">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-3xl border border-brand-light">
        <h2 className="text-3xl font-bold mb-8 text-brand-dark text-center">College Admission Form</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* College Selection */}
          <div>
            <label className="block text-sm font-bold mb-2 text-brand-dark">Select College</label>
            <select {...register("collegeId", { required: true })} className="input-field">
              <option value="">-- Choose a College --</option>
              {colleges.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            {errors.collegeId && <span className="text-red-500 text-xs">Please select a college</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-brand-dark">Candidate Name</label>
              <input {...register("candidateName", { required: true })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-brand-dark">Subject</label>
              <input {...register("subject", { required: true })} className="input-field" placeholder="e.g. Computer Science" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-brand-dark">Email</label>
              <input type="email" {...register("email", { required: true })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-brand-dark">Phone</label>
              <input type="tel" {...register("phone", { required: true })} className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label className="block text-sm font-bold mb-2 text-brand-dark">Date of Birth</label>
               <input type="date" {...register("dob", { required: true })} className="input-field" />
             </div>
             <div>
               <label className="block text-sm font-bold mb-2 text-brand-dark">Candidate Photo</label>
               <input type="file" {...register("image", { required: true })} className="input-field p-2" accept="image/*" />
             </div>
          </div>

          <div>
             <label className="block text-sm font-bold mb-2 text-brand-dark">Address</label>
             <textarea {...register("address", { required: true })} className="input-field" rows={3}></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${loading ? 'bg-gray-400' : 'bg-brand-dark hover:bg-brand-medium hover:-translate-y-1'}`}
          >
            {loading ? "Processing..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
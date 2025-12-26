/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Edit2, Save, User, Mail, MapPin, School, Camera } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import type { Session } from "next-auth";

interface ExtendedSession extends Session {
  user: Session["user"] & {
    accessToken?: string;
  };
}

export default function Profile() {
  const { data: session, update } = useSession() as { data: ExtendedSession | null; update: any };
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  useEffect(() => {
    if (session?.user?.accessToken) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${session.user.accessToken}` },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        });
    }
  }, [session]);

  // Handle Image Upload to Cloudinary
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading image...");
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      // Update local state immediately
      setUser({ ...user, image: res.data.secure_url });
      toast.success("Image uploaded! Click Save to apply.", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed", { id: toastId });
    }
  };

  const handleSave = async () => {
    try {
      if (!session?.user?.accessToken) {
        toast.error("Not authenticated");
        return;
      }
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        user,
        {
          headers: { Authorization: `Bearer ${session.user.accessToken}` },
        }
      );
      // Update session if details changed
      await update({ 
        ...session, 
        user: { 
          ...session?.user, 
          name: user.name,
          image: user.image 
        } 
      });

      setIsEditing(false);
      toast.success("Profile Updated Successfully!");
    } catch (e) {
      toast.error("Update failed");
    }
  };

  if (loading)
    return <div className="pt-32 text-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-light">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-brand-dark to-brand-medium relative"></div>

        <div className="px-8 pb-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end -mt-16 mb-8 gap-4">
            
            {/* FIXED: Added CSS classes for width/height/border */}
            <div className="relative group w-36 h-36 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden flex-shrink-0">
              <Image
                src={
                  user.image ||
                  session?.user?.image ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="User Profile"
                fill
                className="object-cover"
              />
              
              {/* Image Edit Overlay */}
              {isEditing && (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center text-white cursor-pointer hover:bg-black/50 transition"
                >
                  <Camera size={24} />
                  {/* Hidden File Input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-colors shadow-lg ${
                isEditing
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-brand-dark text-white hover:bg-brand-medium"
              }`}
            >
              {isEditing ? (
                <>
                  <Save size={18} /> Save Changes
                </>
              ) : (
                <>
                  <Edit2 size={18} /> Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-dark">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-brand-medium font-semibold text-sm">
                <User size={16} /> Full Name
              </label>
              <input
                disabled={!isEditing}
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className={`w-full py-2 bg-transparent border-b-2 transition-colors ${
                  isEditing
                    ? "border-brand-medium text-brand-dark"
                    : "border-gray-100 text-gray-700"
                }`}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-brand-medium font-semibold text-sm">
                <Mail size={16} /> Email Address
              </label>
              <input
                disabled={!isEditing}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className={`w-full py-2 bg-transparent border-b-2 transition-colors ${
                  isEditing
                    ? "border-brand-medium text-brand-dark"
                    : "border-gray-100 text-gray-700"
                }`}
              />
            </div>

            {/* University Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-brand-medium font-semibold text-sm">
                <School size={16} /> University
              </label>
              <input
                disabled={!isEditing}
                value={user.university || ""}
                placeholder={!isEditing ? "Not specified" : "Enter university"}
                onChange={(e) =>
                  setUser({ ...user, university: e.target.value })
                }
                className={`w-full py-2 bg-transparent border-b-2 transition-colors ${
                  isEditing
                    ? "border-brand-medium text-brand-dark"
                    : "border-gray-100 text-gray-700"
                }`}
              />
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-brand-medium font-semibold text-sm">
                <MapPin size={16} /> Address
              </label>
              <input
                disabled={!isEditing}
                value={user.address || ""}
                placeholder={!isEditing ? "Not specified" : "Enter address"}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                className={`w-full py-2 bg-transparent border-b-2 transition-colors ${
                  isEditing
                    ? "border-brand-medium text-brand-dark"
                    : "border-gray-100 text-gray-700"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

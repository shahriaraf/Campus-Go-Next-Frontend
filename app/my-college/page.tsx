/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Star, Home } from "lucide-react";
import Image from "next/image";

interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
  };
}

export default function MyCollege() {
  const { data: session } = useSession() as { data: CustomSession | null };
  const [admissions, setAdmissions] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  // Fetch user's bookings
  const fetchData = async () => {
    if (session?.user?.accessToken) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admission/my-college`,
          {
            headers: { Authorization: `Bearer ${session.user.accessToken}` },
          }
        );
        setAdmissions(res.data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  // Handle Review Submission
  const submitReview = async (data: any, admissionId: string) => {
    if (!session?.user?.accessToken) {
      toast.error("Session not available");
      return;
    }
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admission/review`,
        { admissionId, review: data.review, rating: Number(data.rating) },
        { headers: { Authorization: `Bearer ${session.user.accessToken}` } }
      );
      toast.success("Review Added to Home Page!");
      fetchData(); // Refresh to show the saved review
      reset();
    } catch (err) {
      toast.error("Failed to add review");
    }
  };

  if (!session)
    return (
      <div className="pt-32 text-center">
        Please login to see your colleges.
      </div>
    );

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-dark mb-8 flex items-center gap-2">
          <Home className="text-brand-medium" /> My Colleges
        </h1>

        {admissions.length === 0 ? (
          <p className="text-gray-500">No colleges booked yet.</p>
        ) : (
          <div className="space-y-6">
            {admissions.map((adm: any) => (
              <div
                key={adm._id}
                className="bg-white rounded-2xl shadow-sm border border-brand-light p-6 gap-6"
              >
                {/* College Image */}
                <div className="h-72 w-full overflow-hidden relative">
                  <Image
                    src={adm.collegeId.image}
                    alt={adm.collegeId.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>

                <div className="flex-1 mt-4 md:mt-0">
                  <h2 className="text-2xl font-bold text-brand-dark">
                    {adm.collegeId.name}
                  </h2>
                  <div className="mt-2 text-gray-600 grid grid-cols-2 gap-2 text-sm mb-4">
                    <p>
                      <span className="font-bold">Subject:</span> {adm.subject}
                    </p>
                    <p>
                      <span className="font-bold">Date:</span>{" "}
                      {new Date(adm.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-bold">Candidate:</span>{" "}
                      {adm.candidateName}
                    </p>
                    <p>
                      <span className="font-bold">Phone:</span> {adm.phone}
                    </p>
                  </div>

                  {/* Review Section */}
                  <div className="bg-brand-light/10 p-4 rounded-xl border border-brand-light/30">
                    {adm.review ? (
                      <div>
                        <div className="flex text-yellow-500 mb-1">
                          {[...Array(adm.rating)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                        </div>
                        <p className="italic text-gray-600">"{adm.review}"</p>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleSubmit((d) => submitReview(d, adm._id))}
                        className="flex flex-col md:flex-row gap-3"
                      >
                        <select
                          {...register("rating", { required: true })}
                          className="p-2 rounded-lg border border-brand-light outline-none"
                        >
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                        </select>
                        <input
                          {...register("review", { required: true })}
                          placeholder="Write a review..."
                          className="flex-1 p-2 rounded-lg border border-brand-light outline-none"
                        />
                        <button className="bg-brand-medium text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-dark transition">
                          Add Review
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image"; // Import added
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges" },
    { name: "Admission", href: "/admission" },
    { name: "My College", href: "/my-college" },
  ];

  return (
    <nav className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-dark rounded-lg flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="text-2xl font-bold text-brand-dark tracking-tight">
              Campus Go
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-brand-dark font-medium hover:text-brand-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-medium transition-all group-hover:w-full"></span>
              </Link>
            ))}

            {session ? (
              <div className="flex items-center gap-4 pl-6 border-l border-brand-light">
                <Link href="/profile" className="flex items-center gap-2 group">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-brand-medium group-hover:border-brand-dark transition">
                    <Image 
                      src={session.user?.image || "https://ui-avatars.com/api/?background=1C4D8D&color=fff"} 
                      alt="Profile" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <button 
                  onClick={() => signOut()} 
                  className="text-gray-400 hover:text-red-500 transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-brand-dark text-white px-6 py-2.5 rounded-full font-medium hover:bg-brand-medium transition-all shadow-lg shadow-brand-light"
              >
                Login
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-dark">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-brand-light absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-brand-dark hover:bg-brand-light hover:text-brand-dark font-medium"
              >
                {link.name}
              </Link>
            ))}
            {!session && (
               <Link 
                 href="/login" 
                 onClick={() => setIsOpen(false)}
                 className="block w-full text-center mt-4 bg-brand-dark text-white py-3 rounded-lg font-bold"
               >
                 Login / Register
               </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
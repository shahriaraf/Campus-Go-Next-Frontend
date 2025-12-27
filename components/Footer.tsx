"use client";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-brand-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center text-white font-bold text-lg">
                C
              </div>
              <span className="text-2xl font-bold tracking-tight">Campus Go</span>
            </div>
            <p className="text-brand-light/80 text-sm leading-relaxed">
              Book your seat today for a better tomorrow. We connect ambitious students with world-class institutions.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-light">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Colleges", href: "/colleges" },
                { name: "Admission", href: "/admission" },
                { name: "My Dashboard", href: "/my-college" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-brand-light transition-colors text-sm flex items-center gap-1 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-light">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-light mt-0.5" />
                <span>123 Education Lane,<br />Academic City, NY 10012</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-light" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-light" />
                <span>support@unibook.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-light">Stay Updated</h3>
            <p className="text-sm text-gray-300 mb-4">Get the latest admission news and research updates.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-brand-medium text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-light"
              />
              <button className="w-full bg-brand-light text-brand-dark font-bold py-2.5 rounded-lg hover:bg-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-8 border-t border-brand-medium/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-brand-light/60">
            © {new Date().getFullYear()} UniBook Inc. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-brand-medium/30 flex items-center justify-center text-brand-light hover:bg-brand-light hover:text-brand-dark transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
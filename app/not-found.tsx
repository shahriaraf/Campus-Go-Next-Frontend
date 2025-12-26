/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-brand-dark px-4 text-center">
      <h1 className="text-9xl font-extrabold text-brand-medium/20">404</h1>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-3 rounded-full font-bold hover:bg-brand-medium transition-colors shadow-lg shadow-brand-light"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
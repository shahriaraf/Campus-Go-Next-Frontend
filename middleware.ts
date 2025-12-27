import { withAuth } from "next-auth/middleware";

// Explicitly export the middleware function
export default withAuth({
  pages: {
    signIn: "/login", // Redirect to here if not logged in
  },
});

// Configure which routes to protect
export const config = {
  matcher: [
    "/colleges/:path*",  // Protects /colleges/123 (Details)
    "/admission/:path*", // Protects Admission form
    "/my-college/:path*",// Protects Dashboard
    "/profile/:path*"    // Protects Profile
  ],
};
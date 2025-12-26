export { default } from "next-auth/middleware";

export const config = {
  // Only protect these routes
  matcher: ["/admission/:path*", "/my-college/:path*", "/profile/:path*"],
};
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // redirect unauthenticated users here
  },
});

// Configure matcher for routes you want to protect
export const config = {
  matcher: [
    "/trip-planner/:path*", // protect trip planner pages
    "/dashboard/:path*",    // example: protect dashboard
    "/account/:path*",      // protect account page
  ],
};

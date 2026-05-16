import { clerkMiddleware } from "@clerk/nextjs/server";

const authProxy = clerkMiddleware();

// Explicitly naming the export 'proxy' as required by Next.js 16
export default function proxy(req: any, ev: any) {
  return authProxy(req, ev);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

import { NextResponse } from "next/server";

export default function middleware(request: Request) {
  return NextResponse.redirect(new URL("/events/all", request.url).toString());
}

export const config = {
  matcher: ["/events"],
};

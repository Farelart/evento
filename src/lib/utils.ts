import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getEvents = unstable_cache(async (city: string, page = 1) => {
  /* const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events: EventoEvent[] = await response.json(); */

  const eventsPerPage = 6;

  // do it with prisma. i want the full code immediately without me having to autocomplete
  const events = await prisma.eventoEvent.findMany({
    where: {
      // i want you to capitalize the first letter of the city
      city:
        city === "all"
          ? undefined
          : city.charAt(0).toUpperCase() + city.slice(1),
    },
    orderBy: {
      date: "asc",
    },
    take: eventsPerPage,
    skip: Math.max(0, (page - 1) * eventsPerPage),
  });

  const totalCount = await prisma.eventoEvent.count({
    where: {
      city:
        city === "all"
          ? undefined
          : city.charAt(0).toUpperCase() + city.slice(1),
    },
  });

  if (!events) {
    return notFound();
  }

  return { events, totalCount };
});

export async function getEvent(slug: string) {
  /* const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  const event: EventoEvent = await response.json(); */

  // do it with prisma. i want the full code immediately without me having to autocomplete
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug, // this is the same as slug: slug
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
}

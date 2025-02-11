import EventCard from "./EventCard";
import { getEvents } from "@/lib/utils";
import PaginationControls from "./PaginationControls";
import { EventoEvent } from "@prisma/client";

type EventsListProps = {
  city: string;
  page?: number;
};

type EventsListResponse = {
  events: EventoEvent[];
  totalCount: number;
};

export default async function EventsList({ city, page = 1 }: EventsListProps) {
  const { events, totalCount }: EventsListResponse = await getEvents(
    city,
    page
  );

  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath =
    totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : "";

  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      <PaginationControls
        previousPath={previousPath}
        nextPath={nextPath}
      ></PaginationControls>
    </section>
  );
}

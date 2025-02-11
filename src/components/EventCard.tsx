import { EventoEvent } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  event: EventoEvent;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      className="flex-1 basis-80 h-[380px] max-w-[500px]"
      href={`/event/${event.slug}`}
    >
      <section
        className="w-full h-full relative flex flex-col  bg-white/[3%] 
    rounded-xl overflow-hidden state-effects"
      >
        <Image
          src={event.imageUrl}
          alt={event.name}
          width={500}
          height={280}
          className="h-[60%] object-fit-cover"
        ></Image>
        <div className=" flex flex-col flex-1 justify-center items-center">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/75">By {event.organizerName}</p>
          <p className="text-sm text-white/50 mt-4">{event.location}</p>
        </div>
        <section className="absolute flex flex-col justify-center items-center left-[12px] top-[12px] h-[45px] w-[45px] bg-black/30 rounded-md">
          <p className="text-xl font-bold -mb-[5px]">
            {/* turn date into day of the month with leading 0 using toLocaleDateString */}
            {/* {new Date(event.date).getDate() < 10
            ? `0${new Date(event.date).getDate()}`
            : new Date(event.date).getDate()} */}

            {new Date(event.date).toLocaleDateString("en-us", {
              day: "2-digit",
            })}
          </p>
          <p className="text-xs uppercase text-accent">
            {
              // turn date into month abbreviation
              new Date(event.date).toLocaleString("en-us", { month: "short" })
            }
          </p>
        </section>
      </section>
    </Link>
  );
}

import Image from "next/image";
import H1 from "@/components/H1";
import { Metadata } from "next";
import { getEvent } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const event = await getEvent(slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event.name,
  };
}

export async function generateStaticParams() {
  return [
    {
      slug: "comedy-extravaganza",
    },
    {
      slug: "dj-practice-session",
    },
  ];
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;

  const event = await getEvent(slug);

  if (!event) {
    notFound(); // This will show Next.js 404 page
  }

  return (
    <main>
      <section
        className="relative 
      overflow-hidden flex justify-center items-center py-14 md:py-20"
      >
        <Image
          src={event.imageUrl}
          className="object-cover z-0 blur-3xl"
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw ,1280px"
          priority
        />

        <div
          className="z-1 flex flex-col
           gap-6 lg:gap-16 lg:flex-row relative"
        >
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          ></Image>

          <div className="flex flex-col">
            {/* display date in day name comma name of the month and then
            day number of month */}
            {/* e.g. Friday, July 12 */}
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>

            <button
              className="bg-white/20 text-lg capitalize bg-blur mt-5 lg:mt-auto w-[95vw] 
                sm:w-full rounded-md border-white/10 border-2 py-2 state-effects"
            >
              Get tickets
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>

        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
      {children}
    </p>
  );
}

import H1 from "@/components/H1";
import EventsList from "@/components/EventsList";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { z } from "zod";

type Params = Promise<{ city: string }>;

type Props = {
  params: Params;
};

type EventPageProps = {
  params: Params; // Adjusted type
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return {
    title:
      city === "all"
        ? "All Events"
        : `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`,
  };
}

const pageNumberSchema = z.coerce
  .number()
  .int()
  .positive()
  .optional()
  .default(1);

export default async function EventsPage({
  params,
  searchParams,
}: EventPageProps) {
  const { city } = await params;
  const resolvedSearchParams = await searchParams;
  const parsedPage = pageNumberSchema.safeParse(resolvedSearchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" &&
          `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`}
      </H1>

      <Suspense key={city + parsedPage.data} fallback={<Loading></Loading>}>
        <EventsList city={city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}

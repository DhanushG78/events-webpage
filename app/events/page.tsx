import { getEvents } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface ModularBlock {
  hero?: { banner_image?: { url: string } };
  rich_text_section?: { content?: string };
  [key: string]: unknown;
}

interface EventPage {
  uid: string;
  title: string;
  url: string;
  modular_blocks?: ModularBlock[];
}

export default async function EventsPage() {
  const events = await getEvents() as EventPage[];

  return (
    <main className="min-h-screen bg-zinc-950 pt-20 px-6 pb-24 text-zinc-50 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            All Events
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
            Discover and explore our upcoming amazing events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(events || []).map((event) => {
            const heroBlock = event.modular_blocks?.find((b) => b.hero)?.hero;
            const bannerImage = heroBlock?.banner_image;
            const descriptionBlock = event.modular_blocks?.find((b) => b.rich_text_section)?.rich_text_section;
            
            const cleanDescription = descriptionBlock?.content?.replace(/<[^>]+>/g, '') || "Click to view event details";
            const eventSlug = event.url === '/' ? 'home' : event.url.replace(/^\//, '');

            return (
              <Link
                key={event.uid}
                href={`/event/${eventSlug}`}
                className="group block h-full"
              >
                <div className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-indigo-500/50 transition-all duration-500 flex flex-col h-full relative">
                  <div className="relative h-64 w-full overflow-hidden shrink-0">
                    {bannerImage?.url ? (
                      <Image
                        src={bannerImage.url}
                        alt={event.title || "Event Image"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-zinc-900"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90"></div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow relative z-10 -mt-10 bg-zinc-900 rounded-t-3xl pt-10">
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {event.title}
                    </h2>
                    <p className="text-zinc-400 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                      {cleanDescription}
                    </p>
                    <div className="inline-flex items-center text-sm font-semibold text-indigo-400 group-hover:text-indigo-300">
                      Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {(!events || events.length === 0) && (
          <div className="text-center py-32 border border-zinc-800 rounded-3xl bg-zinc-900/50">
            <p className="text-2xl text-zinc-500 font-medium">No events found</p>
          </div>
        )}
      </div>
    </main>
  );
}

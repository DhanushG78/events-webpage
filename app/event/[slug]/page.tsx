import { getEventBySlug, getAuthors, getSchedules } from "@/lib/api";
import EventView from "@/components/EventView";

interface ModularBlock {
  speaker_section?: { speakers?: unknown[] };
  schedule_section?: { schedule_list?: unknown[] };
  [key: string]: unknown;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white font-bold mb-4">Event Not Found</h1>
          <p className="text-zinc-400">The event you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const allAuthors = await getAuthors();
  const allSchedules = await getSchedules();

  if (event.modular_blocks) {
    event.modular_blocks = event.modular_blocks.map((block: ModularBlock) => {
      if (block.speaker_section) {
        block.speaker_section.speakers = allAuthors;
      }
      if (block.schedule_section) {
        block.schedule_section.schedule_list = allSchedules;
      }
      return block;
    });
  }

  return <EventView event={event} />;
}

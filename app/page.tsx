import { getEventBySlug, getEvents, getAuthors, getSchedules } from "@/lib/api";
import EventView from "@/components/EventView";

interface ModularBlock {
  speaker_section?: { speakers?: unknown[] };
  schedule_section?: { schedule_list?: unknown[] };
  [key: string]: unknown;
}

export default async function Home() {
  // First, try to fetch the 'home' event
  const homeEvent = await getEventBySlug('home');
  
  // If 'home' event exists, directly render it as requested
  if (homeEvent) {
    const allAuthors = await getAuthors();
    const allSchedules = await getSchedules();
    
    // Override the speaker and schedule arrays to ensure ALL are visible
    if (homeEvent.modular_blocks) {
      homeEvent.modular_blocks = homeEvent.modular_blocks.map((block: ModularBlock) => {
        if (block.speaker_section) {
          block.speaker_section.speakers = allAuthors;
        }
        if (block.schedule_section) {
          block.schedule_section.schedule_list = allSchedules;
        }
        return block;
      });
    }

    return <EventView event={homeEvent} />;
  }

  // Fallback to the first event if 'home' is not found
  const events = await getEvents();
  const firstEvent = Array.isArray(events) && events.length > 0 ? events[0] : null;

  if (firstEvent) {
    // We could either redirect to the first event or render it directly.
    // Let's render it directly to fulfill "directly open event page"
    // We need to fetch the full details for it though, as getEvents might not include all references.
    const fullFirstEvent = await getEventBySlug(firstEvent.url === '/' ? 'home' : firstEvent.url.replace(/^\//, ''));
    if (fullFirstEvent) {
        const allAuthors = await getAuthors();
        const allSchedules = await getSchedules();
        
        if (fullFirstEvent.modular_blocks) {
          fullFirstEvent.modular_blocks = fullFirstEvent.modular_blocks.map((block: ModularBlock) => {
            if (block.speaker_section) {
              block.speaker_section.speakers = allAuthors;
            }
            if (block.schedule_section) {
              block.schedule_section.schedule_list = allSchedules;
            }
            return block;
          });
        }
        return <EventView event={fullFirstEvent} />;
    }
  }

  // Absolute fallback
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl text-white font-bold mb-4">No Events Found</h1>
        <p className="text-zinc-400">Please create an event in Contentstack.</p>
      </div>
    </div>
  );
}

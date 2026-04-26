"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Clock, User, ChevronRight } from "lucide-react";

interface Photo {
  url: string;
}

interface Speaker {
  uid: string;
  name: string;
  photo?: Photo;
  role?: string;
  company?: string;
  bio?: string;
}

interface ScheduleItem {
  uid: string;
  title: string;
  time?: string;
  description?: string;
  speaker?: Speaker[];
}

interface HeroBlock {
  heading?: string;
  subheading?: string;
  banner_image?: Photo;
}

interface RichTextBlock {
  content?: string;
}

interface SpeakersBlock {
  section_title?: string;
  speakers?: Speaker[];
}

interface ScheduleBlock {
  section_title?: string;
  schedule_list?: ScheduleItem[];
}

interface ModularBlock {
  hero?: HeroBlock;
  rich_text_section?: RichTextBlock;
  speaker_section?: SpeakersBlock;
  schedule_section?: ScheduleBlock;
}

interface EventPage {
  uid: string;
  title: string;
  url: string;
  modular_blocks?: ModularBlock[];
}

export default function EventView({ event }: { event: EventPage }) {
  if (!event || !event.modular_blocks) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-500">Event not found</div>;
  }

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      {event.modular_blocks.map((section, index) => {
        // HERO SECTION
        if (section.hero) {
          const hero = section.hero;
          return (
            <section key={index} className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
              {hero.banner_image?.url && (
                <motion.div 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 z-0"
                >
                  <Image
                    src={hero.banner_image.url}
                    alt={hero.heading || "Hero Image"}
                    fill
                    className="object-cover opacity-40 mix-blend-overlay"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/80 to-zinc-950"></div>
                </motion.div>
              )}
              
              <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span className="text-sm font-medium text-zinc-300 uppercase tracking-wider">Live Event</span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500"
                >
                  {hero.heading}
                </motion.h1>
                
                {hero.subheading && (
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl md:text-2xl text-zinc-400 max-w-3xl font-light leading-relaxed mb-10"
                  >
                    {hero.subheading}
                  </motion.p>
                )}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.7)] flex items-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10">Register Now</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>
              </div>
            </section>
          );
        }

        // ABOUT SECTION (Rich Text)
        if (section.rich_text_section) {
          return (
            <motion.section
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="py-32 px-6 bg-zinc-950 relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950 to-zinc-950"></div>
              <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-[1px] bg-indigo-500"></div>
                  <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase">About the Event</h2>
                </div>
                <div
                  className="prose prose-invert prose-lg md:prose-xl text-zinc-300 max-w-none prose-headings:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300"
                  dangerouslySetInnerHTML={{
                    __html: section.rich_text_section.content || "",
                  }}
                />
              </div>
            </motion.section>
          );
        }

        // SPEAKERS SECTION
        if (section.speaker_section && (section.speaker_section.speakers?.length || 0) > 0) {
          return (
            <section key={index} className="py-32 px-6 bg-zinc-900 relative border-y border-zinc-800">
              <div className="max-w-7xl mx-auto relative z-10">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-[1px] bg-indigo-500"></div>
                      <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase">Lineup</h2>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">
                      {section.speaker_section.section_title || "Featured Speakers"}
                    </h3>
                  </div>
                  <p className="text-zinc-400 max-w-md">Learn from industry leaders and visionaries who are shaping the future.</p>
                </motion.div>

                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {section.speaker_section.speakers!.map((speaker) => (
                    <Link href={`/authors/${speaker.uid}`} key={speaker.uid || speaker.name} className="block">
                      <motion.div
                        variants={fadeIn}
                        className="group relative rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden hover:border-indigo-500/50 transition-colors duration-500 h-full flex flex-col"
                      >
                        <div className="aspect-[4/5] w-full overflow-hidden relative shrink-0">
                          {speaker.photo?.url ? (
                            <Image
                              src={speaker.photo.url}
                              alt={speaker.name || "Speaker"}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                               <User className="w-20 h-20 text-zinc-600" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80"></div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h4 className="text-2xl font-bold text-white mb-2">
                              {speaker.name}
                            </h4>
                            {speaker.role && (
                              <p className="text-indigo-400 font-medium mb-1">
                                {speaker.role} {speaker.company ? <span className="text-zinc-400">@ {speaker.company}</span> : ""}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {speaker.bio && (
                          <div className="p-8 pt-0 border-t border-zinc-800/0 group-hover:border-zinc-800/100 transition-colors duration-500 flex-1">
                            <div 
                              className="text-zinc-400 text-sm leading-relaxed line-clamp-3"
                              dangerouslySetInnerHTML={{ __html: speaker.bio }}
                            />
                          </div>
                        )}
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              </div>
            </section>
          );
        }

        // SCHEDULE SECTION
        if (section.schedule_section && (section.schedule_section.schedule_list?.length || 0) > 0) {
          return (
            <section
              key={index}
              className="py-32 px-6 bg-zinc-950 relative"
            >
              <div className="max-w-5xl mx-auto">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="mb-20 text-center"
                >
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-12 h-[1px] bg-indigo-500"></div>
                    <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase">Itinerary</h2>
                    <div className="w-12 h-[1px] bg-indigo-500"></div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    {section.schedule_section.section_title || "Event Schedule"}
                  </h3>
                </motion.div>

                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="relative"
                >
                  {/* Timeline line */}
                  <div className="absolute left-[27px] md:left-[39px] top-4 bottom-4 w-[2px] bg-zinc-800"></div>
                  
                  <div className="space-y-12">
                    {section.schedule_section.schedule_list!.map((item, idx) => (
                      <motion.div
                        variants={fadeIn}
                        key={item.uid || item.title || idx}
                        className="relative pl-20 md:pl-32 group"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-[19px] md:left-[31px] top-2 w-[18px] h-[18px] bg-zinc-950 border-4 border-zinc-700 rounded-full group-hover:border-indigo-500 group-hover:bg-indigo-500 transition-colors duration-300 z-10"></div>

                        <div className="bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 p-8 rounded-3xl transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <h4 className="text-2xl font-bold text-white">
                              {item.title}
                            </h4>
                            {item.time && (
                              <div className="flex items-center gap-2 text-indigo-400 font-mono bg-indigo-500/10 px-4 py-2 rounded-full w-fit">
                                <Clock className="w-4 h-4" />
                                <span>{item.time}</span>
                              </div>
                            )}
                          </div>
                          
                          {item.description && (
                            <div 
                               className="text-zinc-400 text-lg leading-relaxed mb-6" 
                               dangerouslySetInnerHTML={{ __html: item.description }} 
                            />
                          )}
                          
                          {/* If schedule has attached speakers */}
                          {item.speaker && item.speaker.length > 0 && (
                            <div className="flex items-center gap-4 pt-6 border-t border-zinc-800">
                              <div className="flex -space-x-3">
                                {item.speaker.map((spk) => (
                                  <Link href={`/authors/${spk.uid}`} key={spk.uid} className="w-10 h-10 rounded-full border-2 border-zinc-900 overflow-hidden relative bg-zinc-800 hover:scale-110 hover:z-10 transition-transform">
                                    {spk.photo?.url ? (
                                      <Image src={spk.photo.url} alt={spk.name} fill className="object-cover" />
                                    ) : (
                                      <User className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-500" />
                                    )}
                                  </Link>
                                ))}
                              </div>
                              <div className="text-sm text-zinc-500">
                                Featuring <span className="text-zinc-300 font-medium">
                                  {item.speaker.map((s, i) => (
                                    <span key={s.uid}>
                                      <Link href={`/authors/${s.uid}`} className="hover:text-indigo-400 transition-colors">{s.name}</Link>
                                      {i < (item.speaker?.length || 0) - 1 ? ', ' : ''}
                                    </span>
                                  ))}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          );
        }

        return null;
      })}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900 bg-zinc-950 text-center text-zinc-500">
        <p>© {new Date().getFullYear()} {event.title}. All rights reserved.</p>
      </footer>
    </main>
  );
}

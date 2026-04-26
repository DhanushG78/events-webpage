import { getAuthors } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

interface Author {
  uid: string;
  name: string;
  photo?: { url: string };
  role?: string;
  company?: string;
  bio?: string;
}

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <main className="min-h-screen bg-zinc-950 pt-20 px-6 pb-24 text-zinc-50 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            Our Authors
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
            Meet the visionaries, speakers, and creators behind our events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(authors || []).map((author: Author) => (
            <Link
              key={author.uid}
              href={`/authors/${author.uid}`}
              className="group block"
            >
              <div className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-indigo-500/50 transition-all duration-500">
                <div className="aspect-[4/5] w-full overflow-hidden relative">
                  {author.photo?.url ? (
                    <Image
                      src={author.photo.url}
                      alt={author.name || "Author"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                      <User className="w-16 h-16 text-zinc-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {author.name}
                    </h2>
                    {author.role && (
                      <p className="text-indigo-400 font-medium text-sm">
                        {author.role} {author.company ? <span className="text-zinc-400">@ {author.company}</span> : ""}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {(!authors || authors.length === 0) && (
          <div className="text-center py-32 border border-zinc-800 rounded-3xl bg-zinc-900/50">
            <p className="text-2xl text-zinc-500 font-medium">No authors found</p>
          </div>
        )}
      </div>
    </main>
  );
}

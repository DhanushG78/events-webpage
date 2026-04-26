import { getAuthorByUid } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { User, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ uid: string }>;
}

export default async function AuthorDetailsPage({ params }: PageProps) {
  const { uid } = await params;
  const author = await getAuthorByUid(uid);

  if (!author) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center pt-16">
        <h1 className="text-4xl text-white font-bold mb-4">Author Not Found</h1>
        <Link href="/authors" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Authors
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 px-6 pb-24 text-zinc-50 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/authors" className="inline-flex items-center gap-2 text-zinc-400 hover:text-indigo-400 transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Authors
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Header Background */}
          <div className="h-48 w-full bg-gradient-to-br from-indigo-900/40 via-zinc-900 to-zinc-900 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
          </div>

          <div className="px-8 sm:px-12 pb-12 relative">
            {/* Avatar */}
            <div className="absolute -top-24 left-8 sm:left-12">
              <div className="w-40 h-40 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden relative shadow-xl">
                {author.photo?.url ? (
                  <Image
                    src={author.photo.url}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-zinc-600" />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-24">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{author.name}</h1>
              {author.role && (
                <p className="text-xl text-indigo-400 font-medium mb-6">
                  {author.role} {author.company && <span className="text-zinc-500">@ {author.company}</span>}
                </p>
              )}
              
              {author.bio && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-zinc-300 mb-4 uppercase tracking-wider text-sm">About</h3>
                  <div 
                    className="prose prose-invert prose-lg text-zinc-400 leading-relaxed max-w-none"
                    dangerouslySetInnerHTML={{ __html: author.bio }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import { allProjects } from "@/lib/projects";
import { compareDesc } from "date-fns";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, Send } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            Project yang di develop
          </h2>
          <Separator className="w-24 bg-primary h-1 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Technology Section (Simplified) */}
      <section id="technology" className="py-24 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Teknologi yang digunakan</h2>
          <div className="flex flex-wrap justify-center gap-4 text-zinc-400 font-mono">
            {["Next.js", "React", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn/ui", "Python (FastAPI)", "MongoDB", "Redis", "Docker", "Nginx"].map((tech) => (
              <div key={tech} className="px-4 py-2 border border-zinc-800 rounded-lg hover:border-primary hover:text-white transition-colors cursor-default">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & Contact */}
      <footer id="contact" className="py-24 bg-zinc-950/80 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tertarik Berkolaborasi?</h2>
          <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg">
            Saya selalu terbuka untuk diskusi project baru, peluang kerja sama, atau sekadar ngobrol santai seputar teknologi.
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <Link href="https://github.com/Just0rdinaryGuy" target="_blank" className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-primary hover:text-primary transition-all group">
              <Github className="w-6 h-6" />
            </Link>
            <Link href="https://t.me/exprimb" target="_blank" className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-primary hover:text-primary transition-all group">
              <Send className="w-6 h-6" />
            </Link>
            <Link href="mailto:exprimbara@gmail.com" className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-primary hover:text-primary transition-all group">
              <Mail className="w-6 h-6" />
            </Link>
          </div>

          <Separator className="bg-zinc-900 mb-8" />

          <p className="text-sm text-zinc-600">
            © 2024 - {new Date().getFullYear()} Just0rdinaryGuy. <br className="md:hidden" />
            Dibuat dengan <span className="text-zinc-500 font-medium">Next.js</span> & <span className="text-zinc-500 font-medium">Shadcn/ui</span>.
          </p>
        </div>
      </footer>
    </main>
  );
}

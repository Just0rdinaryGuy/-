import { allProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const generateStaticParams = async () =>
    allProjects.map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const project = allProjects.find((p) => p.slug === slug);
    if (!project) throw new Error(`Project not found for slug: ${slug}`);
    return { title: project.title };
};

export default async function ProjectLayout({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = allProjects.find((project) => project.slug === slug);

    if (!project) notFound();

    return (
        <article className="min-h-screen bg-background text-foreground antialiased py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
                        <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Portofolio</Link>
                    </Button>
                </div>

                <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                    <p className="text-zinc-500 mb-6">{format(parseISO(project.date), "LLLL d, yyyy")}</p>
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 mb-8">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-md py-1 px-3">{tag}</Badge>
                        ))}
                    </div>

                    <div className="flex justify-center gap-4">
                        {project.repositoryUrl && (
                            <Button asChild variant="outline">
                                <Link href={project.repositoryUrl} target="_blank"><Github className="mr-2 h-4 w-4" /> Source Code</Link>
                            </Button>
                        )}
                        {project.demoUrl && (
                            <Button asChild>
                                <Link href={project.demoUrl} target="_blank"><Globe className="mr-2 h-4 w-4" /> Demo Langsung</Link>
                            </Button>
                        )}
                    </div>
                </header>

                <div className="prose prose-invert prose-zinc max-w-none" dangerouslySetInnerHTML={{ __html: project.content || '' }} />
            </div>
        </article>
    );
}

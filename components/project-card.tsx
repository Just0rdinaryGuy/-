"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card className="overflow-hidden border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors group h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold text-white">{project.title}</CardTitle>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-primary/20 hover:text-primary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription className="text-zinc-400 text-base line-clamp-3">
                        {project.description}
                    </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                    <Button asChild className="w-full bg-zinc-100 text-zinc-900 hover:bg-white">
                        <Link href={`/projects/${project.slug}`}>Lihat Detail</Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

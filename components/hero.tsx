"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-background">
            {/* Background Gradient/Beams */}
            <div className="absolute inset-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

            <div className="z-10 flex flex-col items-center text-center px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-sm md:text-md uppercase tracking-widest text-primary font-semibold mb-4">
                        Fullstack Developer
                    </h2>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Halo, Saya Excel.<br />
                    <span className="text-3xl md:text-5xl text-neutral-400">(Just0rdinaryGuy)</span>
                </motion.h1>
                <motion.p
                    className="mt-4 text-xl md:text-2xl text-neutral-300 max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Saya ngebangun <span className="text-primary font-bold">website</span>, desain antarmuka, dan ngoding <span className="text-primary font-bold">Python</span>.
                </motion.p>

                <motion.div
                    className="mt-8 flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Button size="lg" className="rounded-full text-lg" asChild>
                        <Link href="#portfolio">Lihat Project</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full text-lg group" asChild>
                        <Link href="#contact">
                            Hubungi Saya <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section >
    );
};

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-4 inset-x-0 max-w-2xl mx-auto z-50 border border-transparent dark:border-white/[0.2] rounded-full bg-black/50 backdrop-blur-md shadow-input"
            )}
        >
            <div className="flex items-center justify-between px-8 py-3">
                <Link href="/" className="font-bold text-lg tracking-tight">
                    Just0rdinaryGuy<span className="text-primary">.dev</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">Tentang</Link>
                    <Link href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">Portofolio</Link>
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                        <Link href="/resume">Resume</Link>
                    </Button>
                </div>
            </div>
        </motion.nav>
    );
};

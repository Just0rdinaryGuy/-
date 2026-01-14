import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getImagePath(src: string) {
    const basePath = "/-";
    if (src.startsWith("http")) return src;
    if (src.startsWith(basePath)) return src;
    return `${basePath}${src.startsWith("/") ? "" : "/"}${src}`;
}

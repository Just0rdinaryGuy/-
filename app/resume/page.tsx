"use client";

import { Navbar } from "@/components/navbar";

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-black">
            <Navbar />
            <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    Resume
                </h1>

                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: 0,
                        paddingTop: '141.4286%',
                        paddingBottom: 0,
                        boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                        marginTop: '1.6em',
                        marginBottom: '0.9em',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        willChange: 'transform'
                    }}
                >
                    <iframe
                        loading="lazy"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            border: 'none',
                            padding: 0,
                            margin: 0
                        }}
                        src="https://www.canva.com/design/DAG-u5s5SPw/FO2v-BGZnjcWrygfcFvGng/view?embed"
                        allowFullScreen
                        allow="fullscreen"
                    >
                    </iframe>
                </div>
            </div>
        </main>
    );
}

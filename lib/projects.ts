export type Project = {
    slug: string;
    title: string;
    description: string;
    date: string;
    image: string;
    tags: string[];
    repositoryUrl?: string;
    demoUrl?: string;
    content?: string; // HTML or simple string for now
}

export const allProjects: Project[] = [
    {
        slug: "travel-website",
        title: "Website Travel",
        description: "Platform pemesanan perjalanan full-stack berbasis MERN (MongoDB, Express, React, Node.js) dengan fitur lengkap.",
        date: "2024-01-01",
        image: "/assets/img/kelas_full_stack_web_javascript_developer_buildwith_angga.png",
        tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
        // repositoryUrl: "https://github.com/excel/travel", // Private
        // demoUrl: "https://travel.excel.com", // Private
        content: `
            <p>Platform pemesanan perjalanan modern yang dibangun dengan arsitektur <strong>MERN Stack</strong>. Aplikasi ini menangani seluruh alur perjalanan pengguna, mulai dari pencarian destinasi, melihat detail paket wisata, hingga proses pemesanan yang aman.</p>
            
            <h3 class="text-xl font-bold mt-6 mb-4">Teknologi yang Digunakan</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>MongoDB:</strong> Database NoSQL yang digunakan untuk menyimpan data destinasi, pengguna, dan transaksi secara fleksibel dan scalable.</li>
                <li><strong>Express.js & Node.js:</strong> Membangun RESTful API yang tangguh untuk menangani request dari sisi klien dan logika bisnis di sisi server.</li>
                <li><strong>React.js:</strong> Membangun antarmuka pengguna (UI) yang interaktif dan responsif berbasis komponen.</li>
                <li><strong>Redux / Context API:</strong> Manajemen state global untuk keranjang pemesanan dan sesi pengguna.</li>
                <li><strong>JWT (JSON Web Token):</strong> Implementasi sistem autentikasi dan otorisasi yang aman untuk pengguna.</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-4">Fitur Unggulan</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li>Pencarian dan filter destinasi wisata.</li>
                <li>Dashboard admin untuk mengelola paket wisata dan transaksi.</li>
                <li>Riwayat pemesanan yang terintegrasi.</li>
            </ul>
        `
    },
    {
        slug: "consultation-app",
        title: "Aplikasi Konsultasi",
        description: "Aplikasi mobile yang menghubungkan pengguna dengan konsultan ahli. Fitur chat real-time dan jadwal janji temu.",
        date: "2024-02-15",
        image: "/assets/img/kelas_full_stack_react_native_developer_buildwith_angga.png",
        tags: ["React Native", "Firebase", "Redux"],
        // repositoryUrl: "https://github.com/excel/consultation", // Private
        // demoUrl: "https://consultation.excel.com", // Private
        content: "<p>Mengembangkan aplikasi mobile lintas platform menggunakan React Native.</p>"
    },
    {
        slug: "bges-fulfillment",
        title: "BGES Fulfillment - ROC6 Dashboard - Automated Ticket Routing",
        description: "Sistem monitoring fulfillment layanan BGES Regional 6 yang dilengkapi dengan Automated Ticket Routing System untuk distribusi tiket otomatis dan analisis real-time.",
        date: "2024-03-20",
        image: "/assets/img/bges_dashboard.png", // Harap tambahkan gambar ini ke public/assets/img/
        tags: ["Python (FastAPI)", "MongoDB", "Redis", "React.js", "Telegram API"],
        // repositoryUrl: "", // Private
        // demoUrl: "", // Private
        content: `
            <p>Sistem manajemen operasional tiket enterprise yang mengintegrasikan dashboard web dengan bot Telegram. Dirancang untuk efisiensi tinggi dengan fitur <strong>Automated Ticket Routing</strong> dan <strong>Strict SLA Monitoring</strong>.</p>
            
            <h3 class="text-xl font-bold mt-6 mb-4">Fitur Unggulan</h3>
            
            <h4 class="text-lg font-semibold mt-4 mb-2">Automated Ticket Routing System</h4>
            <p class="mb-2">Mesin cerdas yang mendistribusikan tiket secara bergantian menggunakan algoritma <em>Pure Round-Robin</em>:</p>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Fair Distribution:</strong> Memastikan setiap agen mendapatkan giliran tiket yang sama rata tanpa memandang beban kerja saat ini.</li>
                <li><strong>Auto-Reassignment:</strong> Otomatis mengalihkan tiket jika agen tidak merespons dalam 20 menit (SLA Breach Protection).</li>
                <li><strong>Shift Management:</strong> Deteksi dan force-offline agen yang melebihi shift kerja (9 jam) untuk kesejahteraan tim.</li>
            </ul>

            <h4 class="text-lg font-semibold mt-4 mb-2">Integrasi Bot Telegram (2-Way Communication)</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Real-time Sync:</strong> Komentar dari dashboard langsung terkirim ke Telegram user, dan sebaliknya.</li>
                <li><strong>Webhook Mode:</strong> Respon instan tanpa delay polling.</li>
                <li><strong>Media Handling:</strong> Kompresi gambar otomatis dan penyimpanan efisien.</li>
            </ul>

            <h4 class="text-lg font-semibold mt-4 mb-2">Dashboard & Analytics</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Real-time WebSocket:</strong> Update status tiket, notifikasi, dan metrik tanpa refresh halaman.</li>
                <li><strong>Role-Based Access:</strong> Panel khusus untuk Admin (Monitoring) dan Agen (Tiket Saya).</li>
                <li><strong>Audit Logs:</strong> Mencatat setiap aktivitas sensitif sistem untuk keamanan dan akuntabilitas.</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-4">Teknologi Di Balik Layar</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <strong>Backend (Python FastAPI):</strong>
                    <ul class="list-disc pl-6 text-sm mt-1">
                        <li>High-concurrency dengan arsitektur Async</li>
                        <li>JWT Authentication & Security Hardening</li>
                        <li>Background Tasks untuk monitoring SLA</li>
                    </ul>
                </div>
                <div>
                    <strong>Database:</strong>
                    <ul class="list-disc pl-6 text-sm mt-1">
                        <li><strong>MongoDB:</strong> Penyimpanan data tiket fleksibel</li>
                        <li><strong>Redis:</strong> Caching & Pub/Sub untuk realtime</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        slug: "jejak-kita",
        title: "Jejak Kita (Family Tree Platform)",
        description: "Platform silsilah keluarga digital enterprise. Visualisasi pohon keluarga interaktif, pemetaan geografis, dan analisis demografis mendalam.",
        date: "2024-04-10",
        image: "/assets/img/jejak_kita.png", // Harap tambahkan gambar ini ke public/assets/img/
        tags: ["Vue.js 3", "Python (FastAPI)", "Leaflet.js", "D3.js", "MongoDB"],
        // repositoryUrl: "", // Private
        // demoUrl: "", // Private
        content: `
            <p>Aplikasi web modern untuk mendokumentasikan warisan keluarga besar. Menggabungkan visualisasi silsilah interaktif dengan analisis data demografis yang komprehensif.</p>

            <h3 class="text-xl font-bold mt-6 mb-4">Fitur Utama</h3>
            
            <h4 class="text-lg font-semibold mt-4 mb-2">1. Visualisasi Silsilah Interaktif</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Dynamic Graph (D3.js):</strong> Render pohon silsilah yang responsif dan rapi.</li>
                <li><strong>Smart Navigation:</strong> Fitur auto-expand, pan, dan zoom untuk menjelajahi silsilah yang kompleks dengan mudah.</li>
                <li><strong>Export High-Res:</strong> Kemampuan menyimpan visualisasi sebagai gambar berkualitas tinggi.</li>
            </ul>

            <h4 class="text-lg font-semibold mt-4 mb-2">2. Pemetaan Geografis (Family Map)</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Location Clustering:</strong> Visualisasi sebaran domisili anggota keluarga dengan pengelompokan cerdas di peta (Leaflet).</li>
                <li><strong>Global Search:</strong> Pencarian lokasi terintegrasi dengan OpenStreetMap untuk akurasi tinggi.</li>
                <li><strong>Statistik Wilayah:</strong> Analisis konsentrasi keluarga berdasarkan kota/negara.</li>
            </ul>

            <h4 class="text-lg font-semibold mt-4 mb-2">3. Manajemen Data & Privasi</h4>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Profil Mendalam:</strong> Mencatat detail multi-pasangan, orang tua angkat, hingga riwayat pekerjaan.</li>
                <li><strong>Role-Based Access:</strong> Hak akses bertingkat (Admin, Editor, Viewer) untuk menjaga integritas data.</li>
                <li><strong>Activity Log:</strong> Mencatat seluruh riwayat perubahan data (Audit Trail).</li>
            </ul>

            <h3 class="text-xl font-bold mt-6 mb-4">Tech Stack</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Frontend:</strong> Vue.js 3 (Composition API) + Tailwind CSS + Pinia Store.</li>
                <li><strong>Backend:</strong> Python FastAPI (Async) + Motor (MongoDB Driver).</li>
                <li><strong>Infrastructure:</strong> Docker Containerization + Nginx Reverse Proxy.</li>
            </ul>
        `
    }
];

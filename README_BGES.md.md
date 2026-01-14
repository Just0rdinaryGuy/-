# 🎫 Dashboard Bot Telegram - Sistem Manajemen Tiket v2.4

Dashboard web buat monitoring dan manage tiket dari bot Telegram dengan sistem role-based access untuk Admin dan Agent. Simple tapi powerful! 💪

---

## 📋 Daftar Isi

1. [Fitur Utama](#-fitur-utama)
2. [Teknologi yang Dipake](#-teknologi-yang-dipake)
3. [Arsitektur Sistem](#-arsitektur-sistem)
4. [Komponen Utama](#-komponen-utama)
5. [Alur Sistem](#-alur-sistem)
6. [Struktur Database](#-struktur-database)
7. [API Endpoints](#-api-endpoints)
8. [Cara Install & Setup](#-cara-install--setup)
9. [Environment Variables](#-environment-variables)
10. [Role Pengguna](#-role-pengguna)
11. [Integrasi Bot](#-integrasi-bot)

---

## ✨ Fitur Utama

### 🎫 Sistem Manajemen Tiket
- **Format Nomor Tiket Baru**: `INC${MM}${DD}${YYYY}${HH}${mm}${ss}${randomText}`
  - Contoh: `INC111520251928405B6` (15 Nov 2025 19:28:40 + 5B6)
- **Deskripsi Berbasis Template**: Setiap kategori + permintaan punya template khusus
- **Tampilan Bullet List**: Deskripsi ditampilkan dengan format bullet list yang rapi banget
- **Tampilan Category + Permintaan**: 
  - Format "HSI Indibiz - RECONFIG" di SEMUA tabs (10 views)
  - Badge styling dengan tema biru biar keliatan jelas
  - Visible di: Available to Claim, My Tickets, All tabs, Open, Pending, In Progress, Completed
- **Deteksi Konflik**: Notifikasi otomatis pas ticket udah diambil agent lain (bye-bye rebutan tiket!)

### 📊 Laporan Performa & Analytics
- **Filter Canggih**: Filter berdasarkan Tahun, Bulan, Kategori, Agent
- **Dua Jenis Laporan**:
  - Laporan per Agent: Metrik performa masing-masing agent
  - Laporan per Produk: Statistik per kategori lengkap dengan kolom QC2 dan LEPAS BI
- **Tabel Performance by Product**: 
  - Nampiliin statistik per produk dengan kolom permintaan (INTEGRASI, PUSH BIMA, RECONFIG, REPLACE, TROUBLESHOOT)
  - Kolom tambahan QC2 dan LEPAS BI buat tracking khusus
  - Urutan produk konsisten (QC2-HSI, QC2-WIFI, QC2-DATIN, LEPAS BI)
- **Opsi Export**: CSV & XLSX dengan format kolom custom
- **Statistik Real-time**: Dashboard dengan data hari ini, bulan ini, total
- **Export Laporan Performa**: Download laporan detail performa (CSV/Excel) dengan filter lengkap

### 🔐 Keamanan & Kontrol Akses
- **JWT Authentication**: Autentikasi berbasis token yang aman
- **Role-Based Access**: Admin vs Agent dengan hak akses yang beda
- **Pencegahan Konflik**: 
  - Agent nggak bisa claim tiket yang udah di-assign
  - Admin bypass conflict check (bisa reassign/unassign sesuka hati)
  - Agent bisa unassign tiket sendiri
- **Manajemen Password**: Ganti password & reset password buat yang lupa

### 🤖 Integrasi Bot
- **Node.js Telegram Bot**: Full terintegrasi dengan FastAPI backend
- **Webhook Mode**: Bot support 2 mode operasi:
  - **Polling Mode** (default): Bot narik update dari Telegram
  - **Webhook Mode**: Telegram push update ke server (lebih cepet!)
- **Notifikasi Komentar**: Real-time notification ke user lewat bot dengan tombol "Balas"
- **Notifikasi Assignment**: 
  - Notif ke user pas tiket diambil agent (tanpa tombol balas)
  - Notif ke grup Telegram pas tiket diambil agent
- **Notifikasi Completion**: 
  - Notif ke user pas tiket selesai (RESOLVED)
  - Notif ke grup Telegram pas tiket selesai
- **Notifikasi Grup Telegram**: Semua aktivitas penting dikirim ke grup monitoring
- **Sistem Template**: 40+ template beda buat kombinasi kategori + permintaan
- **Support Multi-Category**: HSI Indibiz, WMS, BITSTREAM, VULA, ASTINET, METRO-E, QC2, LEPAS BI, dll

> **Setup Webhook Mode**: Buat aktifin webhook mode (response lebih cepet):
> 1. Tambahin ke `.env`:
>    ```
>    USE_WEBHOOK=true
>    WEBHOOK_DOMAIN=https://your-domain.com
>    WEBHOOK_PORT=3001
>    ```
> 2. Tambahin ke nginx config:
>    ```nginx
>    location /webhook/telegram/ {
>        proxy_pass http://localhost:3001/webhook/telegram/;
>        proxy_http_version 1.1;
>        proxy_set_header Host $host;
>        proxy_set_header X-Real-IP $remote_addr;
>        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>    }
>    ```
> 3. Reload nginx dan restart bot

### 🌐 UI & Experience
- **Update Real-time**: Status tiket dan komentar terupdate secara real-time
- **Desain Responsif**: Tampilan optimal di desktop dan mobile
- **Setting Notifikasi Suara** (Account Settings):
  - Toggle on/off suara notifikasi
  - Upload custom ringtone (MP3/WAV/OGG, max 1MB)
  - Preview & test sound
  - Reset ke suara default
  - Setting tersimpan per browser (localStorage)

### 💬 Komunikasi 2 Arah (Real-time)
- **User ke Agent**: User kirim pesan/komentar dari bot Telegram → Masuk ke ticket comment di Dashboard
- **Agent ke User**: Agent balas komentar dari Dashboard → User terima notifikasi real-time di Telegram
- **History Tracking**: Semua percakapan tersimpan rapi dalam history ticket

### 📷 Upload Gambar & Kompresi
- **Multiple Images**: Support upload beberapa gambar sekaligus per komentar
- **Paste/Upload**: Agent bisa paste (Ctrl+V) atau upload gambar dari dashboard
- **Foto dari User**: User bisa kirim foto lewat bot Telegram pas reply tiket
- **Auto Compress**: Gambar dikompresi otomatis ke 80% quality, max 1200px
- **Thumbnail**: Bikin thumbnail 200x200 buat preview (permanent)
- **Auto Delete**: Original dihapus otomatis setelah 30 hari, thumbnail tetep tersimpan
- **Storage**: Disimpan di server `/uploads/originals` dan `/uploads/thumbnails`

> **Note Migrasi**: Kalo upgrade dari versi sebelumnya, jalanin di MongoDB:
> ```javascript
> use telegram_ticket_db
> db.comments.updateMany({"images.image_url": {$regex: "^/api/"}}, [{$set: {"images": {$map: {input: "$images", as: "img", in: {image_url: {$replaceOne: {input: "$$img.image_url", find: "/api/uploads", replacement: "/uploads"}}, thumbnail_url: {$replaceOne: {input: "$$img.thumbnail_url", find: "/api/uploads", replacement: "/uploads"}}}}}}}])
> ```

### 📋 Kategori Template yang Didukung

**HSI Indibiz:**
- RECONFIG, REPLACE ONT, TROUBLESHOOT, INTEGRASI

**WMS Reguler & Lite:**
- PUSH BIMA, TROUBLESHOOT

**BITSTREAM & VULA:**
- RECONFIG, REPLACE ONT, TROUBLESHOOT (dengan SVLAN/CVLAN)

**ASTINET, METRO-E, VPN IP, IP TRANSIT, SIP TRUNK, VOICE, IPTV:**
- PUSH BIMA, TROUBLESHOOT (dengan TIKET FO)

### 🤖 Auto-Assignment System (Pure Round Robin)
- **Distribusi Tiket Otomatis**: Tiket baru langsung di-assign ke agent yang online secara otomatis
- **Algoritma Pure Round Robin**: 
  - Tiket diberikan **bergantian** ke semua agent online
  - Urutan berdasarkan **siapa yang login duluan hari ini** (`first_online_today`)
  - Posisi antrian **tidak berubah** meskipun agent istirahat (toggle off/on)
  - Semua agent online dapat giliran yang sama
- **Capacity Limit**: Agent tidak akan menerima tiket jika sudah mencapai max (default 3 aktif)
- **Online/Offline Toggle**: Agent bisa set status online untuk menerima tiket otomatis
- **Queue System**: Tiket tetap menunggu jika semua agent offline atau penuh

### 📋 Activity Logs (Developer & Admin)
- **Logging Aktivitas Sensitif**: Mencatat semua perubahan penting di sistem
- **Filter & Search**: Filter berdasarkan User, Action Type, Target, dan Tanggal
- **Export CSV**: Download log aktivitas ke file Excel/CSV
- **Action Types yang Dicatat**:
  - `ticket_assigned`: Manual assignment oleh admin/agent
  - `ticket_auto_assigned`: Auto-assignment oleh sistem
  - `ticket_status_changed`: Perubahan status (ada detail old → new)
  - `ticket_deleted`: Penghapusan tiket (admin only)
  - `user_approved`: Aktivasi user baru

### ⚠️ Tiered Escalation System
- **Reminder Bertingkat**: Notifikasi otomatis untuk tiket yang "nganggur" (belum di-assign)
  - **> 2 Jam**: "⚠️ X tiket belum diassign!"
  - **> 3 Jam**: "🚨 Reminder ke-2: X tiket belum diassign!"
  - **> 4 Jam**: "🚨 Reminder ke-3..." (dst setiap jam)
- **Notifikasi Bell**: Escalation muncul di bell notification admin/developer
- **Perilaku Notifikasi**:
  - Notifikasi tetap muncul meskipun tiket sudah di-assign
  - Saat diklik: jika tiket sudah ada agent → notifikasi dihapus
  - Jika tiket belum di-assign → notifikasi hanya ditandai sudah dibaca
- **Script Monitoring**: Berjalan otomatis di background setiap 5 menit

### 🔄 Auto-Reassign Tiket Tidak Aktif
- **10 Menit Tanpa Aktivitas**: 
  - Notifikasi ke Admin/Developer untuk cek manual
  - Notifikasi ke Agent dengan tombol **"Masih Dikerjakan"**
- **20 Menit Tanpa Aktivitas**: Auto-reassign **JIKA**:
  - Agent sudah **toggle offline**
  - Agent sudah online **> 9 jam** (lewat shift)
  - Agent **tidak ada heartbeat** 10 menit terakhir
- **Tombol "Masih Dikerjakan"**: Agent bisa konfirmasi tiket kompleks, mencegah auto-reassign

---

## 🛠️ Teknologi yang Dipake

### Backend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Python** | 3.x | Bahasa pemrograman backend |
| **FastAPI** | Latest | Web framework buat REST API |
| **Motor** | Latest | Driver MongoDB yang async |
| **MongoDB** | Latest | Database NoSQL |
| **Pydantic** | Latest | Validasi data & serialization |
| **python-jose** | Latest | Generate & validasi JWT token |
| **Passlib + BCrypt** | Latest | Hashing password biar aman |
| **Pandas** | Latest | Processing data buat export CSV |
| **python-dateutil** | Latest | Parsing date & handling timezone |
| **Redis** | 5.x | In-memory data store (Caching) |
| **Uvicorn** | Latest | ASGI server |
| **httpx** | Latest | HTTP client async buat Telegram API |

### Frontend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React** | 19.x | Library UI |
| **JavaScript** | ES6+ | Bahasa pemrograman frontend |
| **React Router** | v7 | Client-side routing |
| **Axios** | Latest | HTTP client |
| **Shadcn/UI** | Latest | Library komponen |
| **Radix UI** | Latest | Headless UI components |
| **Tailwind CSS** | Latest | Framework CSS utility-first |
| **Lucide React** | Latest | Library icon |
| **date-fns** | Latest | Utility tanggal |
| **Sonner** | Latest | Toast notifications |
| **Recharts** | Latest | Library chart (buat ke depan) |

### Infrastructure
| Teknologi | Fungsi |
|-----------|--------|
| **Docker + Compose** | Kontainerisasi & orkestrasi aplikasi |
| **Nginx** | Reverse proxy |

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                    TELEGRAM BOT USERS                        │
│                   (User & Agent Telegram)                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
         ┌─────────────────────────────┐
         │     Telegram Bot Server      │
         │   (Node.js Telegram Bot)     │
         └──────────┬──────────────────┘
                    │
                    │ HTTP/HTTPS (REST API)
                    ↓
┌───────────────────────────────────────────────────────────────┐
│                 DOCKER COMPOSE ENVIRONMENT                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    Nginx Reverse Proxy                   │  │
│  │          (Route /api → Backend, / → Frontend)            │  │
│  └────────────────┬──────────────────┬────────────────────┘  │
│                   │                   │                        │
│                   ↓                   ↓                        │
│  ┌─────────────────────────┐  ┌──────────────────────────┐  │
│  │   Frontend Container     │  │   Backend Container       │  │
│  │   • React App (Port 3000)│  │   • FastAPI (Port 8001)   │  │
│  │   • Served by Nginx      │  │   • Uvicorn ASGI          │  │
│  │   • Hot reload enabled   │  │   • Hot reload enabled    │  │
│  └─────────────────────────┘  └────────┬──────────────────┘  │
│                                         │                      │
│                                         ↓                      │
│                         ┌──────────────────────────┐          │
│                         │   MongoDB Container      │          │
│                         │   • NoSQL Database       │          │
│                         │   • 3 Collections        │          │
│                         └──────────────────────────┘          │
│                                         │                      │
│                         ┌──────────────────────────┐          │
│                         │   Redis Container        │          │
│                         │   • Caching Layer        │          │
│                         │   • Dashboard Stats      │          │
│                         └──────────────────────────┘          │
└───────────────────────────────────────────────────────────────┘
                                 │
                                 ↓
                    ┌────────────────────────┐
                    │   Web Dashboard Users  │
                    │   (Admin & Agent)      │
                    └────────────────────────┘
```

---

## 📦 Komponen Utama

### Komponen Backend (`/app/backend/`)

#### 1. **server.py** - Aplikasi Utama
```python
# Komponen Inti:
- FastAPI Application Instance
- APIRouter dengan prefix /api
- CORS Middleware
- MongoDB Connection (Motor AsyncIOMotorClient)
- Security (HTTPBearer, JWT, BCrypt)
```

**Modul-modul Utama:**
- **Authentication Module**: Login, Register, generate JWT token
- **User Management Module**: Approve/reject agent, list users
- **Ticket Management Module**: Operasi CRUD, claim, update status
- **Comment Module**: Tambah & ambil komentar
- **Statistics Module**: Statistik dashboard (hari ini, bulan ini, total)
- **Export Module**: Export CSV

#### 2. **Pydantic Models**
```python
# Model Data:
- User: Info akun user (id, username, role, status)
- Ticket: Model tiket extended dengan 30+ fields:
  * Basic: ticket_number (format INC), category, status, assigned_agent
  * Details: permintaan, tipe_transaksi, order_number, wonum
  * Technical: nd_internet_voice, paket_inet, sn_lama, sn_baru, tipe_ont
  * Network: gpon_slot_port, svlan, cvlan, vlan
  * Additional: task_bima, ownergroup, tiket_fo, password
- Comment: Komentar di tiket (user, role, comment, timestamp, sent_to_telegram)
- DashboardStatsAdmin: Statistik buat dashboard admin
- DashboardStatsAgent: Statistik buat dashboard agent
- AgentStats: Statistik performa buat agent
- PerformanceTableData: Data laporan performa lanjutan
```

#### 3. **Layer Keamanan**
```python
# Komponen:
- Password Hashing: BCrypt dengan Passlib
- JWT Tokens: python-jose dengan algorithm HS256
- Bearer Token Authentication: FastAPI HTTPBearer
- Role-based Access Control: Depends(get_current_user)
```

## Pembaruan Terbaru (Januari 2026 - v2.6)

### 🛡️ Security Hardening & Privacy
- ✅ **WebSocket Auto-Reconnect**:
  - Implementasi mekanisme "Anti-Putus". Jika koneksi terputus (interrupted/network change), sistem otomatis mencoba sambung ulang setiap 3 detik.
  - Mencegah notifikasi macet di sisi agent.
- ✅ **Log Privacy Protection**:
  - Menonaktifkan pencatatan log akses Nginx khusus untuk endpoint WebSocket.
  - Melindungi Token JWT agar tidak terekspos dalam file log server (karena token ada di URL query).
- ✅ **Admin Comment Privacy**:
  - Komentar dari Admin sekarang bersifat **Internal Note**.
  - Hanya muncul di Dashboard Agent, **TIDAK** dikirim notifikasinya ke User Telegram.
  - Memungkinkan Admin menegur/memberi arahan ke Agent tanpa diketahui User.

### ⚠️ Strict SLA & Workload Management
- ✅ **Strict 15-Minute SLA**:
  - Alert "Tiket Terbengkalai" (15 menit) sekarang murni berdasarkan waktu status `in_progress`.
  - Tidak lagi di-reset oleh komentar agent.
  - Memastikan tiket benar-benar diselesaikan (Solved) dalam target waktu, bukan hanya dibalas.
- ✅ **Workload Include Pending**:
  - Tiket status `Pending` sekarang **DIHITUNG** dalam kuota maksimal agent.
  - Rumus: `Total Load = In Progress + Pending`.
  - Mencegah agent menumpuk tiket dengan mem-pending tiket lama untuk ambil tiket baru.
- ✅ **Full Agent Responsibility**:
  - Tiket **TIDAK LAGI** otomatis dilepas (release) saat agent offline atau habis shift.
  - Tiket tetap terkunci pada agent tersebut sampai selesai atau direassign manual oleh Admin.
  - Meningkatkan akuntabilitas agent terhadap tiket yang sudah diambil.

### 🎨 UI Refinement
- ✅ **High Contrast Toaster**:
  - Notifikasi toast sekarang menggunakan teks hitam di background putih dengan border halus.
  - Memastikan tingkat keterbacaan (readability) maksimal di berbagai kondisi layar.

---

## Pembaruan Sebelumnya (Januari 2026 - v2.5)

### 🛠️ Maintenance Script "Turbo" (UV Integrated)
- ✅ **Blazing Fast Dependency Install**: 
  - Integrasi **`uv` (Astral)** ke dalam script maintenance.
  - Menu khusus `[15] Install Backend Deps LOCALLY` yang 10-100x lebih cepat dari pip biasa.
  - Auto-detection: Menu install UV hanya muncul jika belum terinstall.
- ✅ **Clean Output**: Menghapus karakter emoji yang tidak kompatibel di beberapa terminal Windows lawas.
- ✅ **Smart Path Detection**: Script otomatis menemukan executable `uv` tanpa perlu restart terminal setelah install.

### 🎨 UI & Branding Refresh
- ✅ **New Logo**: Header Dashboard sekarang menggunakan logo resmi **"BGES FF ROC6"**.
- ✅ **Responsive Design**: Logo menyesuaikan ukuran layar (icon only di mobile, full logo di desktop).

### 🛡️ Security & Developer Protection
- ✅ **Developer Account Immunity**: 
  - Akun dengan role `developer` **TIDAK BISA** di-reset password, dihapus, atau diubah role-nya via UI.
  - Mencegah "accidental lockout" terhadap akun pembuat sistem.
  - Tombol aksi berbahaya disembunyikan otomatis untuk target developer.

### 🚨 Enhanced Admin Notifications
- ✅ **Critical Telegram Alerts**: Admin menerima notifikasi Telegram real-time untuk event kritis:
  - **Auto-Offline & Ticket Release**: Saat agent di-force offline karena shift > 9 jam.
  - **Stale Ticket Reassignment**: Saat tiket "basi" (20 menit no response) ditarik paksa dari agent.
- ✅ **Shift Logic Update**:
  - Durasi shift default diperpanjang ke **9 jam** (akomodasi istirahat).
  - **Flexible Anchor**: Login < 08:00 tetap dihitung start 08:00 (fairness policy).

---

## Pembaruan Sebelumnya (Januari 2026 - v2.3)

### 📋 Audit Logs (BARU!)
- ✅ **Riwayat Aktivitas Lengkap**:
  - Semua aksi penting tercatat: assign tiket, ubah status, hapus tiket
  - Aksi user management: approve user, delete user
  - Detail lengkap: siapa, kapan, apa yang diubah
- ✅ **Halaman Audit Logs** (Developer Only):
  - Filter berdasarkan user, action type, tanggal
  - Pagination untuk navigasi data besar
  - Export ke CSV untuk pelaporan
- ✅ **Format Log Entry**:
  ```json
  {
    "timestamp": "2026-01-10T04:00:00+08:00",
    "user_name": "admin1",
    "action": "ticket_assigned",
    "target_type": "ticket",
    "target_id": "uuid",
    "details": {
      "ticket_number": "INC0110202612345",
      "assigned_to_name": "Excel"
    }
  }
  ```

### 🔔 Notification Bell (BARU!)
- ✅ **Icon Lonceng di Header**:
  - Badge merah dengan jumlah notifikasi unread
  - Dropdown list notifikasi saat diklik
  - Klik notifikasi → langsung ke tiket terkait
- ✅ **Notifikasi Agent**:
  - Agent dapat notifikasi saat tiket di-assign ke mereka
  - Agent dapat notifikasi saat user membalas tiket
  - Format: "� Balasan baru: INC0110202612345 - Dari: Gatawu"
- ✅ **Notifikasi Admin/Developer**:
  - Escalation alert untuk tiket terbengkalai
  - "Tandai semua dibaca" button
- ✅ **Fitur Notifikasi**:
  - Mark as read individual atau semua sekaligus
  - Auto-refresh setiap 30 detik
  - Background unread di dropdown
  - Audio object dioptimasi (reuse dengan useRef, no memory leak)

### ⚠️ Automated Escalation (BARU!)
- ✅ **Deteksi Tiket Terbengkalai**:
  - Sistem cek tiket status "open" lebih dari 2 jam
  - Background task setiap 5 menit
  - Tiket ditandai agar tidak spam notifikasi
- ✅ **Notifikasi ke Admin/Developer**:
  - Otomatis kirim notifikasi web saat ada escalation
  - Format pesan: "⚠️ X tiket sudah open lebih dari 2 jam"
  - Ready untuk integrasi Telegram (coming soon)
- ✅ **Actions yang Dicatat**:
  | Action | Keterangan |
  |--------|------------|
  | `ticket_assigned` | Tiket ditugaskan ke agent |
  | `ticket_status_changed` | Status tiket berubah |
  | `ticket_deleted` | Tiket dihapus |
  | `user_approved` | User baru diapprove |
  | `user_deleted` | User dihapus |

---

## Pembaruan Sebelumnya (Januari 2026 - v2.2)

### 🤖 Auto-Assignment System (BARU!)
- ✅ **Algoritma Least Load + Round-Robin**:
  - Tiket otomatis ditugaskan ke agent dengan beban kerja paling rendah
  - Round-robin untuk distribusi merata jika beban sama
  - Konfigurasi `max_tickets` per agent (default: 3)
- ✅ **Toggle Online/Offline**:
  - Agent bisa toggle status online/offline via toggle di header
  - Hanya agent online yang menerima assignment tiket
  - Status tersimpan di database
- ✅ **Auto-Offline (Shift-Based)**:
  - Agent otomatis offline setelah **8 jam** sejak toggle online
  - Background task cek setiap 5 menit
  - Cocok untuk jadwal shift: Pagi (08-17), Middle (10-19), Siang (13-22), Sore (15-00)
- ✅ **Queue Management**:
  - Tiket tanpa agent online masuk antrian
  - Otomatis di-assign saat agent online kembali
  - Dashboard menampilkan jumlah tiket "Waiting"

### 🔔 Real-time WebSocket Notifications (BARU!)
- ✅ **Notifikasi Assignment Personal**:
  - Agent menerima notifikasi real-time saat dapat tiket baru
  - Toast notification dengan link ke tiket
  - Browser push notification (jika diizinkan)
- ✅ **Custom Notification Sound**:
  - Upload ringtone custom via Account Settings
  - Toggle on/off suara notifikasi
  - Fallback ke suara default jika tidak ada custom sound
- ✅ **WebSocket dengan JWT Authentication**:
  - Koneksi WebSocket ter-autentikasi dengan JWT token
  - Ping/pong keep-alive setiap 30 detik
  - Auto-reconnect saat connection lost

### �️ Smart Auto-Offline System (v2.4)
- ✅ **Shift Limit Protection (9 Jam)**:
  - Durasi kerja 9 jam (8 jam kerja + 1 jam istirahat)
  - **Flexible Anchor**: Login sebelum jam **08:00 WITA** dianggap mulai jam 08:00 untuk perhitungan durasi (Agent rajin tidak "dihukum" pulang cepat)
  - **Action**: Status Offline + **Tiket Dilepas (Released)** ke antrian
- ✅ **Connection Loss Protection (10 Menit)**:
  - Deteksi jika agent tidak mengirim heartbeat selama 10 menit (internet putus/laptop mati)
  - **Action**: Status Offline + **Tiket Dipertahankan (Kept)**
  - Notifikasi bell: *"Lost Connection (> 10 menit tanpa aktivitas)"*
- ✅ **Frontend Sync (Anti-Zombie)**:
  - Frontend otomatis mendeteksi jika backend mematikan status agent
  - Switch status otomatis berubah jadi merah & muncul peringatan

### �🕐 Standarisasi Timezone WITA (UTC+8)
- ✅ **Semua Timestamp Konsisten WITA**:
  - `created_at`, `updated_at`, `completed_at` menggunakan WITA
  - Dashboard statistics menggunakan WITA
  - Agent monitoring menggunakan WITA
- ⚠️ **JWT Token tetap UTC** (standar industri untuk interoperabilitas)

### 📊 Dashboard Enhancements
- ✅ **Agent Workload Overview**: Tabel monitoring beban kerja agent real-time
- ✅ **"Waiting" Card**: Menampilkan jumlah tiket di antrian
- ✅ **Online/Offline Status**: Badge status agent di daftar agent

---

## Pembaruan Sebelumnya (Januari 2026 - v2.1)

### 👤 Peningkatan Tampilan Pengguna Telegram
- ✅ **Integrasi Nama Tampilan**: 
  - Detail tiket sekarang menampilkan nama tampilan pengguna bersama username
  - Format: "Nama Tampilan - @username" di field Telegram User
  - Contoh: "Gatawu - @Gatawu"
- ✅ **Tampilan Penulis Komentar**:
  - Komentar menampilkan nama tampilan yang lebih ramah daripada @username
  - UI lebih bersih dengan hanya nama (contoh: "Gatawu")
  - Fallback ke username jika nama tampilan tidak tersedia
- ✅ **Pembaruan Model Backend**:
  - Menambahkan field `user_telegram_display_name` ke model tiket
  - Menambahkan field `telegram_display_name` ke model komentar
  - Sepenuhnya kompatibel dengan tiket yang sudah ada

### 🎨 Pembaruan Branding
- ✅ **Penamaan Konsisten**: Standarisasi nama aplikasi di semua tampilan
  - Desktop: "BGES Fulfillment - ROC6 Dashboard"
  - Mobile: "BGES ROC6"
  - Subtitle: "Sistem Manajemen Tiket v2.2"
- ✅ **Role Developer**: Role text berwarna ungu untuk pengguna developer
- ✅ **Branding Footer**: Diperbarui menjadi "by Just0rdinaryGuy"

## Pembaruan Sebelumnya (Desember 2025)

### 🔐 Security Hardening (NEW)
- ✅ **Rate Limiting**: Login (5/min), Register (3/min) untuk mencegah brute force
- ✅ **Debug Files Removed**: Hapus file debug yang berisi kredensial
- ✅ **Console.log Removed**: Hapus semua console.log dari frontend untuk keamanan
- ✅ **JWT Token**: 24 jam session expiry

### 👨‍💻 Developer Role (December 5, 2025)
- ✅ **Developer**: Role dengan kapasitas sama seperti admin
  - Akses penuh ke Dashboard, Tickets, User Management
  - Dapat approve/reject user, reset password, delete user
  - Terpisah dari admin untuk audit trail
- ✅ **Admin List Management**: 
  - Developer dapat melihat semua admin di User Management
  - Admin biasa hanya melihat admin lain (tidak termasuk developer)
  - Delete button untuk admin users
- ✅ **Custom 500 Error Page**: 
  - Halaman error dengan ilustrasi animasi (gear & wrench)
  - Design matching dengan dashboard
  - Pesan user-friendly dalam Bahasa Indonesia

### 🔍 New Features
- ✅ **Ticket Search**: Fitur pencarian tiket di halaman Tickets
  - Cari berdasarkan: ticket number, description, category, permintaan, user, agent, WONUM, ND
  - Real-time filtering dengan hasil pencarian
- ✅ **Bot Menu Commands**: /start, /lapor, /status, /bantuan
- ✅ **Telegram Service Resilience**: Connection pooling, retry logic, timeout handling

### Komunikasi 2 Arah
- ✅ User sekarang bisa balas pesan agent lewat bot Telegram
- ✅ Tombol "Balas" inline di notifikasi Telegram
- ✅ Pembatasan balas berdasarkan status (nggak bisa balas tiket yang udah selesai)
- ✅ Notifikasi WebSocket real-time buat agent

### Perbaikan UI/UX
- ✅ Halaman Tiket Agent didesain ulang dengan layout 3-tab (In Progress | Pending | Completed)
- ✅ Badge pesan belum dibaca di tab tiket
- ✅ Push notification browser buat tiket baru dan balasan
- ✅ Laporan Performa auto-load dengan bulan sekarang sebagai default
- ✅ Auto-reload saat filter berubah (debounced)
- ✅ Data kosong disembunyikan di laporan (nilai 0 ditampilin kosong)
- ✅ **Pagination**: Daftar tiket nampilin 10 per halaman dengan kontrol navigasi
  - Tombol "Prev" dan "Next" buat navigasi
  - Indikator halaman nunjukin halaman sekarang dan total halaman
  - Pagination dimatiin saat pencarian (nampilin semua hasil)
- ✅ **Notifikasi Suara**: Toggle on/off buat alert tiket baru dan balasan

### Perbaikan Bug
- ✅ Fixed duplikasi kategori QC2 dan LEPAS BI
- ✅ Fixed format deskripsi QC2 (hapus "PERMINTAAN: QC2" yang redundan)
- ✅ Fixed filter tahun di dashboard performa (handling ISO string)
- ✅ Fixed koneksi bot API (konfigurasi port)
- ✅ Fixed konflik routing endpoint balas
- ✅ **Fixed WebSocket memory leak**: Ping interval sekarang dibersihkan dengan benar saat component unmount
- ✅ **Fixed layout filter**: Tambahin whitespace-nowrap biar teks nggak wrap di layar kecil

### Optimasi Performa
- ✅ Redis caching buat statistik dashboard
- ✅ Debounced filter auto-reload (500ms)
- ✅ Monitoring kesehatan koneksi WebSocket
- ✅ Connection pooling HTTP client Telegram
- ✅ **API Timeout**: Tambahin timeout 10 detik buat request bot API biar nggak nge-hang

### Keamanan & Manajemen Akun
- ✅ **Ganti Password**: User bisa ganti password sendiri lewat Account Settings
- ✅ **Update Profil**: User bisa update nama dan username mereka
- ✅ **Admin Reset Password**: Admin bisa reset password buat agent/admin lain

## Kontribusi

Kontribusi selalu welcome! Ikutin panduan ini ya:
1. Fork repository-nya
2. Bikin feature branch
3. Bikin perubahan
4. Testing dengan teliti
5. Submit pull request

## 📝 Lisensi

Proyek ini dimiliki oleh **Just0rdinaryGuy**. Hak cipta dilindungi undang-undang.

## Bantuan

Kalo ada masalah atau pertanyaan, hubungi tim development.
### Komponen Frontend (`/app/frontend/src/`)

#### 1. **App.js** - Komponen Root
- Routing pake React Router
- Manajemen state autentikasi
- Axios interceptor buat JWT token
- Protected routes

#### 2. **Pages** (`/pages/`)
```javascript
LoginPage.js
├─ Form login dengan tabs (Login/Register)
├─ Penyimpanan JWT token
└─ Redirect setelah login

DashboardPage.js
├─ Admin Dashboard: Statistik Hari Ini, Bulan Ini, Total
├─ Agent Dashboard: Statistik tiket personal
└─ Conditional rendering berdasarkan role

TicketsPage.js
├─ Tiket Tersedia untuk Di-claim (Agent saja)
│  └─ Display: Badge "Category - Permintaan"
├─ Filter tabs: All/Tiket Saya, Pending, In Progress, Completed
│  └─ Setiap tab nampilin badge "Category - Permintaan"
├─ Tab "Open" cuma buat Admin
│  └─ Display: Badge "Category - Permintaan"
└─ Daftar tiket dengan status badges dan category badges

TicketDetailPage.js
├─ Detail informasi tiket
├─ Dropdown update status (beda Admin vs Agent)
├─ Dropdown assign agent (Admin saja)
├─ Sistem komentar (Tambah & lihat komentar)
└─ Hapus tiket (Admin saja)

AgentPerformancePage.js
├─ Metrik performa (Agent saja)
├─ Total tiket, selesai, dalam proses
├─ Rata-rata waktu penyelesaian
├─ Rating & tingkat penyelesaian
└─ Progress bars

UserManagementPage.js
├─ Persetujuan user pending (Admin saja)
├─ Tombol Approve/Reject
├─ Daftar Agent dengan fitur "Reset Password" (Admin)
├─ Dialog Reset Password
└─ Daftar user dengan badges

AccountPage.js
├─ Tampilan informasi profil
├─ Form ganti password
├─ Validasi password (min 6 karakter, konfirmasi cocok)
├─ Verifikasi password saat ini
└─ Bagian tips keamanan
```

#### 3. **Components** (`/components/`)
```javascript
Layout.js
├─ Sidebar navigasi
├─ Header dengan info user & logout
├─ Item menu kondisional berdasarkan role
└─ Highlight route aktif

UI Components (Shadcn/UI)
├─ Button, Card, Input, Label
├─ Select, Tabs, Badge
├─ Textarea, Progress
└─ Sonner Toast notifications
```

#### 4. **Styling**
```css
• Tailwind CSS: Styling utility-first
• Custom CSS: App.css buat global styles
• Google Fonts: Font family Inter
• Skema Warna: Blue & Slate (profesional)
• Desain Responsif: Pendekatan mobile-first
```

---

## 🔄 Alur Sistem

### 1. Alur Create Ticket + Auto-Assign (User → System → Agent)

```
┌──────────┐
│   USER   │
└────┬─────┘
     │ 1. Buka bot Telegram
     │ 2. /start → Create Ticket
     │ 3. Pilih kategori (HSI, WMS, dll)
     │ 4. Input deskripsi masalah
     ↓
┌──────────────┐
│ TELEGRAM BOT │
└──────┬───────┘
       │ 5. POST /api/webhook/telegram
       │    Body: {
       │      user_telegram_id,
       │      user_telegram_name,
       │      category,
       │      description
       │    }
       ↓
┌──────────────┐
│   BACKEND    │
└──────┬───────┘
       │ 6. Generate ticket_number (INC**********)
       │ 7. Create ticket dengan status "open"
       │ 8. Save ke MongoDB
       │ 9. 🤖 AUTO-ASSIGN: Cari agent online dengan beban terendah
       │    └── Algoritma: Least Load + Round-Robin
       │    └── Cek: Agent online? Beban < max_tickets?
       ↓
       ┌────────────────────────────────────────┐
       │         KONDISI AUTO-ASSIGN            │
       ├────────────────────────────────────────┤
       │  Ada agent online?                     │
       │  ├── YA → Assign ke agent              │
       │  │        Status: "in_progress"        │
       │  │        Kirim notif ke agent         │
       │  │                                     │
       │  └── TIDAK → Masuk antrian (waiting)   │
       │              Status: "open"            │
       │              Assign saat agent online  │
       └────────────────────────────────────────┘
       ↓
┌──────────────┐
│ TELEGRAM BOT │
└──────┬───────┘
       │ 10. Kirim notifikasi ke user:
       │     "Ticket INC********** berhasil dibuat"
       │     + Info agent jika sudah di-assign
       ↓
┌──────────────┐                    ┌──────────────┐
│   AGENT      │ ← WebSocket Notif ─│   BACKEND    │
└──────┬───────┘                    └──────────────┘
       │ 11. Agent terima notifikasi real-time
       │     - Toast notification
       │     - Sound notification (jika aktif)
       │     - Browser push notification
       │ 12. Tiket langsung masuk ke "My Tickets"
       ↓
┌──────────────┐
│   AGENT      │ Mulai kerja on ticket
└──────────────┘
```

### 2. Alur Auto-Assignment System --> new update

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTO-ASSIGNMENT SYSTEM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. SAAT TIKET BARU MASUK:                                      │
│     ┌─────────────────────────────────────────────────────┐     │
│     │ Tiket Baru Masuk                                    │     │
│     └─────────────────────┬───────────────────────────────┘     │
│                           ↓                                      │
│     ┌─────────────────────────────────────────────────────┐     │
│     │ Cari Agent Online dengan Beban Terendah             │     │
│     │ • Filter: status = "online"                         │     │
│     │ • Sort: current_tickets ASC, last_assigned_at ASC   │     │
│     │ • Limit: max_tickets (default: 3)                   │     │
│     └─────────────────────┬───────────────────────────────┘     │
│                           ↓                                      │
│           ┌───────────────────────────────┐                     │
│           │ Agent tersedia?               │                     │
│           └───────────────┬───────────────┘                     │
│              YA ↓                    ↓ TIDAK                    │
│     ┌────────────────────┐  ┌────────────────────────┐          │
│     │ Assign ke Agent    │  │ Masuk Antrian (Queue)  │          │
│     │ • Update ticket    │  │ • Status: "open"       │          │
│     │ • Status: in_prog  │  │ • assigned_agent: null │          │
│     │ • Kirim WebSocket  │  │ • Tunggu agent online  │          │
│     └────────────────────┘  └────────────────────────┘          │
│                                                                  │
│  2. SAAT AGENT TOGGLE ONLINE:                                   │
│     ┌─────────────────────────────────────────────────────┐     │
│     │ Agent Toggle Online                                 │     │
│     └─────────────────────┬───────────────────────────────┘     │
│                           ↓                                      │
│     ┌─────────────────────────────────────────────────────┐     │
│     │ Cek Antrian Tiket (Queue)                           │     │
│     │ • Query: status = "open", assigned_agent = null     │     │
│     │ • Sort: created_at ASC (FIFO)                       │     │
│     └─────────────────────┬───────────────────────────────┘     │
│                           ↓                                      │
│     ┌─────────────────────────────────────────────────────┐     │
│     │ Assign tiket dari antrian ke agent yang baru online │     │
│     │ hingga mencapai max_tickets                         │     │
│     └─────────────────────────────────────────────────────┘     │
│                                                                  │
│  3. AUTO-OFFLINE (SHIFT-BASED SMART MONITORING):                 │
│     ┌─────────────────────────────────────────────────────┐     │
│     │ Background Task (setiap 5 menit)                    │     │
│     │                                                     │     │
│     │ A. Shift Exceeded (> 9 Jam):                        │     │
│     │    • Trigger: Online > 9 jam (8 jam kerja + 1 break)│     │
│     │    • Anchor: Login < 08:00 dianggap mulai 08:00     │     │
│     │    • Action: Force Offline + RELEASE Tiket          │     │
│     │                                                     │     │
│     │ B. Connection Lost (> 10 Menit):                    │     │
│     │    • Trigger: No activity/heartbeat > 10 min        │     │
│     │    • Action: Force Offline + KEEP Tiket (Protected) │     │
│     └─────────────────────────────────────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

KONFIGURASI:
┌─────────────────────┬────────────────────────────────────────┐
│ Parameter           │ Deskripsi                              │
├─────────────────────┼────────────────────────────────────────┤
│ max_tickets         │ Maks tiket per agent (default: 3)      │
│ auto_offline_hours  │ Jam sebelum auto-offline (default: 9)  │
│ check_interval      │ Interval cek auto-offline (5 menit)    │
└─────────────────────┴────────────────────────────────────────┘

NOTIFIKASI KE AGENT:
┌─────────────────────┬────────────────────────────────────────┐
│ Channel             │ Deskripsi                              │
├─────────────────────┼────────────────────────────────────────┤
│ WebSocket           │ Real-time notification di dashboard    │
│ Toast               │ Pop-up notification dengan link tiket  │
│ Sound               │ Custom ringtone / default sound        │
│ Browser Push        │ Push notification (jika diizinkan)     │
│ Telegram            │ Notifikasi ke grup (assignment info)   │
└─────────────────────┴────────────────────────────────────────┘
```

### 3. Alur Manual Claim Ticket (Mode Legacy/Fallback) --> out of date

> **Note**: Alur ini digunakan sebagai fallback jika auto-assign dinonaktifkan atau agent ingin claim tiket dari antrian secara manual.

```
┌──────────┐
│  AGENT   │
└────┬─────┘
     │ 1. Login ke web dashboard
     │    atau bot telegram (/agent)
     ↓
┌──────────────┐
│ WEB/BOT UI   │
└──────┬───────┘
       │ 2. GET /api/tickets/open/available
       │    Header: Authorization Bearer JWT
       ↓
┌──────────────┐
│   BACKEND    │
└──────┬───────┘
       │ 3. Query MongoDB: {status: "open", assigned_agent: null}
       │ 4. Return list open tickets
       ↓
┌──────────────┐
│ WEB/BOT UI   │
└──────┬───────┘
       │ 5. Tampilkan available tickets
       │ 6. Agent klik "Claim Ticket"
       ↓
┌──────────────┐
│   BACKEND    │
└──────┬───────┘
       │ 7. PUT /api/tickets/{id}
       │    Body: {
       │      assigned_agent: agent_id,
       │      assigned_agent_name: username,
       │      status: "in_progress"
       │    }
       │ 8. Update MongoDB
       │ 9. Return updated ticket
       ↓
┌──────────────┐
│ WEB/BOT UI   │
└──────┬───────┘
       │ 10. Toast notification "Ticket claimed"
       │ 11. Ticket masuk ke "My Tickets"
       ↓
┌──────────┐
│  AGENT   │ Mulai kerja on ticket
└──────────┘
```


### 4. Alur Update Status & Comment (Agent → User)

```
┌──────────┐
│  AGENT   │
└────┬─────┘
     │ 1. Buka ticket detail
     │ 2. Update status: "pending"
     ↓
┌──────────────┐
│   BACKEND    │
└──────┬───────┘
       │ 3. PUT /api/tickets/{id}
       │    Body: {status: "pending"}
       │ 4. Update MongoDB
       │ 5. Return success
       ↓
┌──────────┐
│  AGENT   │
└────┬─────┘
     │ 6. Add comment:
     │    "Sedang menunggu konfirmasi dari tim teknis"
     ↓
┌──────────────┐
│   BACKEND    │
└──────┬───────┘
       │ 7. POST /api/tickets/{id}/comments
       │    Body: {comment: "..."}
       │ 8. Save comment ke MongoDB
       │ 9. Return comment dengan timestamp
       ↓
┌──────────────┐
│ TELEGRAM BOT │
└──────┬───────┘
       │ 10. Polling: GET /api/tickets/{id}/comments
       │     (Check setiap 30 detik)
       │ 11. Deteksi new comment dari agent
       │ 12. Format notifikasi
       ↓
┌──────────┐
│   USER   │ Terima notifikasi:
└──────────┘ "Update dari agent1: Sedang menunggu..."
```

### 5. Alur Complete Ticket

```
┌──────────┐
│  AGENT   │
└────┬─────┘
     │ 1. Selesai handle ticket
     │ 2. Update status: "completed"
     ↓
┌──────────────┐
│   BACKEND    │
└──────┬───────┘
       │ 3. PUT /api/tickets/{id}
       │    Body: {status: "completed"}
       │ 4. Set completed_at timestamp
       │ 5. Update MongoDB
       │ 6. Calculate completion time
       ↓
┌──────────────┐
│   DASHBOARD  │
└──────┬───────┘
       │ 7. Update statistics:
       │    - Dashboard: completed_today++
       │    - Agent Performance: completed++
       │    - Recalculate avg_time
       ↓
┌──────────────┐
│ TELEGRAM BOT │
└──────┬───────┘
       │ 8. Send notification ke user
       │    "✅ Ticket INC********** selesai!"
       ↓
┌──────────┐
│   USER   │ Ticket resolved
└──────────┘
```

### 6. Alur Admin Dashboard Statistics

```
┌──────────┐
│  ADMIN   │
└────┬─────┘
     │ 1. Login & open dashboard
     ↓
┌──────────────┐
│   FRONTEND   │
└──────┬───────┘
       │ 2. GET /api/statistics/admin-dashboard
       │    Header: Authorization Bearer JWT
       ↓
┌──────────────┐
│   BACKEND    │
└──────┬───────┘
       │ 3. Verify JWT & check role === "admin"
       │ 4. Query all tickets from MongoDB
       │ 5. Calculate statistics:
       │
       │    TODAY:
       │    - Filter tickets by today's date
       │    - Count: received, completed, in_progress, open
       │
       │    THIS MONTH:
       │    - Filter tickets by this month
       │    - Count: received, completed
       │    - Calculate: avg_completion_time
       │    - Count: active_agents (unique assigned_agent)
       │
       │    TOTAL:
       │    - Count: all_tickets, completed
       │    - Count: total_agents from users collection
       │    - Calculate: completion_rate
       │
       │ 6. Return JSON response
       ↓
┌──────────────┐
│   FRONTEND   │
└──────┬───────┘
       │ 7. Parse response
       │ 8. Render 3 sections:
       │    - Today Cards (4 cards)
       │    - This Month Cards (4 cards)
       │    - Total Accumulation Cards (4 cards)
       ↓
┌──────────┐
│  ADMIN   │ View real-time statistics
└──────────┘
```

---

## 💾 Database Schema

### MongoDB Collections

#### 1. **users** Collection
```javascript
{
  _id: ObjectId,
  id: "uuid-string",              // Custom UUID
  username: "agent1",              // Unique username
  password_hash: "bcrypt-hash",    // Hashed password
  role: "agent",                   // "admin" atau "agent"
  status: "approved",              // "pending" atau "approved"
  created_at: ISODate("2025-...")  // ISO datetime string
}
```

**Indexes:**
- `username`: unique index
- `role`: index untuk query by role
- `status`: index untuk pending users

#### 2. **tickets** Collection
```javascript
{
  _id: ObjectId,
  id: "uuid-string",                         // Custom UUID
  ticket_number: "INC111520251928405B6",     // Format: INC{MM}{DD}{YYYY}{HH}{mm}{ss}{randomText}
  user_telegram_id: "123456789",             // Telegram user ID
  user_telegram_name: "Gatawu",            // Telegram user name
  category: "HSI Indibiz",                   // Service category
  permintaan: "RECONFIG",                    // Request type
  description: "TIPE TRANSAKSI: AO\n...",    // Structured description (multi-line)
  status: "in_progress",                     // open/pending/in_progress/completed
  assigned_agent: "agent-uuid",              // Agent ID (null if not assigned)
  assigned_agent_name: "agent1",             // Agent username
  
  // Extended Fields (template-based)
  tipe_transaksi: "AO",                      // AO/PDA/MO/DO/SO/RO
  order_number: "SC1002090518",              // Order number
  wonum: "WO037823026",                      // Work order number
  nd_internet_voice: "161316004321",         // ND number
  paket_inet: "HSIEF300M",                   // Package
  sn_lama: "HWTC12345678",                   // Old serial number
  sn_baru: "ZTEGDA82DF31",                   // New serial number
  tipe_ont: "F670 V2.0",                     // ONT type
  gpon_slot_port: "172.20.167.4 SLOT 2...",  // GPON details
  svlan: "100",                              // SVLAN (BITSTREAM/VULA)
  cvlan: "200",                              // CVLAN (BITSTREAM/VULA)
  vlan: "300",                               // VLAN (other services)
  task_bima: "Pull Dropcore",                // BIMA task
  ownergroup: "TIF HD 123",                  // Owner group
  tiket_fo: "INF123456",                     // Fiber optic ticket
  password: "pass1234",                      // Password field
  sn_ap: "AP1234567",                        // AP serial (WMS)
  mac_ap: "AA:BB:CC:DD:EE:FF",               // AP MAC (WMS)
  ssid: "WIFI_1234",                         // SSID (WMS)
  keterangan_lainnya: "Additional notes",    // Other notes
  
  // Timestamps
  created_at: ISODate("2025-..."),           // Created timestamp
  updated_at: ISODate("2025-..."),           // Last update timestamp
  completed_at: ISODate("2025-...") | null   // Completion timestamp
}
```

**Indexes:**
- `ticket_number`: unique index
- `status`: index untuk filter by status
- `assigned_agent`: index untuk agent queries
- `created_at`: index untuk date range queries

#### 3. **comments** Collection
```javascript
{
  _id: ObjectId,
  id: "uuid-string",              // Custom UUID
  ticket_id: "ticket-uuid",       // Reference to tickets.id
  user_id: "user-uuid",           // Reference to users.id
  username: "agent1",             // Username for display
  role: "agent",                  // "admin" atau "agent"
  comment: "Sedang dicek...",     // Comment text
  timestamp: ISODate("2025-..."), // Comment timestamp
  sent_to_telegram: false         // Flag untuk tracking notifikasi
}
```

**Indexes:**
- `ticket_id`: index untuk get comments by ticket
- `timestamp`: index untuk sorting

---

## 🔌 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
**Deskripsi:** Register user baru (agent)  
**Auth:** None  
**Body:**
```json
{
  "username": "agent4",
  "password": "password123",
  "role": "agent"
}
```
**Response:**
```json
{
  "id": "uuid",
  "username": "agent4",
  "role": "agent",
  "status": "pending",
  "created_at": "2025-10-29T..."
}
```

#### POST `/api/auth/login`
**Deskripsi:** Login & get JWT token  
**Auth:** None  
**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```
**Response:**
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "username": "admin",
    "role": "admin",
    "status": "approved"
  }
}
```

### User Management Endpoints (Admin Only)

#### POST `/users/create-admin`
**Deskripsi:** Create second admin (admin2)  
**Auth:** Bearer Token (Admin)  
**Response:** Created admin user object


#### GET `/api/users/pending`
**Deskripsi:** Get pending user approvals  
**Auth:** Bearer Token (Admin)  
**Response:** Array of pending users

#### PUT `/api/users/{user_id}/approve`
**Deskripsi:** Approve pending user  
**Auth:** Bearer Token (Admin)  
**Response:** Updated user object

#### DELETE `/api/users/{user_id}`
**Deskripsi:** Delete/reject user  
**Auth:** Bearer Token (Admin)  
**Response:** Success message

#### PUT `/api/users/change-password`
**Deskripsi:** User change their own password  
**Auth:** Bearer Token  
**Body:**
```json
{
  "current_password": "oldpassword123",
  "new_password": "newpassword123"
}
```
**Response:**
```json
{
  "message": "Password changed successfully"
}
```

#### PUT `/api/users/{user_id}/reset-password`
**Deskripsi:** Admin reset user password (for forgot password case)  
**Auth:** Bearer Token (Admin)  
**Body:**
```json
{
  "new_password": "newpassword123"
}
```
**Response:**
```json
{
  "message": "Password reset successfully"
}
```

#### GET `/api/users/agents`
**Deskripsi:** Get all approved agents  
**Auth:** Bearer Token (Admin)  
**Response:** Array of agent users

### Ticket Endpoints


#### POST `/api/webhook/telegram`
**Deskripsi:** Create ticket dari bot  
**Auth:** None (public webhook)  
**Body:**
```json
{
  "user_telegram_id": "123456",
  "user_telegram_name": "User",
  "category": "HSI Indibiz",
  "description": "Problem description"
}
```
**Response:** Created ticket object

#### GET `/api/tickets`
**Deskripsi:** Get tickets (filtered by role & status)  
**Auth:** Bearer Token  
**Query Params:**
- `status` (optional): open, pending, in_progress, completed  
**Response:** Array of tickets

#### GET `/api/tickets/open/available`
**Deskripsi:** Get open tickets untuk di-claim  
**Auth:** Bearer Token  
**Response:** Array of open, unassigned tickets

#### GET `/api/tickets/{ticket_id}`
**Deskripsi:** Get ticket detail  
**Auth:** Bearer Token  
**Response:** Ticket object

#### PUT `/api/tickets/{ticket_id}`
**Deskripsi:** Update ticket (claim, status, assign)  
**Auth:** Bearer Token  
**Conflict Detection:**
- Returns 409 Conflict jika ticket sudah assigned ke agent lain
- Admin bypass conflict check
- Unassign (set to None) tidak ada conflict
**Body:**
```json
{
  "status": "completed",
  "assigned_agent": "agent-uuid",
  "assigned_agent_name": "agent1"
}
```
**Response:** 
- 200: Updated ticket object
- 409: `{"detail": "Ticket sudah diambil oleh agent1. Silakan pilih ticket lain."}`

#### DELETE `/api/tickets/{ticket_id}`
**Deskripsi:** Delete ticket  
**Auth:** Bearer Token (Admin)  
**Response:** Success message

### Comment Endpoints

#### POST `/api/tickets/{ticket_id}/comments`
**Deskripsi:** Add comment to ticket  
**Auth:** Bearer Token  
**Body:**
```json
{
  "comment": "Sedang dicek oleh tim teknis"
}
```
**Response:** Created comment object

#### GET `/api/tickets/{ticket_id}/comments`
**Deskripsi:** Get all comments for ticket  
**Auth:** Bearer Token  
**Response:** Array of comments

### Statistics Endpoints

#### GET `/api/statistics/admin-dashboard`
**Deskripsi:** Get admin dashboard statistics  
**Auth:** Bearer Token (Admin)  
**Response:**
```json
{
  "today": {
    "received": 5,
    "completed": 2,
    "in_progress": 2,
    "open": 1
  },
  "this_month": {
    "received": 50,
    "completed": 30,
    "avg_time": 2.5,
    "active_agents": 3
  },
  "total": {
    "all_tickets": 200,
    "completed": 150,
    "total_agents": 5
  }
}
```

#### GET `/api/statistics/agent-dashboard/{agent_id}`
**Deskripsi:** Get agent personal dashboard stats  
**Auth:** Bearer Token (Agent)  
**Response:** Similar structure dengan data agent saja

#### GET `/api/statistics/agent/{agent_id}`
**Deskripsi:** Get agent performance metrics  
**Auth:** Bearer Token  
**Response:**
```json
{
  "total_tickets": 20,
  "completed_tickets": 15,
  "in_progress_tickets": 3,
  "avg_completion_time_hours": 2.3,
  "rating": 4.8
}
```

### Export Endpoints

#### GET `/api/export/tickets`
**Deskripsi:** Export all tickets to CSV or XLSX  
**Auth:** Bearer Token (Admin)  
**Query Params:**
- `format`: csv or xlsx (default: csv)  
**Response:** CSV/XLSX file download dengan kolom:
- Ticket Number, Created Date, Updated Date, Completed Date
- User Telegram ID, User Telegram Name
- Category, Description, Status, Assigned Agent

**Filename Format:** `tickets_export_YYYY-MM-DD.{csv|xlsx}`

#### GET `/api/export/performance`
**Deskripsi:** Export detailed performance report  
**Auth:** Bearer Token (Admin)  
**Query Params:**
- `year`: Filter by year (e.g., 2025)
- `month`: Filter by month (1-12)
- `category`: Filter by ticket category
- `agent_id`: Filter by specific agent
- `format`: csv or xlsx (default: csv)

**Response:** CSV/XLSX file dengan kolom:
- Ticket Number, Created Date, Completed Date
- User Name, Category, Description
- Agent Name, Status, Duration (hours)
- Duration Category, < 1 Hour, 2-3 Hours, > 3 Hours

**Filename Format:** `performance_report_{year}_{month}_{category}_{agent}_{date}.{csv|xlsx}`

### Performance Report Endpoints

#### GET `/api/performance/table-data`
**Deskripsi:** Get performance table data with filtering  
**Auth:** Bearer Token (Admin)  
**Query Params:**
- `year`: Filter by year
- `month`: Filter by month (1-12)
- `category`: Filter by category
- `agent_id`: Filter by agent

**Response:**
```json
{
  "data": [
    {
      "agent": "agent1",
      "agent_id": "uuid",
      "total": 20,
      "completed": 15,
      "in_progress": 3,
      "pending": 2,
      "completion_rate": 75.0,
      "under_1hr": 5,
      "between_2_3hr": 8,
      "over_3hr": 2,
      "categories": {
        "HSI Indibiz": 5,
        "WMS Reguler": 10,
        ...
      }
    }
  ],
  "summary": {...},
  "categories": ["HSI Indibiz", "WMS Reguler", ...]
}
```

#### GET `/api/performance/by-agent`
**Deskripsi:** Get performance summary grouped by agent (Laporan Agent)  
**Auth:** Bearer Token (Admin)  
**Query Params:** Same as table-data  
**Response:** Array of agent performance summaries

#### GET `/api/performance/by-product`
**Deskripsi:** Get performance summary grouped by product/category (Laporan By Product)  
**Auth:** Bearer Token (Admin)  
**Query Params:** Same as table-data  
**Response:** Array of category performance summaries


### Comment Notification Endpoints (Bot Integration)

#### GET `/api/comments/pending-telegram`
**Deskripsi:** Get comments pending to be sent to Telegram (for bot polling)  
**Auth:** None (Public for bot)  
**Response:**
```json
[
  {
    "comment_id": "uuid",
    "ticket_id": "uuid",
    "ticket_number": "INC011020261430405B6",
    "user_telegram_id": "123456",
    "user_telegram_name": "User Name",
    "agent_username": "agent1",
    "comment": "Sedang dicek...",
    "timestamp": "2025-01-15T10:30:00Z"
  }
]
```

#### PUT `/api/comments/{comment_id}/mark-sent`
**Deskripsi:** Mark comment as sent to Telegram  
**Auth:** None (Public for bot)  
**Response:**
```json
{
  "message": "Comment marked as sent to Telegram"
}
```


#### POST `/api/users/create-admin`
**Deskripsi:** Create second admin user (admin2)  
**Auth:** Bearer Token (Admin)  
**Response:**
```json
{
  "message": "Admin2 created successfully",
  "username": "admin2",
  "password": "admin123",
  "role": "admin"
}
```

### Category & Years Endpoints

#### GET `/api/tickets/categories`
**Deskripsi:** Get list of all unique ticket categories  
**Auth:** Bearer Token  
**Response:**
```json
{
  "categories": ["HSI Indibiz", "WMS Reguler", "BITSTREAM", ...]
}
```

#### GET `/api/tickets/years`
**Deskripsi:** Get list of years from tickets (for filtering)  
**Auth:** Bearer Token  
**Response:**
```json
{
  "years": [2025, 2024]
}
```

---

## 🚀 Setup & Installation

### Prerequisites

**System Requirements:**
- Operating System: Linux (Ubuntu/Debian recommended)
- Docker & Docker Compose
- RAM: Minimum 4GB
- Storage: Minimum 10GB

**Required Software:**
- Python 3.9 or higher
- Node.js 16.x or higher
- Yarn 1.22 or higher
- MongoDB 5.0 or higher
- Docker & Docker Compose
- Nginx (reverse proxy)

### Installation Steps

#### 1. Install System Dependencies

**For Ubuntu/Debian:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and pip
sudo apt install python3 python3-pip -y

# Install Node.js and Yarn
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs -y
npm install -g yarn

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt update
sudo apt install mongodb-org -y
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Docker & Docker Compose
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker

# Install Nginx
sudo apt install nginx -y
```

**For macOS:**
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install dependencies
brew install python3 node mongodb docker docker-compose nginx
npm install -g yarn
```

#### 2. Verify Installations

```bash
# Check Python version (should be 3.9+)
python3 --version

# Check Node.js version (should be 16+)
node --version

# Check Yarn version
yarn --version

# Check MongoDB
mongod --version

# Check if MongoDB is running
sudo systemctl status mongod  # Linux
brew services list | grep mongodb  # macOS
```

### Backend Setup

#### 1. Navigate to backend directory
```bash
cd /app/backend
```

#### 2. Create virtual environment (recommended)
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# or
.\venv\Scripts\activate  # Windows
```

#### 3. Install Python dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**Backend Dependencies List:**
- `fastapi` - Web framework
- `uvicorn[standard]` - ASGI server
- `motor` - Async MongoDB driver
- `python-dotenv` - Environment variables
- `pydantic` - Data validation
- `python-jose[cryptography]` - JWT tokens
- `passlib[bcrypt]` - Password hashing
- `pandas` - Data processing
- `openpyxl` - Excel export support
- `httpx` - Async HTTP client (Telegram API)

#### 4. Setup environment variables
```bash
cp .env.example .env
nano .env  # Edit with your configuration
```

**Required Environment Variables:**
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=telegram_ticket_db
SECRET_KEY=your-secret-key-min-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
CORS_ORIGINS=http://localhost:3000,https://your-domain.com
BOT_TOKEN=your-telegram-bot-token
GROUP_CHAT_ID=-100xxxxxxxxxx
```

#### 5. Test backend
```bash
# Run manually to test
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Or use Docker Compose
docker-compose up -d backend
```

#### 6. Verify backend is running
```bash
# Check logs (Docker Compose)
docker-compose logs -f backend

# Test API
curl http://localhost:8001/api/auth/login
```

### Frontend Setup

#### 1. Navigate to frontend directory
```bash
cd /app/frontend
```

#### 2. Install Node.js dependencies
```bash
yarn install
```

**Frontend Dependencies List:**

**Core:**
- `react` (^19.x) - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Client-side routing
- `axios` - HTTP client

**UI Components:**
- `@radix-ui/react-dialog` - Modal dialogs
- `@radix-ui/react-dropdown-menu` - Dropdown menus
- `@radix-ui/react-label` - Form labels
- `@radix-ui/react-progress` - Progress bars
- `@radix-ui/react-select` - Select inputs
- `@radix-ui/react-tabs` - Tab navigation
- `lucide-react` - Icon library

**Styling:**
- `tailwindcss` - Utility CSS framework
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes

**Utilities:**
- `date-fns` - Date formatting
- `sonner` - Toast notifications
- `class-variance-authority` - Component variants
- `clsx` - Conditional classnames
- `tailwind-merge` - Merge Tailwind classes

**Charts (optional):**
- `recharts` - Chart library

#### 3. Setup environment variables
```bash
cp .env.example .env
nano .env  # Edit with your configuration
```

**Required Environment Variables:**
```bash
REACT_APP_BACKEND_URL=https://your-domain.com
REACT_APP_ENABLE_VISUAL_EDITS=false
ENABLE_HEALTH_CHECK=false
```

#### 4. Build frontend (for production)
```bash
yarn build
```

#### 5. Run frontend
```bash
# Development mode
yarn start

# Or use Docker Compose
docker-compose up -d frontend
```

#### 6. Verify frontend is running
```bash
# Check logs (Docker Compose)
docker-compose logs -f frontend

# Access in browser
open http://localhost:3000
```

### Database Setup

#### 1. Connect to MongoDB
```bash
mongosh  # or mongo (for older versions)
```

#### 2. Create database and indexes
```javascript
use telegram_ticket_db

// Create indexes for users collection
db.users.createIndex({ "username": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })
db.users.createIndex({ "status": 1 })

// Create indexes for tickets collection
db.tickets.createIndex({ "ticket_number": 1 }, { unique: true })
db.tickets.createIndex({ "status": 1 })
db.tickets.createIndex({ "assigned_agent": 1 })
db.tickets.createIndex({ "created_at": -1 })

// Create indexes for comments collection
db.comments.createIndex({ "ticket_id": 1 })
db.comments.createIndex({ "timestamp": -1 })
```

#### 3. Seed initial data (optional)
The backend automatically creates:
- Admin user (username: `admin`, password: `admin123`)
- 3 Sample agents (agent1, agent2, agent3)

### Redis Setup (Caching)

#### 1. Install Redis
**Windows:**
- Use WSL2 (Recommended)
- Or use Docker: `docker run -d -p 6379:6379 redis`
- Or use Memurai (Redis-compatible for Windows)

**Linux/Mac:**
```bash
sudo apt install redis-server
sudo service redis-server start
```

#### 2. Verify Redis
```bash
redis-cli ping
# Output: PONG
```

### Service Configuration

#### 1. Configure Docker Compose

The project includes a `docker-compose.yml` file that orchestrates all services:

```yaml
# docker-compose.yml (simplified example)
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongo:27017
    depends_on:
      - mongo
      - redis

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  mongo:
    image: mongo:5.0
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  mongo_data:
```

#### 2. Start all services
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Check Services

```bash
# Check all services status
docker-compose ps

# Expected output:
# NAME                COMMAND                  SERVICE             STATUS
# backend             "uvicorn server:app..."  backend             running
# frontend            "yarn start"             frontend            running
# mongo               "docker-entrypoint..."   mongo               running
# redis               "docker-entrypoint..."   redis               running
```

### Nginx Configuration (Optional - for production)

Create nginx config (`/etc/nginx/sites-available/telegram-dashboard`):

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/telegram-dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Troubleshooting

#### Backend Issues

**Port already in use:**
```bash
# Find process using port 8001
sudo lsof -i :8001
# Kill process
sudo kill -9 <PID>
```

**MongoDB connection failed:**
```bash
# Check MongoDB status
sudo systemctl status mongod
# Restart MongoDB
sudo systemctl restart mongod
```

**Import errors:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

#### Frontend Issues

**Port 3000 already in use:**
```bash
# Find and kill process
sudo lsof -i :3000
sudo kill -9 <PID>
```

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
```

**Module not found errors:**
```bash
# Install missing dependencies
yarn add <package-name>
```

### Verification

#### 1. Test Backend API
```bash
# Health check
curl http://localhost:8001

# Login test
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### 2. Test Frontend
```bash
# Open in browser
open http://localhost:3000

# Should see login page
```

#### 3. Test Database
```bash
# Check collections
mongosh telegram_ticket_db --eval "show collections"

# Count users
mongosh telegram_ticket_db --eval "db.users.countDocuments()"
```

### Production Deployment

#### 1. Build frontend for production
```bash
cd /app/frontend
yarn build
```

#### 2. Serve with Nginx
```bash
# Copy build to nginx directory
sudo cp -r build/* /var/www/telegram-dashboard/
```

#### 3. Use production environment variables
```bash
# Backend
export ENV=production
export DEBUG=false

# Frontend
export NODE_ENV=production
```

#### 4. Enable HTTPS with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔐 Environment Variables

### Backend (`.env`)
```bash
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=telegram_ticket_db
REDIS_URL=redis://localhost:6379

# JWT Configuration
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,https://your-domain.com
```

### Frontend (`.env`)
```bash
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:8000

# Feature Flags
REACT_APP_ENABLE_VISUAL_EDITS=false
ENABLE_HEALTH_CHECK=false
```

---

## 👥 User Roles

### Admin
**Capabilities:**
- ✅ View all tickets (semua status, semua agent)
- ✅ Create/Edit/Delete tickets
- ✅ Assign tickets ke agent
- ✅ **Reassign tickets tanpa conflict** (admin bypass)
- ✅ **Unassign tickets kembali ke open** (reset ticket)
- ✅ Update ticket status (open, pending, in_progress, completed)
- ✅ View all agent performance
- ✅ Approve/Reject agent registrations
- ✅ **Reset agent passwords (lupa password)**
- ✅ **Change own password**
- ✅ Export data ke CSV/XLSX dengan custom format
- ✅ Access User Management page
- ✅ Access Performance Report dengan 2 views (by Agent, by Product)
- ❌ TIDAK ada menu "My Performance"

**Dashboard View:**
- Today: Tickets Received, Completed, In Progress, Open
- This Month: Total Received, Completed, Avg Time (created → completed), Active Agents
- Total: All Time Tickets, Total Completed, Total Agents, Completion Rate
- Export buttons: CSV and XLSX with date in filename

**Performance Report:**
- Advanced filtering: Year, Month, Category, Agent
- Table with 9 columns: Agent, Rate %, < 1hr, 2-3hr, > 3hr, Pending, In Progress, Completed, Total
- Summary row with totals
- Export filtered data to CSV/XLSX with date columns

**Account Settings:**
- Profile information
- Change password
- View account details

**User Management:**
- Approve/Reject pending agent registrations
- View all approved agents
- Reset password untuk agent yang lupa password
- Each agent has "Reset Password" button

### Agent
**Capabilities:**
- ✅ View assigned tickets only
- ✅ Claim open tickets dari "Available Tickets to Claim"
- ✅ **Conflict detection**: Notifikasi otomatis jika ticket sudah diambil agent lain
- ✅ **Unassign own ticket**: Bisa release ticket yang sudah di-claim
- ✅ Update ticket status (in_progress, pending, completed)
- ✅ Add comments to tickets
- ✅ View personal performance metrics
- ✅ **Change own password**
- ❌ TIDAK bisa claim ticket yang sudah assigned ke agent lain
- ❌ TIDAK bisa assign tickets ke agent lain
- ❌ TIDAK bisa delete tickets
- ❌ TIDAK bisa approve users
- ❌ TIDAK bisa export data
- ❌ TIDAK bisa reset password agent lain

**Dashboard View:**
- Today: Tickets Received, Completed, In Progress, Pending
- This Month: Total Received, Completed, Avg Time, Completion Rate
- Total: All Time Tickets, Total Completed, Overall Rate

**My Performance View:**
- Total Tickets, Completed, In Progress
- Average Completion Time
- Rating & Progress Bars

**Account Settings:**
- Profile information
- Change password form with validation:
  - Current password verification
  - New password (min 6 characters)
  - Confirm password
- Security tips

---

## 🤖 Integrasi Bot

### Quick Start

1. **Baca dokumentasi lengkap:**
```bash
cat /app/BOT_INTEGRATION_COMPLETE_GUIDE.md
```

2. **Test webhook:**
```bash
curl -X POST http://localhost:8000/api/webhook/telegram \
  -H "Content-Type: application/json" \
  -d '{
    "user_telegram_id": "123456",
    "user_telegram_name": "Test User",
    "category": "HSI Indibiz",
    "description": "Test ticket from curl"
  }'
```

3. **Implement bot dengan Python:**
- Copy code dari `BOT_INTEGRATION_COMPLETE_GUIDE.md`
- Update `BOT_TOKEN` dengan token Anda
- Run bot: `python bot.py`

### Key Integration Points

1. **User create ticket:** `POST /webhook/telegram`
2. **Agent claim ticket:** `GET /tickets/open/available` → `PUT /tickets/{id}`
3. **Agent update status:** `PUT /tickets/{id}`
4. **Agent add comment:** `POST /tickets/{id}/comments`
5. **Bot get pending comments:** `GET /comments/pending-telegram` (polling, no auth required)
6. **Bot mark comment sent:** `PUT /comments/{comment_id}/mark-sent`

### Comment Notification Flow

Bot polling untuk notifikasi comment ke user:

```python
# Bot polling every 10 seconds
while True:
    # Get pending comments (no auth needed)
    response = requests.get(f"{API_URL}/comments/pending-telegram")
    comments = response.json()
    
    for comment in comments:
        # Send to user via Telegram
        bot.send_message(
            chat_id=comment['user_telegram_id'],
            text=f"Update dari {comment['agent_username']}:\n{comment['comment']}"
        )
        
        # Mark as sent
        requests.put(f"{API_URL}/comments/{comment['comment_id']}/mark-sent")
    
    time.sleep(10)
```

---

## 📊 Monitoring & Logs

### Check Backend Logs
```bash
# Docker Compose
docker-compose logs -f backend

# Or if running locally
tail -f backend.log
```

### Check Frontend Logs
```bash
# Docker Compose
docker-compose logs -f frontend

# Or if running locally
yarn start 2>&1 | tee frontend.log
```

### Service Control
```bash
# Restart services
docker-compose restart backend
docker-compose restart frontend

# Stop services
docker-compose stop backend frontend

# Start services
docker-compose start backend frontend

# Stop all and remove containers
docker-compose down

# Start all services with rebuild
docker-compose up -d --build
```

---

## 🧪 Testing

### Manual Testing Credentials

**Admin:**
- Username: `admin` / `admin2`
- Password: `admin123`

**Agent:**
- Username: `agent1` / `agent2` / `agent3`
- Password: `admin123`

### Demo Data

**Seed Demo Tickets:**
```bash
curl -X POST http://localhost:8000/api/database/reset-tickets \
  -H "Authorization: Bearer <admin_token>"
```

**Create Second Admin:**
```bash
curl -X POST http://localhost:8000/api/users/create-admin \
  -H "Authorization: Bearer <admin_token>"
```

### Test Endpoints

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Create ticket via webhook
curl -X POST http://localhost:8000/api/webhook/telegram \
  -H "Content-Type: application/json" \
  -d '{
    "user_telegram_id": "999",
    "user_telegram_name": "Test User",
    "category": "WMS Reguler",
    "description": "Test description"
  }'
```

---

## 📝 Lisensi

Proyek ini dimiliki oleh **Just0rdinaryGuy**. Hak cipta dilindungi undang-undang.

---

## 👨‍💻 Pengembangan

### Struktur Proyek
```
/app/
├── backend/
│   ├── server.py           # Aplikasi utama FastAPI
│   ├── requirements.txt    # Dependensi Python
│   └── .env               # Environment variables backend
├── frontend/
│   ├── src/
│   │   ├── App.js         # Komponen root
│   │   ├── pages/         # Komponen halaman
│   │   │   ├── LoginPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── TicketsPage.js
│   │   │   ├── TicketDetailPage.js
│   │   │   ├── AgentPerformancePage.js
│   │   │   ├── UserManagementPage.js
│   │   │   └── AccountPage.js          # BARU: Pengaturan akun
│   │   ├── components/    # Komponen reusable
│   │   │   ├── Layout.js
│   │   │   └── ui/        # Komponen Shadcn UI
│   │   └── lib/           # Utilities
│   ├── package.json       # Dependensi Node
│   └── .env              # Environment variables frontend
├── tests/                 # File test
├── README.md             # File ini
├── BOT_INTEGRATION_COMPLETE_GUIDE.md  # Panduan integrasi bot
└── TELEGRAM_BOT_INTEGRATION.md        # Referensi cepat
```

### Gaya Kode
- **Backend:** PEP 8 (Python)
- **Frontend:** Airbnb JavaScript Style Guide
- **Format:** Prettier buat JS/JSX, Black buat Python

---

## 🆘 Bantuan

Kalo ada masalah atau pertanyaan:
1. Cek logs: `docker-compose logs -f`
2. Review dokumentasi: `BOT_INTEGRATION_COMPLETE_GUIDE.md`
3. Test endpoints pake curl
4. Cek koleksi MongoDB

---

## 🆕 Update Terbaru (November 2025)

### Update Format Nomor Tiket
- **Format Lama**: `TKT-000001` (Sequential)
- **Format Baru**: `INC111520251928405B6` (Timestamp-based)
- **Keuntungan**:
  - Nomor tiket unik terjamin
  - Timestamp embedded di nomor tiket
  - Nggak perlu counting database
  - Lebih cocok buat distributed systems

### Deskripsi Tiket Berbasis Template
- **40+ Kombinasi Template** buat category + permintaan
- **Auto-formatting** pake bullet list di UI
- **Validasi Field** sesuai template masing-masing
- **Data Terstruktur** buat parsing dan reporting yang gampang

### Deteksi Konflik Canggih
```javascript
// Matrix Skenario
┌─────────────────────┬───────────┬──────────┬─────────┐
│ Skenario            │ User      │ Aksi     │ Hasil   │
├─────────────────────┼───────────┼──────────┼─────────┤
│ Tiket tersedia      │ Agent     │ Claim    │ ✅ OK   │
│ Udah di-assign      │ Agent     │ Claim    │ ❌ 409  │
│ Udah di-assign      │ Admin     │ Reassign │ ✅ OK   │
│ Udah di-assign      │ Admin     │ Unassign │ ✅ OK   │
│ Tiket sendiri       │ Agent     │ Unassign │ ✅ OK   │
└─────────────────────┴───────────┴──────────┴─────────┘
```

### Peningkatan Laporan Performa
- **Dua Tampilan Laporan**:
  1. **Laporan Agent**: Metrik performa per agent
  2. **Laporan By Product**: Statistik per kategori
- **Filter Canggih**: Tahun, Bulan, Category, Agent
- **Format Export**: Custom XLSX dengan 15+ kolom
- **Update Real-time**: Auto-refresh statistik

### Tampilan Daftar Tiket Ditingkatkan (Semua Tab)

**Update UI Komprehensif - 10 Views:**

```
Tampilan Agent (5):                  Tampilan Admin (5):
├─ Tersedia untuk Di-claim          ├─ Semua Tiket
├─ Tiket Saya (Semua)               ├─ Tiket Open  
├─ Pending                          ├─ Pending
├─ In Progress                      ├─ In Progress
└─ Completed                        └─ Completed
```

**Setiap Tampilan Sekarang Nampilin:**
- ✅ Format badge: "HSI Indibiz - RECONFIG"
- ✅ Styling biru: bg-blue-100, text-blue-700
- ✅ Tag icon included
- ✅ Preview deskripsi: line-clamp-2
- ✅ Desain konsisten di semua tab

**Keuntungan:**
- 📈 **Efisiensi**: Agent langsung lihat permintaan tanpa klik detail
- 🎯 **Filtering**: Mudah identifikasi tiket by tipe permintaan
- 👀 **Visibility**: Badge biru menonjol di list view
- ⚡ **Kecepatan**: Pengambilan keputusan lebih cepat buat claim/assign tiket
- 🎨 **Konsistensi**: Pola UI sama di semua tab

### Perbaikan UI/UX
- **Display Category + Permintaan**: Badge universal di 10 views
- **Deskripsi Bullet List**: Tampilan bersih, terstruktur pake HTML ul/li
- **Notifikasi Konflik**: Toast messages dengan detail error
- **Desain Responsif**: Interface mobile-friendly
- **Preview Deskripsi**: line-clamp-2 buat tampilan rapi di list view
- **Styling Konsisten**: Desain badge sama di semua 10 tampilan daftar tiket

---

## 📈 Metrik Performa

### Kapasitas Sistem
- **User Bersamaan**: 100+ koneksi simultan
- **Pemrosesan Tiket**: 1000+ tiket per hari
- **Waktu Respons**: < 200ms buat API calls
- **Database**: MongoDB dengan indexed queries

### Skalabilitas
- **Scaling Horizontal**: Siap deploy ke Docker Swarm atau Kubernetes
- **Load Balancing**: Nginx reverse proxy
- **Caching**: Redis buat statistik dashboard
- **CDN Ready**: Optimasi aset statis

---

## 🔧 Contoh Konfigurasi

### Komponen UI: Badge Category + Permintaan

**Format Display di Semua Tab:**
```jsx
// Komponen frontend (TicketsPage.js)
<span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">
  <Tag className="w-4 h-4" />
  {ticket.category}
  {ticket.permintaan && (
    <span className="text-blue-600"> - {ticket.permintaan}</span>
  )}
</span>
```

**Contoh Visual:**
```
┌─────────────────────────────────────────────────┐
│ INC111520251928405B6              [in_progress] │
│ TIPE TRANSAKSI: AO                              │
│ NOMOR ORDER: SC1002090518...                    │
│                                                 │
│ [HSI Indibiz - RECONFIG]  agent1  Nov 15, 2025│
│  └─ Badge biru              └─ Metadata        │
└─────────────────────────────────────────────────┘
```

**Tampilan yang Terpengaruh (10 total):**
- Agent: Tersedia untuk Di-claim, Tiket Saya, Pending, In Progress, Completed
- Admin: Semua, Open, Pending, In Progress, Completed

### Konfigurasi Template Tiket
```python
# Contoh: Template HSI Indibiz RECONFIG
template = {
    "category": "HSI Indibiz",
    "permintaan": "RECONFIG",
    "fields": [
        "TIPE TRANSAKSI",
        "NOMOR ORDER",
        "WONUM",
        "ND INET/VOICE",
        "PAKET INET",
        "SN ONT",
        "TIPE ONT",
        "GPON SLOT/PORT/ONU",
        "KETERANGAN LAINNYA"
    ]
}
```

### Aturan Deteksi Konflik
```python
# Logika backend
def check_conflict(current_ticket, update_data, current_user):
    is_admin = current_user.role == 'admin'
    is_unassigning = update_data.assigned_agent is None
    
    if is_admin or is_unassigning:
        return False  # Nggak ada konflik
    
    if current_ticket.assigned_agent and \
       current_ticket.assigned_agent != update_data.assigned_agent:
        return True  # Konflik terdeteksi
    
    return False
```

---

**Build with my sick brain for efficient ticket management**


*Last Update: January 10, 2026*
# 🌳 Jejak Kita - Sistem Manajemen Silsilah Keluarga

**Jejak Kita** adalah aplikasi web enterprise untuk mendokumentasikan, memvisualisasikan, dan mengelola silsilah keluarga secara komprehensif. Dibangun dengan teknologi modern (Vue.js 3, FastAPI, MongoDB), aplikasi ini memudahkan pelacakan garis keturunan, distribusi geografis anggota keluarga, dan analisis demografis.

## ✨ Fitur Utama

### 1. Visualisasi Silsilah (Interactive Family Tree)
- **Dynamic Graph:** Menggunakan D3.js untuk render pohon silsilah yang responsif.
- **Auto-Expand Navigation:** Mengklik node orang tua akan otomatis memuat dan menampilkan anak-anak serta pasangannya.
- **Smart Zoom & Pan:** Navigasi mudah untuk silsilah yang besar dan kompleks.
- **Export to Image:** Simpan visualisasi silsilah sebagai file gambar berkualitas tinggi.

### 2. Peta Persebaran Keluarga (Family Map)
- **Geospatial Tracking:** Visualisasi lokasi tempat tinggal anggota keluarga pada peta interaktif (Leaflet).
- **Clustering:** Mengelompokkan anggota keluarga di area yang berdekatan untuk kerapian visual.
- **Global Search:** Pencarian lokasi terintegrasi dengan OpenStreetMap (Nominatim) untuk akurasi tinggi.
- **Location Analytics:** Sidebar informatif yang menampilkan daftar kota dengan jumlah anggota keluarga di dalamnya.

### 3. Manajemen Anggota Lengkap
- **Profil Detail:** Menyimpan data lengkap mulai dari Nama, Alias, Tanggal/Tempat Lahir, Wafat, Pekerjaan, Kontak, hingga Catatan Khusus.
- **Support Multi-Pasangan:** Mendukung pencatatan lebih dari satu pasangan (poligami/menikah ulang) secara akurat.
- **Media Gallery:** Upload dan kelola foto profil serta galeri dokumen pendukung per anggota.
- **Relasi Fleksibel:** Menangani hubungan orang tua angkat, kandung, dan tiri.

### 4. Dashboard & Statistik
- **Demografi Real-time:** Grafik distribusi gender, status kehidupan, dan statistik vital lainnya.
- **Piramida Penduduk:** Analisis struktur usia anggota keluarga visual.
- **Activity Log:** Riwayat lengkap perubahan data untuk audit trail (siapa mengubah apa dan kapan).

### 5. Keamanan & Data
- **Role-Based Access Control (RBAC):**
  - **Admin:** Akses penuh sistem & manajemen user.
  - **Editor:** Hak tulis/edit data silsilah.
  - **Viewer:** Hak baca (read-only) untuk tamu.
- **Automated Backup:** Sistem backup otomatis database dan media ke Dropbox.
- **Import/Export:** Dukungan import data massal dari Excel/CSV.

---

## 🛠️ Tech Stack

| Komponen | Teknologi | Deskripsi |
|----------|-----------|-----------|
| **Frontend** | Vue.js 3 | Framework UI reaktif (Composition API) |
| | Tailwind CSS | Utility-first CSS framework untuk styling |
| | D3.js | Library visualisasi data untuk Family Tree |
| | Leaflet | Library peta interaktif |
| | Pinia | State Management |
| **Backend** | FastAPI | Framework Python modern, cepat (async) |
| | Motor | Driver MongoDB asinkron |
| | Pydantic | Validasi data dan serialization |
| **Database** | MongoDB 7 | NoSQL Database untuk fleksibilitas struktur data |
| **DevOps** | Docker | Containerization aplikasi |
| | Nginx | Web server & reverse proxy |

---

## 🚀 Cara Instalasi & Menjalankan (Production)

Disarankan menggunakan **Docker** untuk kemudahan deployment.

### Prasyarat
- Git
- Docker Desktop / Docker Engine

### 1. Clone Repository
```bash
git clone https://github.com/Just0rdinaryGuy/jejak.git
cd jejak
```

### 2. Konfigurasi Environment
Salin file contoh konfigurasi:
```bash
cd docker
cp .env.example .env
```

Edit file `.env` dan sesuaikan variabel penting:
```env
# Database Credentials
MONGO_PASSWORD=rahasia_super_aman

# Security
SECRET_KEY=generate_random_string_disini_32_karakter

# Backup (Optional)
DROPBOX_ACCESS_TOKEN=token_dropbox_anda
```

### 3. Menjalankan Aplikasi (Menggunakan Script Otomatis)
Kami menyediakan script helper `jejak.sh` untuk memudahkan manajemen server.

Dari root folder project:
```bash
# Beri izin eksekusi (hanya pertama kali)
chmod +x jejak.sh

# Masuk ke menu interaktif
./jejak.sh
```
Pilih menu **"8. Nyalakan Server (Start)"** atau **"1. Update"** untuk build awal.

Atau jalankan manual via command line:
```bash
./jejak.sh start
# atau
cd docker && docker compose up -d --build
```

### 4. Akses Aplikasi
Buka browser dan kunjungi:
- **Aplikasi Web:** `http://localhost` (atau IP server Anda)
- **API Documentation:** `http://localhost:8000/api/docs`

---

## 💻 Development Setup (Lokal Tanpa Docker)

Jika Anda ingin mengembangkan fitur dan menjalankan services secara manual di mesin lokal.

### Backend (Python)
1. Masuk direktori backend:
   ```bash
   cd backend
   ```
2. Buat & aktifkan Virtual Environment:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Jalankan Server Dev:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend (Node.js)
1. Masuk direktori frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan Server Dev:
   ```bash
   npm run dev
   ```

---

## 📂 Struktur Folder

```
jejak/
├── backend/            # Source code API (FastAPI)
│   ├── app/
│   │   ├── routers/    # Endpoints API
│   │   ├── services/   # Business Logic
│   │   └── models/     # Database Schema
├── frontend/           # Source code UI (Vue 3)
│   ├── src/
│   │   ├── views/      # Halaman aplikasi
│   │   └── components/ # Komponen reusable
├── docker/             # Konfigurasi Deployment
├── scripts/            # Script utilitas (Import/Export/Fixes)
└── jejak.sh            # Main control script
```

## 📝 Lisensi
Project ini adalah software **Proprietary/Private**.
Dilarang mendistribusikan ulang tanpa izin pemilik.

# 🇮🇩 Komdigi Legal GraphRAG AI

> **Sistem Asisten Regulasi Komunikasi dan Digital Republik Indonesia berbasis Knowledge Graph & Retrieval-Augmented Generation (GraphRAG) terintegrasi dengan Google Gemini LLM.**

Dikembangkan untuk mendukung penelitian, analisis kepatuhan hukum, dan konsultasi regulasi di lingkungan **Kementerian Komunikasi dan Digital (Komdigi) RI / Direktorat Jenderal Infrastruktur Digital (Ditjen DJID)**.

---

## 📌 Daftar Isi
- [Latar Belakang & Masalah](#-latar-belakang--masalah)
- [Solusi GraphRAG](#-solusi-graphrag)
- [Fitur Utama Aplikasi](#-fitur-utama-aplikasi)
  - [1. Konsultasi Hukum AI (Chat Consultation)](#1-konsultasi-hukum-ai-chat-consultation)
  - [2. Visualisasi Knowledge Graph Interaktif](#2-visualisasi-knowledge-graph-interaktif)
  - [3. Penjelajah Korpus Regulasi (Corpus Browser)](#3-penjelajah-korpus-regulasi-corpus-browser)
  - [4. Modul Evaluasi & Benchmark Standar Emas](#4-modul-evaluasi--benchmark-standar-emas)
  - [5. Diagnostik Sistem & Monitoring Kuota LLM](#5-diagnostik-sistem--monitoring-kuota-llm)
- [Arsitektur Teknis & Alur Kerja](#-arsitektur-teknis--alur-kerja)
- [Daftar Korpus Regulasi yang Terintegrasi](#-daftar-korpus-regulasi-yang-terintegrasi)
- [Metrik Evaluasi yang Didukung](#-metrik-evaluasi-yang-didukung)
- [Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [Daftar Endpoint API Backend](#-daftar-endpoint-api-backend)
- [Panduan Instalasi & Menjalankan](#-panduan-instalasi--menjalankan)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Informasi Pengembang & Lisensi](#-informasi-pengembang--lisensi)

---

## 🏛️ Latar Belakang & Masalah

Regulasi sektor pos, telekomunikasi, penyiaran, pelindungan data pribadi, dan transaksi elektronik di Indonesia memiliki kompleksitas struktural yang sangat tinggi:
1. **Hiper-Regulasi & Amandemen Berlapis**: UU No. 36 Tahun 1999 tentang Telekomunikasi telah diamandemen sebagian oleh UU No. 6 Tahun 2023 (UU Cipta Kerja). Begitu pula UU ITE yang diamandemen oleh UU No. 19/2016 dan UU No. 1/2024.
2. **Ketergantungan Antar-Pasal (Cross-Reference)**: Pasal substantif yang mengatur kewajiban perizinan sering kali terpisah dengan pasal sanksi pidana atau denda administratif pada bab atau regulasi turunan yang berbeda (misalnya PP No. 46/2021 dan PP No. 28/2025).
3. **Kelemahan RAG Konvensional (Plain Vector Search)**:
   - Pencarian vektor semantik murni sering gagal menangkap hierarki hukum (*lex superior derogat legi inferiori*) dan aturan khusus (*lex specialis derogat legi generali*).
   - RAG biasa rentan terhadap **halusinasi nomor pasal**, mencampurkan pasal yang sudah dicabut dengan pasal yang berlaku, serta mengabaikan relasi struktural antar-pasal.

---

## 🚀 Solusi GraphRAG

**Komdigi Legal GraphRAG** mengintegrasikan dua pilar utama:
1. **Knowledge Graph Multirelasi**: Memodelkan pasal, bab, dokumen perundangan, instansi regulator, dan sanksi sebagai *nodes*, serta relasi hukum seperti `MENGATUR`, `MENCABUT`, `MERUJUK`, `SANKSI_TERHADAP`, dan `MENURUNKAN` sebagai *edges*.
2. **Hybrid Retrieval (Lexical + Multi-Hop Graph Traversal)**:
   - Pencarian awal menemukan *seed nodes* yang relevan secara leksikal/semantik.
   - Algoritma *Graph Traversal* menelusuri simpul tetangga (1-2 hop) untuk menyerap konteks hukum yang saling merujuk (misalnya dari ketentuan perizinan langsung ke ketentuan sanksi atau tata cara teknisnya).
3. **Fact-Grounded Generation**: Hasil penelusuran graf disuntikkan ke prompt **Google Gemini 3.6 Flash** sebagai *ground truth* tunggal, menghasilkan jawaban hukum yang akurat, terstruktur, dan dilengkapi sitasi resmi.

---

## 🌟 Fitur Utama Aplikasi

### 1. Konsultasi Hukum AI (Chat Consultation)
- **Tanya Jawab Interaktif**: Pengguna dapat mengajukan pertanyaan hukum telekomunikasi dalam bahasa Indonesia alami.
- **Pilihan Metode Retrieval**:
  - `GraphRAG (Graph + Hybrid)`: Menelusuri relasi keterkaitan pasal dan sanksi secara menyeluruh.
  - `Vector/Semantic Hybrid`: Pencarian berbobot teks dan kata kunci.
- **Metadata Filtering**: Filter pencarian berdasarkan rentang tahun regulasi, jenis dokumen (UU, PP, Perpres, Permen), serta bab aturan.
- **Transparansi Sumber Hukum**: Setiap jawaban dilengkapi label pasal yang dikutip, kutipan langsung teks undang-undang, serta metadata dokumen resmi.
- **Contoh Pertanyaan Cepat (Quick Prompts)**: Termasuk kasus spektrum frekuensi, sanksi tanpa izin, sertifikasi perangkat, dan registrasi PSE.

### 2. Visualisasi Knowledge Graph Interaktif
- **Eksplorasi Graf Visual**: Menampilkan simpul dokumen, pasal, topik, dan sanksi dalam kanvas interaktif berbasis web.
- **Node Filtering & Highlighting**: Memfilter node berdasarkan kategori (Undang-Undang, Peraturan Pemerintah, Sanksi Pidana/Denda, Subjek Hukum).
- **Inspeksi Detail**: Klik pada node untuk membaca isi bunyi pasal asli, nomor ayat, dan daftar koneksi relasi hukumnya.

### 3. Penjelajah Korpus Regulasi (Corpus Browser)
- **Pustaka Pasal Lengkap**: Akses cepat ke seluruh pasal yang telah di-chunking dan distrukturkan ke dalam sistem.
- **Pencarian Multi-Kriteria**: Pencarian teks penuh (*full-text search*), pencarian berdasarkan nomor pasal, atau pencarian berdasarkan kata kunci regulator.
- **Statistik Korpus Real-Time**: Distribusi jenis norma (Kewajiban, Larangan, Hak, Sanksi, Prosedural, Definisi).

### 4. Modul Evaluasi & Benchmark Standar Emas
- **Ground Truth Berbasis File Resmi (`gold_standard.csv`)**: Memuat 46 baris kasus uji standar nasional hukum telekomunikasi dan penyiaran.
- **Tombol Unduh Dataset**: Memungkinkan peneliti mengunduh `gold_standard.csv` secara langsung via UI atau endpoint API.
- **Kalkulasi Metrik Otomatis**:
  - **Information Retrieval (IR)**: Hit@3, Hit@5, Hit@10, Precision@k, Recall@k, Mean Reciprocal Rank (MRR), dan waktu latensi retrieval (`waktu_s`).
  - **Framework RAGAS**: *Faithfulness* (kesetiaan pada teks regulasi), *Answer Relevance* (relevansi jawaban), dan *Context Precision*.
- **Pencarian & Filter Interaktif**: Filter kasus uji berdasarkan kategori topik atau cari berdasarkan ID (`TC-01`), bunyi pertanyaan, maupun pasal ground truth.
- **Modal Inspeksi Kasus Uji**: Analisis mendalam perbandingan *Ground Truth Chunks* vs *Retrieved Chunks* beserta metrik capaian spesifik per query.
- **Ekspor Hasil ke CSV / Excel**: Mengunduh seluruh data pengujian lengkap beserta baris kalkulasi rata-rata untuk keperluan publikasi ilmiah atau laporan tesis.

### 5. Diagnostik Sistem & Monitoring Kuota LLM
- **Status Koneksi Server & LLM**: Pengecekan real-time kesiapan server Express, status `GEMINI_API_KEY`, dan model yang aktif (`gemini-3.6-flash`).
- **Penanganan Kuota Anggun (Graceful Fallback)**: Sistem tetap dapat melakukan retrieval dan menyajikan pasal hukum bahkan saat kuota generasi LLM sedang dibatasi (*rate-limited*).

---

## 🔄 Arsitektur Teknis & Alur Kerja

```
                      [ Pengguna / Asisten Hukum ]
                                   │
                                   ▼
             ┌───────────────────────────────────────────┐
             │            React 19 Frontend              │
             │ (Chat, Visual Graph, Corpus, Benchmark)   │
             └─────────────────────┬─────────────────────┘
                                   │ HTTP API / JSON
                                   ▼
             ┌───────────────────────────────────────────┐
             │            Express.js Server              │
             │           (Port 3000 Ingress)             │
             └─────────────────────┬─────────────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
┌─────────────────────────────────┐         ┌─────────────────────────────────┐
│     GraphRAG Retrieval Engine   │         │    Google Gemini 3.6 Flash      │
│  - Tokenisasi & Preprocessing   │         │  - Grounded Answer Generation   │
│  - BM25 / TF-IDF Scoring        │         │  - Citation Formatting          │
│  - Multi-Hop Graph Traversal    │         │  - Verification & Safety        │
│  - Dynamic Context Assembling   │         └─────────────────────────────────┘
└────────────────┬────────────────┘                          ▲
                 │                                           │
                 └────────────── Context Prompt ─────────────┘
                                 (Top-k Pasal Relevan)
```

---

## 📚 Daftar Korpus Regulasi yang Terintegrasi

Sistem ini memuat pasal-pasal kunci dari peraturan perundang-undangan komunikasi, digital, dan penyiaran di Indonesia:

| No | Dokumen Regulasi | Topik Pembahasan Utama |
|---|---|---|
| 1 | **UU No. 36 Tahun 1999** | Penyelenggaraan Telekomunikasi, Perizinan, Larangan Monopoli, Sanksi Gangguan Fisik/Elektromagnetik |
| 2 | **UU No. 6 Tahun 2023** *(Cipta Kerja)* | Optimalisasi & Realokasi Spektrum, Penyelenggaraan Pos & Telekomunikasi |
| 3 | **UU No. 1 Tahun 2024 & UU No. 11 Tahun 2008** | Informasi dan Transaksi Elektronik (ITE), Penyelenggara Sistem Elektronik (PSE), Alat Bukti Elektronik |
| 4 | **UU No. 27 Tahun 2022** | Pelindungan Data Pribadi (PDP), Hak Subjek Data, Kewajiban Pengendali Data, Denda Administratif |
| 5 | **UU No. 32 Tahun 2002** | Penyiaran, Lembaga Penyiaran Komunitas, Izin Penyelenggaraan Penyiaran (IPP), Alokasi Frekuensi Penyiaran |
| 6 | **UU No. 38 Tahun 2009** | Penyelenggaraan Pos, Logistik, dan Ketentuan Pidana Pos Tanpa Izin |
| 7 | **UU No. 12 Tahun 2011** | Jenis dan Tata Urutan Hierarki Peraturan Perundang-undangan di Indonesia |
| 8 | **PP No. 52 Tahun 2000** | Telekomunikasi Khusus, Interkoneksi Jaringan, Pengaturan Tarif Telekomunikasi |
| 9 | **PP No. 53 Tahun 2000** | Penggunaan Spektrum Frekuensi Radio, Hak Penggunaan Orbit Satelit, Frekuensi Sementara & Hankam |
| 10 | **PP No. 46 Tahun 2021** | Standardisasi & Sertifikasi Alat/Perangkat Telekomunikasi, Kerjasama Frekuensi, Pengalihan Izin |
| 11 | **PP No. 28 Tahun 2025** | Perizinan Berusaha Berbasis Risiko Sektor Pos, Telekomunikasi, dan Sistem Elektronik |
| 12 | **Permen Kominfo No. 17 Tahun 2018** | Penyelenggaraan Amatir Radio (IAR), Radio Antar Penduduk (IKRAP), Call Sign, Larangan Stasiun |
| 13 | **Permen Kominfo No. 5 Tahun 2021** | Standar Kualitas Layanan (QoS) Telekomunikasi & Audit Teknis |
| 14 | **Permen Kominfo No. 2 Tahun 2023** | Penggunaan Spektrum Frekuensi Berdasarkan Izin Kelas (Class License) |
| 15 | **Permen Kominfo No. 9 Tahun 2023** | Biaya Hak Penggunaan (BHP) IPFR, Formula Tarif, dan Denda Administratif Keterlambatan |
| 16 | **Permen Kominfo No. 8 Tahun 2024** | Microwave Link, Hak Labuh (*Landing Right*) Lintas Batas Negara |
| 17 | **Permen Komdigi No. 2 Tahun 2025** | Pembaruan Persyaratan Teknis Sertifikasi Perangkat Telekomunikasi |
| 18 | **Permen Komdigi No. 8 Tahun 2026** | Tabel Alokasi Spektrum Frekuensi Radio Indonesia (TASFRI) |
| 19 | **Perpres No. 174 Tahun 2024** | Tugas Pokok, Fungsi, dan Tata Kerja Kementerian Komunikasi dan Digital (Komdigi) |

---

## 📊 Metrik Evaluasi yang Didukung

Aplikasi dilengkapi mesin evaluasi saintifik untuk mengukur keandalan sistem RAG:

### 1. Metrik Information Retrieval (IR)
- **Hit@k ($k=3, 5, 10$)**: Bernilai 1 jika setidaknya ada 1 pasal ground truth yang berhasil berada dalam $k$ hasil teratas, dan 0 jika tidak ada.
- **Precision@k ($k=3, 5, 10$)**: Proporsi pasal relevan di antara $k$ dokumen yang dikembalikan:
  $$\text{Precision@}k = \frac{|\text{Retrieved}_k \cap \text{Relevant}|}{k}$$
- **Recall@k ($k=3, 5, 10$)**: Proporsi pasal relevan yang berhasil ditemukan dari seluruh total pasal acuan:
  $$\text{Recall@}k = \frac{|\text{Retrieved}_k \cap \text{Relevant}|}{|\text{Relevant}|}$$
- **Mean Reciprocal Rank (MRR)**: Mengukur peringkat posisi pertama kali pasal relevan ditemukan:
  $$\text{MRR} = \frac{1}{|Q|} \sum_{i=1}^{|Q|} \frac{1}{\text{rank}_i}$$
- **Latensi Retrieval (`waktu_s`)**: Waktu komputasi yang dibutuhkan mesin penelusuran graf per pertanyaan (dalam satuan detik).

### 2. Metrik Framework RAGAS
- **Faithfulness**: Mengukur sejauh mana klaim jawaban didasarkan secara murni pada konteks regulasi yang ditemukan (tanpa halusinasi).
- **Answer Relevance**: Mengukur seberapa tepat jawaban menjawab inti pertanyaan pengguna tanpa berbelit-belit.
- **Context Precision**: Mengukur apakah pasal yang paling relevan ditempatkan pada urutan teratas dalam hasil retrieval.

---

## 📁 Struktur Direktori Proyek

```
.
├── gold_standard.csv            # Dataset acuan resmi 46 kasus uji evaluasi
├── metadata.json                # Konfigurasi nama, deskripsi, & kapabilitas aplikasi
├── package.json                 # Konfigurasi paket npm & script build/start
├── server.ts                    # Entry point server Express.js & rute API backend
├── server/
│   ├── benchmarkEvaluator.ts    # Mesin pengujian 46 kasus uji & kalkulasi metrik IR / RAGAS
│   ├── geminiService.ts         # Integrasi Google GenAI SDK (@google/genai)
│   └── graphRagEngine.ts        # Algoritma GraphRAG traversal, hybrid scoring, & filter
├── src/
│   ├── App.tsx                  # Komponen utama aplikasi dengan sistem navigasi tab
│   ├── main.tsx                 # Entry point React Vite
│   ├── types.ts                 # Definisi tipe TypeScript (Chunk, Node, Edge, Benchmark)
│   ├── components/
│   │   ├── Navbar.tsx               # Navigasi atas & panel status diagnostik
│   │   ├── ChatConsultation.tsx     # Antarmuka konsultasi hukum interaktif
│   │   ├── GraphVisualizer.tsx      # Kanvas visualisasi graf pengetahuan interaktif
│   │   ├── CorpusBrowser.tsx        # Penjelajah tabel pasal & korpus regulasi
│   │   ├── BenchmarkEvaluation.tsx  # Dashboard evaluasi benchmark 46 kasus uji
│   │   └── KomdigiLogo.tsx          # Komponen logo resmi Komdigi RI
│   └── data/
│       ├── komdigiCorpus.ts     # Basis data pasal regulasi Komdigi terstruktur
│       └── benchmarkTestSet.ts  # Data kasus uji terstruktur yang diimpor dari CSV
└── vite.config.ts               # Konfigurasi bundler Vite
```

---

## 🌐 Daftar Endpoint API Backend

| Metode | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/health` | Pengecekan status kesehatan server backend |
| `GET` | `/api/diagnostic` | Diagnostik koneksi Gemini API dan latensi inferensi |
| `POST` | `/api/chat` | Mengirim pertanyaan konsultasi hukum ke mesin GraphRAG + Gemini |
| `GET` | `/api/graph` | Mengambil seluruh node dan edge Knowledge Graph regulasi |
| `GET` | `/api/corpus` | Mengambil daftar seluruh pasal yang tersimpan dalam korpus |
| `POST` | `/api/benchmark/run` | Menjalankan evaluasi 46 kasus uji standar secara otomatis |
| `GET` | `/api/benchmark/gold-standard` | Mengunduh file mentah `gold_standard.csv` |

---

## ⚙️ Panduan Instalasi & Menjalankan

### 1. Prasyarat Sistem
- **Node.js** versi 18.x atau yang lebih baru.
- **npm** atau **yarn** package manager.
- Kunci API Google Gemini (**`GEMINI_API_KEY`**) dari Google AI Studio.

### 2. Konfigurasi Environment Variable
Buat atau periksa file `.env` di direktori *root*:
```env
GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here
NODE_ENV=development
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Menjalankan Server Development
```bash
npm run dev
```
Aplikasi akan aktif dan dapat diakses melalui browser pada `http://localhost:3000`.

### 5. Kompilasi & Menjalankan Mode Produksi
```bash
npm run build
npm start
```

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Motion (Framer Motion)](https://motion.dev/), [Lucide React](https://lucide.dev/).
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [tsx](https://github.com/privatenumber/tsx), [esbuild](https://esbuild.github.io/).
- **AI & Graph Engine**: [@google/genai](https://github.com/google/generative-ai-js) (Gemini 3.6 Flash), Custom Multi-Hop Graph Traversal, BM25/TF-IDF Hybrid Ranker.
- **Data & Benchmark**: Custom Knowledge Graph Schema, RAGAS Evaluation Protocol, Normalized Legal Chunks.

---

## 👤 Informasi Pengembang & Hak Cipta

- **Institusi**: Kementerian Komunikasi dan Digital Republik Indonesia (Komdigi) / Ditjen DJID.
- **Pengembang / Peneliti**: **AGUS WINARKO** (NIM: **25.55.2877**).
- **Proyek**: Penelitian dan Implementasi GraphRAG untuk Konsultasi Regulasi Telekomunikasi & Infrastruktur Digital.

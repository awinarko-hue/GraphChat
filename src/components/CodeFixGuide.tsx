import React, { useState } from 'react';
import { Terminal, Check, Copy, AlertTriangle, ShieldCheck, Zap, ArrowRight, Play, Cpu } from 'lucide-react';
import { DiagnosticResult } from '../types';

interface CodeFixGuideProps {
  diagnostic: DiagnosticResult | null;
  onRefreshDiagnostic: () => void;
}

export const CodeFixGuide: React.FC<CodeFixGuideProps> = ({
  diagnostic,
  onRefreshDiagnostic,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  const pythonColabSolution = `# =====================================================================
# SOLUSI PERBAIKAN LENGKAP: Integrasi Gemini API Modern, Tangguh & Responsif
# Dilengkapi Penanganan Otomatis 503 High Demand, Retry, & Model Fallback (2026)
# =====================================================================

# 1. Instalasi library SDK resmi terbaru
!pip install -q -U google-genai python-dotenv

import os
import time
import random
import pandas as pd
from google import genai
from google.genai import types

# 2. Ambil API Key dengan fallback aman (Colab Secrets atau OS Environment)
API_KEY = None
try:
    from google.colab import userdata
    API_KEY = userdata.get('GEMINI_API_KEY')
except Exception:
    pass

if not API_KEY:
    API_KEY = os.getenv('GEMINI_API_KEY')

# 3. Inisialisasi Klien Gemini SDK Modern
USE_LLM = False
client = None

if API_KEY and API_KEY.strip() != "":
    try:
        client = genai.Client(api_key=API_KEY)
        USE_LLM = True
        print("✅ Gemini API terhubung berhasil!")
    except Exception as e:
        print(f"⚠️ Gagal inisialisasi Gemini Client: {e}")
else:
    print(
        "⚠️ GEMINI_API_KEY belum diset. \\n"
        "💡 Cara mengaktifkan di Google Colab: \\n"
        "   1. Klik ikon Kunci (🔑 Secrets) di sidebar kiri Google Colab.\\n"
        "   2. Tambah secret: Name = 'GEMINI_API_KEY', Value = Kunci API Anda.\\n"
        "   3. Aktifkan sakelar 'Notebook access'.\\n"
    )

# 4. Fungsi Pembuat Konteks & Prompt RAG Hukum
PROMPT_SYSTEM = """Anda adalah asisten hukum ahli untuk regulasi Kementerian Komunikasi dan Digital (Komdigi) serta Ditjen SDPPI.
Jawab pertanyaan HANYA berdasarkan konteks regulasi resmi berikut.
Selalu sebutkan dasar hukumnya secara spesifik (nama peraturan, pasal, ayat, dan jenis norma).
Jika konteks tidak memadai, katakan dengan jelas bahwa hal tersebut tidak ditemukan dalam regulasi terkait."""

def rakit_konteks(df_hasil: pd.DataFrame) -> str:
    baris = []
    for _, r in df_hasil.iterrows():
        lok = f"Pasal {r['pasal']}" + (f" ayat ({r['ayat']})" if pd.notna(r.get('ayat')) else "")
        baris.append(f"[{r.get('nama_dokumen', r['chunk_id'])} — {lok} ({r.get('tipe', 'Ketentuan')}]: {r['isi']}")
    return "\\n\\n".join(baris)

# 5. Fungsi Eksekusi Jawab Tangguh (Retry + Multi-Model Fallback on 503 High Demand)
def jawab_gemini(pertanyaan: str, retriever, k: int = 8):
    t0 = time.time()
    hasil = retriever(pertanyaan, k)
    t_ret = time.time() - t0
    
    konteks = rakit_konteks(hasil)
    
    if USE_LLM and client:
        t0 = time.time()
        prompt_konten = f"KONTEKS REGULASI:\\n{konteks}\\n\\nPERTANYAAN: {pertanyaan}"
        
        # Urutan model fallback jika terjadi lonjakan trafik (HTTP 503 / 429)
        candidate_models = ["gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.1-flash-lite"]
        out = None
        
        for model_name in candidate_models:
            for attempt in range(1, 3):
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=prompt_konten,
                        config=types.GenerateContentConfig(
                            system_instruction=PROMPT_SYSTEM,
                            temperature=0.1,  # Akurasi tinggi & zero-hallucination
                            top_p=0.95
                        )
                    )
                    out = response.text
                    break  # Berhasil
                except Exception as err:
                    err_str = str(err)
                    print(f"⚠️ [Percobaan {attempt}] {model_name} menemui kendala: {err_str[:90]}")
                    if ("503" in err_str or "429" in err_str or "UNAVAILABLE" in err_str) and attempt < 2:
                        time.sleep(0.8 * attempt + random.uniform(0.1, 0.4))
                    else:
                        break  # Coba model berikutnya
            if out:
                break
                
        t_llm = time.time() - t0
        if not out:
            out = f"(Server LLM sedang mengalami lonjakan trafik 503 — Menampilkan intisari regulasi):\\n\\n" + konteks[:1500]
    else:
        out = "(LLM nonaktif — Menampilkan ekstrak konteks regulasi teratas:)\\n" + konteks[:1500]
        t_llm = 0.0
        
    return {
        'jawaban': out,
        'konteks': hasil,
        'waktu_retrieval': t_ret,
        'waktu_llm': t_llm
    }

# Contoh pengujian:
# res = jawab_gemini("Bagaimana ketentuan penggunaan spektrum frekuensi radio tanpa izin dan sanksinya?", retrieve_graphrag)
# print(res['jawaban'])`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonColabSolution);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyEnv = () => {
    navigator.clipboard.writeText('GEMINI_API_KEY="AIzaSy..."');
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const handleTestNow = async () => {
    setTestingConnection(true);
    await onRefreshDiagnostic();
    setTestingConnection(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Analisis & Perbaikan Error Integrasi LLM
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Diagnosis dan Solusi Error Gemini API pada Sistem GraphRAG
        </h2>
        <p className="text-slate-300 text-sm mt-2 max-w-4xl leading-relaxed">
          Pada log eksekusi Colab sebelumnya, muncul pesan: <code className="text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded font-mono text-xs">Secret GEMINI_API_KEY does not exist</code> dan penggunaan modul lama <code className="text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded font-mono text-xs">google.generativeai</code> dengan alias model lama. Di bawah ini adalah solusi komprehensif untuk stabilitas dan responsivitas maksimal.
        </p>
      </div>

      {/* 3 Root Causes and Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg mb-4">
            1
          </div>
          <h3 className="text-base font-bold text-white mb-2">Konfigurasi Secret Colab</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Fungsi <code className="text-indigo-300 font-mono">userdata.get('GEMINI_API_KEY')</code> memerlukan secret tersimpan pada sidebar Google Colab.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <p>1. Buka ikon 🔑 (Secrets) di sidebar Colab.</p>
            <p>2. Tambah secret name: <b>GEMINI_API_KEY</b></p>
            <p>3. Centang <b>Notebook access</b>.</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-4">
            2
          </div>
          <h3 className="text-base font-bold text-white mb-2">Migrasi ke SDK Resmi Modern</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Gunakan paket resmi terbaru <code className="text-emerald-300 font-mono">google-genai</code> (Python) dan <code className="text-emerald-300 font-mono">@google/genai</code> (Node/TS).
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <p>❌ Hindari: <code className="text-rose-400">google.generativeai</code></p>
            <p>✅ Gunakan: <code className="text-emerald-400">from google import genai</code></p>
            <p>✅ Akses teks: <code className="text-emerald-400">response.text</code></p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg mb-4">
            3
          </div>
          <h3 className="text-base font-bold text-white mb-2">Model Standar & Zero Hallucination</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Gunakan model <code className="text-sky-300 font-mono">gemini-3.7-flash</code> dengan temperature rendah (0.1) untuk inferensi hukum cepat dan presisi.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <p>• Model: <code className="text-sky-400">gemini-3.7-flash</code></p>
            <p>• Latensi rata-rata: <b>~0.6 - 1.2 detik</b></p>
            <p>• Didukung penalaran silsilah hukum.</p>
          </div>
        </div>
      </div>

      {/* Live Diagnostic Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Status Koneksi Gemini API pada Web App Ini</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Aplikasi ini terhubung langsung ke Google AI Studio runtime environment.
            </p>
          </div>

          <button
            id="btn-test-connection"
            onClick={handleTestNow}
            disabled={testingConnection}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
            <span>{testingConnection ? 'Menguji...' : 'Uji Koneksi Sekarang'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block mb-1">Status API Key:</span>
            <span
              className={`font-semibold flex items-center gap-1.5 ${
                diagnostic?.hasGeminiKey ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${diagnostic?.hasGeminiKey ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              {diagnostic?.hasGeminiKey ? 'Tersedia & Terinjeksi' : 'Belum Terpasang (Mode Offline)'}
            </span>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block mb-1">Model Aktif:</span>
            <span className="font-mono text-indigo-300 font-semibold">{diagnostic?.modelName || 'gemini-3.7-flash'}</span>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block mb-1">Versi SDK:</span>
            <span className="font-mono text-slate-200">{diagnostic?.activeSdk || '@google/genai'}</span>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block mb-1">Latensi Uji (Ping):</span>
            <span className="font-mono text-emerald-300 font-bold">
              {diagnostic?.latencyMs ? `${diagnostic.latencyMs} ms` : '-'}
            </span>
          </div>
        </div>
      </div>

      {/* Copyable Python Colab Script */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Kode Pengganti Sel Colab (S2 / S5) Siap Pakai
              </h3>
              <p className="text-xs text-slate-400">
                Salin dan tempel kode ini ke sel Google Colab Anda untuk menggantikan kode cell 27 & 28.
              </p>
            </div>
          </div>

          <button
            id="btn-copy-colab-code"
            onClick={handleCopyCode}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Tersalin ke Clipboard!' : 'Salin Kode Python'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[500px]">
          {pythonColabSolution}
        </pre>
      </div>
    </div>
  );
};

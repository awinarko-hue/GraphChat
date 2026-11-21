import React, { useState } from 'react';
import Markdown from 'react-markdown';
import {
  Send,
  Sparkles,
  Layers,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Share2,
  Copy,
  Check,
  RefreshCw,
  GitFork,
  FileText,
  Cpu
} from 'lucide-react';
import { QueryRequest, QueryResponse, RetrievalMode, NormaType, JenisDokumen } from '../types';

const SAMPLE_PROMPTS = [
  'Bagaimana ketentuan penggunaan spektrum frekuensi radio tanpa izin dan sanksinya?',
  'Apa kewajiban Lembaga Penyiaran Komunitas terkait izin dan perangkat teknik?',
  'Kapan denda administratif keterlambatan pembayaran BHP spektrum frekuensi mulai dikenakan?',
  'Apa tugas dan fungsi Kementerian Komunikasi dan Digital berdasarkan Perpres 174/2024?'
];

export const ChatConsultation: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [mode, setMode] = useState<RetrievalMode>('graphrag');
  const [k, setK] = useState(8);
  const [kSeed, setKSeed] = useState(6);
  const [temperature, setTemperature] = useState(0.1);
  const [showFilters, setShowFilters] = useState(false);
  const [showContextDetails, setShowContextDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filters
  const [filterJenis, setFilterJenis] = useState<string>('');
  const [filterTipe, setFilterTipe] = useState<NormaType | ''>('');
  const [filterTahunMin, setFilterTahunMin] = useState<number | undefined>(undefined);
  const [filterTahunMax, setFilterTahunMax] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (queryText?: string) => {
    const q = queryText || question;
    if (!q.trim()) return;

    setLoading(true);
    setErrorMessage(null);

    const payload: QueryRequest = {
      pertanyaan: q,
      mode,
      k,
      k_seed: kSeed,
      temperature,
      filter: {
        jenis: filterJenis || undefined,
        tipe: filterTipe ? [filterTipe] : undefined,
        tahunMin: filterTahunMin,
        tahunMax: filterTahunMax,
      },
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = await res.text();
      let data: QueryResponse;
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        if (!res.ok) {
          throw new Error(`Server status ${res.status}: ${responseText.slice(0, 150) || 'Layanan sedang dimuat ulang.'}`);
        }
        throw new Error('Format respon server bukan JSON yang valid. Silakan coba kembali.');
      }

      if (!res.ok) {
        throw new Error((data as any)?.error || `HTTP error ${res.status}`);
      }

      setResponse(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memproses konsultasi.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAnswer = () => {
    if (!response?.jawaban) return;
    navigator.clipboard.writeText(response.jawaban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Intro Header */}
      <div className="mb-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                GraphRAG Legal Engine + Gemini 3.7 Flash
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Tanya Jawab Hukum seputar Regulasi Komunikasi & Digital
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Sistem temu kembali pengetahuan hukum terpadu menggabungkan retrieval hibrida (Dense FAISS + Sparse BM25) dengan penalaran lintas pasal berbasis Knowledge Graph untuk memvalidasi sanksi, perizinan frekuensi, pos, dan penyiaran.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-toggle-filters"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
                showFilters
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Pengaturan & Filter</span>
              {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expandable Retrieval & Filter Settings */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Mode Retrieval */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Mode Retrieval RAG</label>
              <select
                id="select-retrieval-mode"
                value={mode}
                onChange={e => setMode(e.target.value as RetrievalMode)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="graphrag">GraphRAG (Traversial Silsilah & Rujukan)</option>
                <option value="hybrid">Hybrid RRF (Dense + BM25 Fusion)</option>
                <option value="dense">Dense Semantic (Vektor Semantik)</option>
                <option value="bm25">Sparse BM25 (Kecocokan Kata Hukum)</option>
              </select>
            </div>

            {/* Filter Jenis Dokumen */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Jenis Regulasi</label>
              <select
                id="select-filter-jenis"
                value={filterJenis}
                onChange={e => setFilterJenis(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="">Semua Dokumen (UU, PP, Permen, Perpres)</option>
                <option value="UU">Undang-Undang (UU)</option>
                <option value="PP">Peraturan Pemerintah (PP)</option>
                <option value="Permen">Peraturan Menteri (Permen)</option>
                <option value="Perpres">Peraturan Presiden (Perpres)</option>
                <option value="Perppu">Peraturan Pemerintah Pengganti UU (Perppu)</option>
              </select>
            </div>

            {/* Filter Tipe Norma */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Klasifikasi Norma</label>
              <select
                id="select-filter-norma"
                value={filterTipe}
                onChange={e => setFilterTipe(e.target.value as NormaType)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="">Semua Norma (Sanksi, Kewajiban, Hak, Larangan)</option>
                <option value="Sanksi">Sanksi (Administratif & Pidana)</option>
                <option value="Kewajiban">Kewajiban Penyelenggara</option>
                <option value="Larangan">Larangan Hukum</option>
                <option value="Hak">Hak Pengguna / Penyelenggara</option>
                <option value="Definisi">Definisi & Ketentuan Umum</option>
              </select>
            </div>

            {/* Retrieval K and Temperature */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-slate-300 font-medium mb-1.5">Top-K Satuan ({k})</label>
                <input
                  type="range"
                  min={3}
                  max={15}
                  value={k}
                  onChange={e => setK(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-slate-300 font-medium mb-1.5">Suhu LLM ({temperature})</label>
                <input
                  type="range"
                  min={0.0}
                  max={0.7}
                  step={0.1}
                  value={temperature}
                  onChange={e => setTemperature(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preset Query Chips */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Topik Tanya Cepat Regulasi:
        </p>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuestion(prompt);
                handleSubmit(prompt);
              }}
              className="text-xs bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Query Input Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-xl mb-8 focus-within:border-indigo-500 transition">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col sm:flex-row items-stretch gap-2"
        >
          <div className="flex-1 flex items-center px-3 py-1">
            <input
              id="input-legal-query"
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Ajukan pertanyaan hukum atau regulasi Komdigi (contoh: sanksi penggunaan frekuensi tanpa ISR)..."
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none"
            />
          </div>
          <button
            id="btn-submit-query"
            type="submit"
            disabled={loading || !question.trim()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 text-white font-medium text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Menganalisis...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Analisis Regulasi</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-rose-950/40 border border-rose-800/80 rounded-xl text-rose-300 text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-400" />
          <div>
            <p className="font-semibold text-rose-200">Gagal Mengambil Respon</p>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Query Result Card */}
      {response && (
        <div className="space-y-6">
          {/* Main Answer Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Header Telemetry */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 font-mono border border-indigo-500/20">
                  <Cpu className="w-3.5 h-3.5" />
                  {response.model}
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 text-slate-300 font-mono">
                  <GitFork className="w-3.5 h-3.5 text-indigo-400" />
                  Mode: {response.mode.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Retrieval: {response.waktu_retrieval}s | LLM: {response.waktu_llm}s
                </span>
                <button
                  id="btn-copy-answer"
                  onClick={handleCopyAnswer}
                  className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
                  title="Salin jawaban lengkap"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>

            {/* Structured Markdown Output */}
            <div className="prose prose-invert prose-indigo max-w-none text-slate-200 leading-relaxed text-sm sm:text-base">
              <Markdown>{response.jawaban}</Markdown>
            </div>

            {/* Status Notice if Fallback */}
            {response.status !== 'success' && response.errorDetails && (
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-start gap-2 text-xs text-amber-300/90">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                <span>{response.errorDetails}</span>
              </div>
            )}
          </div>

          {/* Legal Citations & Traversal Breakdown */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  Dasar Hukum & Konteks Satuan Regulasi Terkait ({response.konteks.length})
                </h3>
              </div>
              <button
                id="btn-toggle-context-details"
                onClick={() => setShowContextDetails(!showContextDetails)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                <span>{showContextDetails ? 'Sembunyikan Detail Teks' : 'Lihat Teks Pasal Lengkap'}</span>
                {showContextDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {response.citasi.map((cit, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-semibold text-xs text-indigo-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-400" />
                        {cit.nama_dokumen}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          cit.asal === 'graf'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {cit.asal === 'graf' ? 'Graf Traversal' : 'Dense/BM25 Seed'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-100">{cit.pasal}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-700/70 text-slate-300">
                        {cit.tipe}
                      </span>
                    </div>

                    {showContextDetails && (
                      <p className="text-xs text-slate-300 mt-2 bg-slate-900/70 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed italic">
                        "{cit.isi}"
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400">
                    <span>ID: <code className="text-slate-300">{cit.chunk_id}</code></span>
                    {cit.skor !== undefined && (
                      <span className="font-mono text-indigo-300">Score: {cit.skor}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

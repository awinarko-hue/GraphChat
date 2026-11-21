import React, { useState } from 'react';
import {
  Play,
  Download,
  CheckCircle2,
  Clock,
  Target,
  BarChart3,
  Layers,
  Sparkles,
  BookOpen,
  FileSpreadsheet,
  RefreshCw,
  Award,
} from 'lucide-react';
import { BENCHMARK_TEST_SET } from '../data/benchmarkTestSet';

export interface TestCaseResult {
  id: string;
  kategori: string;
  pertanyaan: string;
  ground_truth_pasal_labels: string[];
  retrieved_chunks_top10: string[];
  retrieved_labels_top10: string[];
  waktu_retrieval_s: number;
  waktu_llm_s: number;
  waktu_total_s: number;
  hit_3: number;
  precision_3: number;
  recall_3: number;
  hit_5: number;
  precision_5: number;
  recall_5: number;
  hit_10: number;
  precision_10: number;
  recall_10: number;
  reciprocal_rank: number;
  first_hit_rank: number | null;
  ragas_faithfulness: number;
  ragas_answer_relevance: number;
  ragas_context_precision: number;
  ragas_average: number;
  generated_answer_snippet: string;
}

export interface BenchmarkSummary {
  total_queries: number;
  mrr: number;
  avg_waktu_retrieval_s: number;
  avg_waktu_llm_s: number;
  avg_waktu_total_s: number;
  recall_at_3: number;
  recall_at_5: number;
  recall_at_10: number;
  precision_at_3: number;
  precision_at_5: number;
  precision_at_10: number;
  hit_at_3: number;
  hit_at_5: number;
  hit_at_10: number;
  avg_ragas_faithfulness: number;
  avg_ragas_answer_relevance: number;
  avg_ragas_context_precision: number;
  avg_ragas_composite: number;
  evaluated_at: string;
}

export const BenchmarkEvaluation: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [includeLlm, setIncludeLlm] = useState<boolean>(true);
  const [summary, setSummary] = useState<BenchmarkSummary | null>(null);
  const [results, setResults] = useState<TestCaseResult[]>([]);
  const [filterKategori, setFilterKategori] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedTestCase, setSelectedTestCase] = useState<TestCaseResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = Array.from(new Set(BENCHMARK_TEST_SET.map((t) => t.kategori)));

  const handleRunEvaluation = async () => {
    setIsRunning(true);
    setErrorMsg(null);
    try {
      const resp = await fetch('/api/benchmark/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ includeLlmEval: includeLlm }),
      });

      if (!resp.ok) {
        throw new Error(`Server returned status ${resp.status}`);
      }

      const data = await resp.json();
      if (data.success) {
        setSummary(data.summary);
        setResults(data.results);
      } else {
        throw new Error(data.error || 'Gagal menjalankan evaluasi');
      }
    } catch (err: any) {
      console.error('Evaluation run failed:', err);
      setErrorMsg(err?.message || 'Gagal menjalankan evaluasi benchmark. Silakan coba lagi.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleExportCSV = () => {
    if (results.length === 0) return;

    const headers = [
      'ID',
      'Kategori',
      'Pertanyaan',
      'Ground_Truth_Pasal',
      'First_Hit_Rank',
      'MRR',
      'Hit@3',
      'Hit@5',
      'Hit@10',
      'Precision@3',
      'Precision@5',
      'Precision@10',
      'Recall@3',
      'Recall@5',
      'Recall@10',
      'Waktu_Retrieval_s',
      'Waktu_LLM_s',
      'Waktu_Total_s',
      'RAGAS_Faithfulness',
      'RAGAS_Answer_Relevance',
      'RAGAS_Context_Precision',
      'RAGAS_Composite',
      'Top_Retrieved_Pasal',
    ];

    const rows = results.map((r) => [
      r.id,
      `"${r.kategori.replace(/"/g, '""')}"`,
      `"${r.pertanyaan.replace(/"/g, '""')}"`,
      `"${r.ground_truth_pasal_labels.join('; ').replace(/"/g, '""')}"`,
      r.first_hit_rank ?? 'N/A',
      r.reciprocal_rank,
      r.hit_3,
      r.hit_5,
      r.hit_10,
      r.precision_3,
      r.precision_5,
      r.precision_10,
      r.recall_3,
      r.recall_5,
      r.recall_10,
      r.waktu_retrieval_s,
      r.waktu_llm_s,
      r.waktu_total_s,
      r.ragas_faithfulness,
      r.ragas_answer_relevance,
      r.ragas_context_precision,
      r.ragas_average,
      `"${(r.retrieved_labels_top10[0] || '').replace(/"/g, '""')}"`,
    ]);

    if (summary) {
      rows.push([
        'RATA_RATA',
        'Semua Kategori',
        `Evaluasi ${summary.total_queries} Test Case`,
        '-',
        '-',
        summary.mrr,
        summary.hit_at_3,
        summary.hit_at_5,
        summary.hit_at_10,
        summary.precision_at_3,
        summary.precision_at_5,
        summary.precision_at_10,
        summary.recall_at_3,
        summary.recall_at_5,
        summary.recall_at_10,
        summary.avg_waktu_retrieval_s,
        summary.avg_waktu_llm_s,
        summary.avg_waktu_total_s,
        summary.avg_ragas_faithfulness,
        summary.avg_ragas_answer_relevance,
        summary.avg_ragas_context_precision,
        summary.avg_ragas_composite,
        '-',
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `evaluasi_benchmark_graphrag_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResults = results.filter((r) => {
    const matchCategory = filterKategori === 'all' || r.kategori === filterKategori;
    const matchQuery =
      searchKeyword.trim() === '' ||
      r.pertanyaan.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      r.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      r.ground_truth_pasal_labels.some((l) => l.toLowerCase().includes(searchKeyword.toLowerCase()));
    return matchCategory && matchQuery;
  });

  const filteredPreRunCases = BENCHMARK_TEST_SET.filter((tc) => {
    const matchCategory = filterKategori === 'all' || tc.kategori === filterKategori;
    const matchQuery =
      searchKeyword.trim() === '' ||
      tc.pertanyaan.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      tc.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      tc.ground_truth_pasal_labels.some((l) => l.toLowerCase().includes(searchKeyword.toLowerCase()));
    return matchCategory && matchQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" /> Modul Evaluasi & Riset
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <FileSpreadsheet className="w-3.5 h-3.5" /> File: gold_standard.csv ({BENCHMARK_TEST_SET.length} Baris Uji)
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Benchmark Evaluasi GraphRAG Komdigi (IR & RAGAS Framework)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Evaluasi komprehensif menggunakan dataset acuan resmi <strong className="text-slate-200">gold_standard.csv</strong>. Mengukur metrik Information Retrieval (MRR, Recall@k, Precision@k, Hit@k),
              latensi waktu retrieval (<code className="text-sky-300">waktu_s</code>), dan skor evaluasi RAGAS bebas halusinasi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              id="btn-download-gold-standard"
              href="/api/benchmark/gold-standard"
              download="gold_standard.csv"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
              title="Unduh file gold_standard.csv asli yang digunakan sebagai ground truth"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Unduh gold_standard.csv</span>
            </a>

            <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={includeLlm}
                onChange={(e) => setIncludeLlm(e.target.checked)}
                className="rounded border-slate-700 text-sky-500 focus:ring-sky-400"
              />
              <span>Sertakan Inferensi LLM & RAGAS</span>
            </label>

            <button
              id="btn-run-benchmark"
              onClick={handleRunEvaluation}
              disabled={isRunning}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg ${
                isRunning
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sky-950/50'
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
                  <span>Mengevaluasi {BENCHMARK_TEST_SET.length} Data Uji...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Jalankan Evaluasi Otomatis</span>
                </>
              )}
            </button>

            <button
              id="btn-export-csv"
              onClick={handleExportCSV}
              disabled={results.length === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                results.length === 0
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:border-slate-600'
              }`}
              title="Download rekapitulasi data format CSV untuk Excel / publikasi riset"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export CSV / Excel</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-xs text-red-300">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Summary Metrics Cards */}
      {summary ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {/* MRR */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Mean Reciprocal Rank</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400">{(summary.mrr * 100).toFixed(1)}%</div>
            <div className="text-[11px] text-slate-500 mt-1">MRR: {summary.mrr.toFixed(3)}</div>
          </div>

          {/* Hit@k Metrics */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Hit Rate @k</span>
              <Target className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl font-bold text-sky-400">
              {(summary.hit_at_5 * 100).toFixed(0)}% <span className="text-xs text-slate-400 font-normal">@5</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Hit@3: {(summary.hit_at_3 * 100).toFixed(0)}% | Hit@10: {(summary.hit_at_10 * 100).toFixed(0)}%
            </div>
          </div>

          {/* Recall@k Metrics */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Recall @k</span>
              <Layers className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold text-indigo-400">
              {(summary.recall_at_5 * 100).toFixed(1)}% <span className="text-xs text-slate-400 font-normal">@5</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              R@3: {(summary.recall_at_3 * 100).toFixed(0)}% | R@10: {(summary.recall_at_10 * 100).toFixed(0)}%
            </div>
          </div>

          {/* Precision@k Metrics */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Precision @k</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-emerald-400">
              {(summary.precision_at_5 * 100).toFixed(1)}% <span className="text-xs text-slate-400 font-normal">@5</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              P@3: {(summary.precision_at_3 * 100).toFixed(0)}% | P@10: {(summary.precision_at_10 * 100).toFixed(0)}%
            </div>
          </div>

          {/* RAGAS Composite Score */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Skor RAGAS</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-purple-400">
              {(summary.avg_ragas_composite * 100).toFixed(1)}%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Faithfulness: {(summary.avg_ragas_faithfulness * 100).toFixed(0)}%
            </div>
          </div>

          {/* Waktu / Latency */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Waktu Rata-rata</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-cyan-400">
              {summary.avg_waktu_retrieval_s.toFixed(3)}s
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Total inkl. LLM: {summary.avg_waktu_total_s.toFixed(2)}s
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
            <div className="flex items-center gap-2 text-sky-400 text-sm font-semibold mb-2">
              <Target className="w-4 h-4" /> 1. Metrik Retrieval (IR)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mengevaluasi akurasi pencarian hibrida Dense + Sparse BM25 + Graph Traversal: <strong>MRR</strong>,{' '}
              <strong>Recall@k (3, 5, 10)</strong>, <strong>Precision@k (3, 5, 10)</strong>, dan <strong>Hit@k</strong>{' '}
              berdasarkan pasal target resmi.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
            <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold mb-2">
              <Sparkles className="w-4 h-4" /> 2. RAGAS Framework
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mengukur <strong>Faithfulness</strong> (kepatuhan anti-halusinasi pada pasal resmi),{' '}
              <strong>Answer Relevance</strong> (relevansi jawaban pada pertanyaan), dan <strong>Context Precision</strong>.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-2">
              <FileSpreadsheet className="w-4 h-4" /> 3. Siap Dipublikasikan
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seluruh rekaman uji dapat langsung di-export ke format CSV yang kompatibel dengan Microsoft Excel,
              Google Sheets, dan tabel pengujian skripsi / laporan riset.
            </p>
          </div>
        </div>
      )}

      {/* Main Table Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/80">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">Tabel Rekapitulasi Kasus Uji Regulasi</h3>
            <span className="text-xs text-slate-400">
              ({results.length > 0 ? `${filteredResults.length} dari ${results.length} hasil evaluasi` : `${filteredPreRunCases.length} dari ${BENCHMARK_TEST_SET.length} kasus uji gold standard`})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Cari pertanyaan / pasal / ID..."
                className="bg-slate-950 text-slate-200 placeholder-slate-500 text-xs rounded-lg pl-3 pr-8 py-1.5 border border-slate-800 focus:outline-none focus:border-sky-500 w-48 sm:w-60"
              />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-2 top-1.5 text-slate-500 hover:text-slate-300 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400">Kategori:</span>
              <select
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
                className="bg-slate-950 text-slate-300 text-xs rounded-lg px-3 py-1.5 border border-slate-800 focus:outline-none focus:border-sky-500"
              >
                <option value="all">Semua Kategori ({BENCHMARK_TEST_SET.length})</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4 min-w-[280px]">Pertanyaan Kasus Uji</th>
                <th className="py-3 px-4 min-w-[220px]">Ground Truth (Pasal Target)</th>
                <th className="py-3 px-3 text-center">Hit@5</th>
                <th className="py-3 px-3 text-center">MRR</th>
                <th className="py-3 px-3 text-center">Recall@5</th>
                <th className="py-3 px-3 text-center">Prec@5</th>
                <th className="py-3 px-3 text-center">Waktu (s)</th>
                <th className="py-3 px-3 text-center">RAGAS</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {results.length > 0 ? (
                filteredResults.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-sky-400">{row.id}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {row.kategori}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-white">{row.pertanyaan}</td>
                    <td className="py-3 px-4 text-slate-400">
                      <div className="space-y-0.5">
                        {row.ground_truth_pasal_labels.map((lbl, idx) => (
                          <div key={idx} className="text-emerald-400/90 flex items-center gap-1 text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {lbl}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-bold ${
                          row.hit_5 === 1
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {row.hit_5 === 1 ? '1 (Hit)' : '0 (Miss)'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">
                      {row.reciprocal_rank.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-indigo-300">
                      {(row.recall_5 * 100).toFixed(0)}%
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-emerald-300">
                      {(row.precision_5 * 100).toFixed(0)}%
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-cyan-400">
                      {row.waktu_retrieval_s.toFixed(3)}s
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-mono font-bold text-purple-400">
                        {(row.ragas_average * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedTestCase(row)}
                        className="text-sky-400 hover:text-sky-300 underline text-xs"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : filteredPreRunCases.length > 0 ? (
                filteredPreRunCases.map((tc) => (
                  <tr key={tc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-sky-400">{tc.id}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {tc.kategori}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-white">{tc.pertanyaan}</td>
                    <td className="py-3 px-4 text-slate-400">
                      <div className="space-y-0.5">
                        {tc.ground_truth_pasal_labels.map((lbl, idx) => (
                          <div key={idx} className="text-emerald-400/90 flex items-center gap-1 text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {lbl}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-500">-</td>
                    <td className="py-3 px-3 text-center text-slate-500">-</td>
                    <td className="py-3 px-3 text-center text-slate-500">-</td>
                    <td className="py-3 px-3 text-center text-slate-500">-</td>
                    <td className="py-3 px-3 text-center text-slate-500">-</td>
                    <td className="py-3 px-3 text-center text-slate-500">-</td>
                    <td className="py-3 px-4 text-center text-slate-500">
                      <span className="text-[11px] text-slate-500">Klik Jalankan</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-500">
                    Tidak ada kasus uji yang cocok dengan pencarian &quot;{searchKeyword}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Test Case */}
      {selectedTestCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sky-400 text-base">{selectedTestCase.id}</span>
                <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300">
                  {selectedTestCase.kategori}
                </span>
              </div>
              <button
                onClick={() => setSelectedTestCase(null)}
                className="text-slate-400 hover:text-white text-sm font-semibold px-2 py-1 rounded"
              >
                ✕ Tutup
              </button>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Pertanyaan Uji</h4>
              <p className="text-sm text-white font-medium bg-slate-950 p-3 rounded-lg border border-slate-800">
                {selectedTestCase.pertanyaan}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <h5 className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Ground Truth (Acuan Resmi)
                </h5>
                <ul className="text-xs text-emerald-400 space-y-1">
                  {selectedTestCase.ground_truth_pasal_labels.map((l, i) => (
                    <li key={i}>✓ {l}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <h5 className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Peringkat Temuan Pertama (First Hit)
                </h5>
                <div className="text-xs text-slate-200">
                  Rank:{' '}
                  <strong className="text-amber-400">
                    {selectedTestCase.first_hit_rank ? `Peringkat #${selectedTestCase.first_hit_rank}` : 'Tidak Ditemukan'}
                  </strong>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Reciprocal Rank:{' '}
                  <strong className="text-white">{selectedTestCase.reciprocal_rank.toFixed(4)}</strong>
                </div>
              </div>
            </div>

            {/* Metrik Grid Detail */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <h5 className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Rincian Metrik IR (@3, @5, @10) & Waktu
              </h5>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-900 rounded">
                  <div className="text-[10px] text-slate-400">Hit Rate</div>
                  <div className="font-bold text-sky-400">
                    {selectedTestCase.hit_3} | {selectedTestCase.hit_5} | {selectedTestCase.hit_10}
                  </div>
                  <div className="text-[9px] text-slate-500">@3 | @5 | @10</div>
                </div>
                <div className="p-2 bg-slate-900 rounded">
                  <div className="text-[10px] text-slate-400">Precision</div>
                  <div className="font-bold text-emerald-400">
                    {(selectedTestCase.precision_3 * 100).toFixed(0)}% | {(selectedTestCase.precision_5 * 100).toFixed(0)}% | {(selectedTestCase.precision_10 * 100).toFixed(0)}%
                  </div>
                  <div className="text-[9px] text-slate-500">@3 | @5 | @10</div>
                </div>
                <div className="p-2 bg-slate-900 rounded">
                  <div className="text-[10px] text-slate-400">Recall</div>
                  <div className="font-bold text-indigo-400">
                    {(selectedTestCase.recall_3 * 100).toFixed(0)}% | {(selectedTestCase.recall_5 * 100).toFixed(0)}% | {(selectedTestCase.recall_10 * 100).toFixed(0)}%
                  </div>
                  <div className="text-[9px] text-slate-500">@3 | @5 | @10</div>
                </div>
                <div className="p-2 bg-slate-900 rounded">
                  <div className="text-[10px] text-slate-400">Latency</div>
                  <div className="font-bold text-cyan-400">
                    {selectedTestCase.waktu_retrieval_s}s
                  </div>
                  <div className="text-[9px] text-slate-500">Retrieval time</div>
                </div>
              </div>
            </div>

            {/* RAGAS Breakdown */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <h5 className="text-[11px] uppercase tracking-wider text-purple-400 font-semibold mb-2">
                RAGAS Faithfulness & Relevance
              </h5>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-900 rounded">
                  <div className="text-[10px] text-slate-400">Faithfulness</div>
                  <div className="font-bold text-purple-300">
                    {(selectedTestCase.ragas_faithfulness * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="p-2 bg-slate-900 rounded">
                  <div className="text-[10px] text-slate-400">Answer Relevance</div>
                  <div className="font-bold text-purple-300">
                    {(selectedTestCase.ragas_answer_relevance * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="p-2 bg-slate-900 rounded">
                  <div className="text-[10px] text-slate-400">Context Precision</div>
                  <div className="font-bold text-purple-300">
                    {(selectedTestCase.ragas_context_precision * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
              {selectedTestCase.generated_answer_snippet && (
                <div className="mt-3 text-xs text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 font-semibold block mb-1">Snippet Jawaban:</span>
                  {selectedTestCase.generated_answer_snippet}
                </div>
              )}
            </div>

            {/* Top 5 Retrieved Chunks */}
            <div>
              <h5 className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Top Pasal yang Ditemukan Sistem
              </h5>
              <ol className="text-xs text-slate-300 space-y-1 list-decimal list-inside bg-slate-950 p-3 rounded-lg border border-slate-800">
                {selectedTestCase.retrieved_labels_top10.slice(0, 5).map((lbl, idx) => (
                  <li key={idx} className="truncate">
                    {lbl}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

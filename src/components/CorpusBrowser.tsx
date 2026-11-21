import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Search, Filter, Copy, Check, FileText, Tag, Calendar, ExternalLink } from 'lucide-react';
import { ChunkItem, NormaType } from '../types';

export const CorpusBrowser: React.FC = () => {
  const [items, setItems] = useState<ChunkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterJenis, setFilterJenis] = useState<string>('');
  const [filterTipe, setFilterTipe] = useState<NormaType | ''>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/regulations')
      .then(res => res.json())
      .then(data => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch regulations:', err);
        setLoading(false);
      });
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchQuery =
        !searchQuery ||
        item.isi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nama_dokumen.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.pasal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kata_kunci?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.entitas?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchJenis = !filterJenis || item.jenis.toLowerCase() === filterJenis.toLowerCase();
      const matchTipe = !filterTipe || item.tipe === filterTipe;

      return matchQuery && matchJenis && matchTipe;
    });
  }, [items, searchQuery, filterJenis, filterTipe]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTipeBadge = (tipe: NormaType) => {
    switch (tipe) {
      case 'Sanksi':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Kewajiban':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Larangan':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Hak':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Definisi':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Basis Data Korpus Regulasi
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Direktori Satuan Norma Hukum Komdigi & Ditjen DJID
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Telusuri seluruh pasal, ayat, dan ketentuan peraturan perundang-undangan sektor pos, telekomunikasi, penyiaran, dan spektrum frekuensi radio.
          </p>
        </div>

        <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 text-center">
          <span className="text-xs text-slate-400 block">Total Satuan Hukum:</span>
          <span className="text-xl font-bold text-white font-mono">{filteredItems.length}</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-md grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari isi pasal, kata kunci, sanksi..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <select
            value={filterJenis}
            onChange={e => setFilterJenis(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Semua Hierarki Regulasi</option>
            <option value="UU">Undang-Undang (UU)</option>
            <option value="PP">Peraturan Pemerintah (PP)</option>
            <option value="Permen">Peraturan Menteri (Permen)</option>
            <option value="Perpres">Peraturan Presiden (Perpres)</option>
          </select>
        </div>

        <div>
          <select
            value={filterTipe}
            onChange={e => setFilterTipe(e.target.value as NormaType)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Semua Tipe Norma</option>
            <option value="Sanksi">Sanksi</option>
            <option value="Kewajiban">Kewajiban</option>
            <option value="Larangan">Larangan</option>
            <option value="Hak">Hak</option>
            <option value="Definisi">Definisi</option>
            <option value="Ketentuan">Ketentuan</option>
          </select>
        </div>
      </div>

      {/* List of Items */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Memuat korpus...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-30 text-indigo-400" />
          <p className="text-base font-semibold text-slate-300">Tidak ada satuan regulasi yang cocok.</p>
          <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci atau reset filter pencarian Anda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map(item => (
            <div
              key={item.chunk_id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-indigo-300">{item.nama_dokumen}</span>
                    <span className="text-xs text-slate-400">• {item.nama_bab || 'Ketentuan'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${getTipeBadge(item.tipe)}`}>
                      {item.tipe}
                    </span>
                    <button
                      onClick={() => handleCopy(item.chunk_id, `[${item.nama_dokumen} — Pasal ${item.pasal}${item.ayat ? ` ayat (${item.ayat})` : ''}] ${item.isi}`)}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1 transition"
                      title="Salin teks pasal"
                    >
                      {copiedId === item.chunk_id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                    Pasal {item.pasal}
                    {item.ayat && ` ayat (${item.ayat})`}
                    {item.huruf && ` huruf ${item.huruf}`}
                    {item.angka && ` angka ${item.angka}`}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                  {item.isi}
                </p>
              </div>

              {/* Footer Metadata */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <div className="flex flex-wrap items-center gap-3">
                  {item.kata_kunci && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Tag className="w-3.5 h-3.5 text-indigo-400" />
                      {item.kata_kunci}
                    </span>
                  )}
                </div>

                {item.entitas && (
                  <span className="text-[11px] text-purple-300/80 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    Entitas: {item.entitas}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

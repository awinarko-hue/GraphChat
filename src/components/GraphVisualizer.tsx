import React, { useEffect, useState, useMemo } from 'react';
import { Network, Search, Filter, Share2, Layers, Info, Award, ArrowRight } from 'lucide-react';
import { KnowledgeGraphData, GraphNode, GraphEdge } from '../types';

export const GraphVisualizer: React.FC = () => {
  const [graphData, setGraphData] = useState<KnowledgeGraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    fetch('/api/graph')
      .then(res => res.json())
      .then(data => {
        setGraphData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load graph data:', err);
        setLoading(false);
      });
  }, []);

  const filteredNodes = useMemo(() => {
    if (!graphData) return [];
    return graphData.nodes.filter(node => {
      const matchesSearch =
        node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || node.tipe === filterType;
      return matchesSearch && matchesType;
    });
  }, [graphData, searchTerm, filterType]);

  const selectedNodeEdges = useMemo(() => {
    if (!graphData || !selectedNode) return { incoming: [], outgoing: [] };
    const incoming = graphData.edges.filter(e => e.to === selectedNode.id);
    const outgoing = graphData.edges.filter(e => e.from === selectedNode.id);
    return { incoming, outgoing };
  }, [graphData, selectedNode]);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'dokumen':
        return 'bg-rose-500 text-white border-rose-400';
      case 'bab':
        return 'bg-amber-500 text-slate-900 border-amber-400';
      case 'pasal':
        return 'bg-indigo-600 text-white border-indigo-400';
      case 'satuan':
        return 'bg-emerald-600 text-white border-emerald-400';
      case 'entitas':
        return 'bg-purple-600 text-white border-purple-400';
      default:
        return 'bg-slate-700 text-white border-slate-600';
    }
  };

  const getNodeBadge = (type: string) => {
    switch (type) {
      case 'dokumen':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'bab':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'pasal':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'satuan':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'entitas':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm">Memuat Graf Pengetahuan Regulasi Komdigi...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Info */}
      <div className="mb-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5" />
              Hierarki & Rujukan Silang Regulasi
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Penjelajah Knowledge Graph Regulasi
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Visualisasi keterkaitan antar dokumen perundang-undangan, bab, pasal, norma kewajiban/sanksi, dan entitas hukum kementerian.
          </p>
        </div>

        {/* Stats Pills */}
        {graphData && (
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400">Simpul: </span>
              <strong className="text-white font-mono">{graphData.stats.totalNodes}</strong>
            </div>
            <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400">Relasi: </span>
              <strong className="text-white font-mono">{graphData.stats.totalEdges}</strong>
            </div>
            <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400">Pasal: </span>
              <strong className="text-indigo-300 font-mono">{graphData.stats.byType.pasal || 0}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Control Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-md flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Cari simpul pasal, undang-undang, atau entitas..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Semua Tipe Simpul</option>
            <option value="dokumen">Dokumen Regulasi</option>
            <option value="bab">Bab</option>
            <option value="pasal">Pasal</option>
            <option value="satuan">Satuan Norma (Ayat/Huruf)</option>
            <option value="entitas">Entitas Hukum</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Nodes Grid Explorer */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-[640px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Daftar Simpul Terfilter ({filteredNodes.length})</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"/> Dokumen</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"/> Pasal</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/> Norma</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"/> Entitas</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 content-start">
            {filteredNodes.map(node => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-3 rounded-xl border transition cursor-pointer text-left ${
                  selectedNode?.id === node.id
                    ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500 shadow-md'
                    : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getNodeBadge(node.tipe)}`}>
                    {node.tipe.toUpperCase()}
                  </span>
                  {node.derajat !== undefined && (
                    <span className="text-[10px] font-mono text-slate-400">
                      deg: {node.derajat}
                    </span>
                  )}
                </div>

                <div className="text-xs font-semibold text-white truncate" title={node.label}>
                  {node.label}
                </div>

                <div className="text-[11px] text-slate-400 font-mono mt-1 truncate">
                  {node.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Node Inspection Panel & Top Hubs */}
        <div className="space-y-6">
          {/* Node Inspector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Detail Simpul Terpilih</span>
            </h3>

            {selectedNode ? (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Nama / Label:</span>
                  <p className="text-sm font-bold text-slate-100 bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                    {selectedNode.label}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block mb-1">Tipe:</span>
                    <span className={`px-2 py-0.5 rounded border text-[11px] font-medium inline-block ${getNodeBadge(selectedNode.tipe)}`}>
                      {selectedNode.tipe}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Konektivitas (Derajat):</span>
                    <span className="font-mono text-white font-bold text-sm">
                      {selectedNode.derajat || 0} relasi
                    </span>
                  </div>
                </div>

                {/* Outgoing Connections */}
                <div>
                  <span className="text-slate-400 block mb-1.5 font-medium">
                    Relasi Keluar ({selectedNodeEdges.outgoing.length}):
                  </span>
                  {selectedNodeEdges.outgoing.length > 0 ? (
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {selectedNodeEdges.outgoing.map((e, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-[11px]">
                          <span className="text-indigo-300 font-mono">{e.rel}</span>
                          <span className="text-slate-300 truncate max-w-[140px]">{e.to}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic">Tidak ada relasi keluar langsung.</p>
                  )}
                </div>

                {/* Incoming Connections */}
                <div>
                  <span className="text-slate-400 block mb-1.5 font-medium">
                    Dirujuk / Dimuat Oleh ({selectedNodeEdges.incoming.length}):
                  </span>
                  {selectedNodeEdges.incoming.length > 0 ? (
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {selectedNodeEdges.incoming.map((e, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-[11px]">
                          <span className="text-emerald-300 font-mono">{e.rel}</span>
                          <span className="text-slate-300 truncate max-w-[140px]">{e.from}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic">Tidak ada simpul yang merujuk langsung ke simpul ini.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 text-xs">
                <Network className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>Klik salah satu simpul pada daftar untuk memeriksa silsilah hubungan hukumnya.</p>
              </div>
            )}
          </div>

          {/* Top Hub Pasals */}
          {graphData?.stats?.topHubs && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Hub Regulasi Terhubung (High Centrality)</span>
              </h3>
              <div className="space-y-2">
                {graphData.stats.topHubs.slice(0, 5).map((hub, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      const found = graphData.nodes.find(n => n.id === hub.id);
                      if (found) setSelectedNode(found);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/60 transition cursor-pointer flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-slate-200 truncate max-w-[160px]">{hub.label}</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono text-[11px]">
                      {hub.degree} edges
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

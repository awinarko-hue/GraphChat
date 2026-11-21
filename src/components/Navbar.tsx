import React from 'react';
import { Cpu, Network, BookOpen, BarChart3 } from 'lucide-react';
import { DiagnosticResult } from '../types';
import { KomdigiLogo } from './KomdigiLogo';

interface NavbarProps {
  activeTab: 'chat' | 'graph' | 'corpus' | 'benchmark';
  setActiveTab: (tab: 'chat' | 'graph' | 'corpus' | 'benchmark') => void;
  diagnostic: DiagnosticResult | null;
  onRefreshDiagnostic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  diagnostic,
  onRefreshDiagnostic,
}) => {
  const isOnline = diagnostic?.apiStatus === 'online';

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-white/95 border border-slate-700/80 flex items-center justify-center shadow-md shadow-sky-500/10 p-1.5 hover:scale-105 transition-transform">
              <KomdigiLogo className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">Komdigi Legal GraphRAG</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  DJID AI
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sistem Asisten Regulasi Komunikasi &amp; Digital dengan Gemini 3.7 Flash <span className="text-slate-500">•</span> <span className="text-sky-400 font-semibold">By AGUS WINARKO - 25.55.2877</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex space-x-1">
            <button
              id="nav-tab-chat"
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Konsultasi AI</span>
            </button>

            <button
              id="nav-tab-graph"
              onClick={() => setActiveTab('graph')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'graph'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Graf Pengetahuan</span>
            </button>

            <button
              id="nav-tab-corpus"
              onClick={() => setActiveTab('corpus')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'corpus'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Korpus Regulasi</span>
            </button>

            <button
              id="nav-tab-benchmark"
              onClick={() => setActiveTab('benchmark')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === 'benchmark'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Evaluasi &amp; Benchmark</span>
            </button>
          </nav>

          {/* System & Gemini Health Badge */}
          <div className="flex items-center space-x-3">
            <button
              id="btn-diagnostic-refresh"
              onClick={onRefreshDiagnostic}
              title="Periksa status koneksi Gemini API"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 transition"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline
                    ? 'bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse'
                    : 'bg-amber-400'
                }`}
              />
              <span className="font-mono">
                {isOnline ? 'Gemini 3.6-Flash Online' : 'Mode Offline / Fallback'}
              </span>
            </button>
          </div>

        </div>
        
        {/* Mobile Navigation bar */}
        <div className="md:hidden flex overflow-x-auto py-2 space-x-1 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'chat' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Konsultasi AI
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'graph' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Graf Regulasi
          </button>
          <button
            onClick={() => setActiveTab('corpus')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'corpus' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Korpus Hukum
          </button>
          <button
            onClick={() => setActiveTab('benchmark')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'benchmark' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Evaluasi
          </button>
        </div>

      </div>
    </header>
  );
};

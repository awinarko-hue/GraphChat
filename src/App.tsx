import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ChatConsultation } from './components/ChatConsultation';
import { GraphVisualizer } from './components/GraphVisualizer';
import { CorpusBrowser } from './components/CorpusBrowser';
import { BenchmarkEvaluation } from './components/BenchmarkEvaluation';
import { DiagnosticResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'graph' | 'corpus' | 'benchmark'>('chat');
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);

  const fetchDiagnostic = () => {
    fetch('/api/diagnostic')
      .then(res => res.json())
      .then(data => setDiagnostic(data))
      .catch(err => {
        console.error('Failed to run diagnostic:', err);
      });
  };

  useEffect(() => {
    fetchDiagnostic();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        diagnostic={diagnostic}
        onRefreshDiagnostic={fetchDiagnostic}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'chat' && <ChatConsultation />}
        {activeTab === 'graph' && <GraphVisualizer />}
        {activeTab === 'corpus' && <CorpusBrowser />}
        {activeTab === 'benchmark' && <BenchmarkEvaluation />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Komdigi Legal GraphRAG AI &bull; Kementerian Komunikasi dan Digital RI &bull; <span className="text-sky-400 font-medium">By AGUS WINARKO - 25.55.2877</span>
          </span>
          <span className="font-mono text-slate-600">
            Powered by Gemini 3.6 Flash &bull; Ditjen DJID (Infrastruktur Digital)
          </span>
        </div>
      </footer>
    </div>
  );
}

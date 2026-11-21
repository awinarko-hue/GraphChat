import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { retrieveCorpus, getFullKnowledgeGraphData, applyMetadataFilter } from './server/graphRagEngine';
import { askGeminiLegal, extractCitations, runDiagnostic } from './server/geminiService';
import { runFullBenchmark } from './server/benchmarkEvaluator';
import { KOMDIGI_CORPUS } from './src/data/komdigiCorpus';
import { QueryRequest, QueryResponse } from './src/types';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ── 1. API Health Check ──
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Komdigi Legal GraphRAG AI Server',
      timestamp: new Date().toISOString(),
    });
  });

  // ── 2. Diagnostic Endpoint ──
  app.get('/api/diagnostic', async (req, res) => {
    try {
      const diag = await runDiagnostic();
      res.json(diag);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Gagal menjalankan diagnostik' });
    }
  });

  // ── 3. Knowledge Graph Visualizer Data ──
  app.get('/api/graph', (req, res) => {
    try {
      const graphData = getFullKnowledgeGraphData();
      res.json(graphData);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Gagal mengambil data graf' });
    }
  });

  // ── 4. Regulations Corpus Browse & Search ──
  app.get('/api/regulations', (req, res) => {
    try {
      const { jenis, tahunMin, tahunMax, tipe, kataKunci, q } = req.query;

      const filter = {
        jenis: jenis ? String(jenis) : undefined,
        tahunMin: tahunMin ? parseInt(String(tahunMin)) : undefined,
        tahunMax: tahunMax ? parseInt(String(tahunMax)) : undefined,
        tipe: tipe ? [String(tipe) as any] : undefined,
        kata_kunci: kataKunci ? String(kataKunci) : undefined,
      };

      let result = applyMetadataFilter(KOMDIGI_CORPUS, filter);

      if (q) {
        const queryStr = String(q).toLowerCase();
        result = result.filter(
          item =>
            item.isi.toLowerCase().includes(queryStr) ||
            item.nama_dokumen.toLowerCase().includes(queryStr) ||
            item.pasal.toLowerCase().includes(queryStr) ||
            item.kata_kunci?.toLowerCase().includes(queryStr) ||
            item.entitas?.toLowerCase().includes(queryStr)
        );
      }

      res.json({
        total: result.length,
        items: result,
      });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Gagal mencari regulasi' });
    }
  });

  // ── 5. GraphRAG Query + Gemini LLM Answer ──
  app.post('/api/chat', async (req, res) => {
    try {
      const body = req.body as QueryRequest;
      const pertanyaan = body.pertanyaan?.trim();

      if (!pertanyaan) {
        return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong.' });
      }

      const mode = body.mode || 'graphrag';
      const k = body.k || 8;
      const k_seed = body.k_seed || 6;
      const filter = body.filter;
      const temperature = body.temperature !== undefined ? body.temperature : 0.1;

      const t0 = Date.now();

      // Step 1: Retrieval (Dense / Sparse BM25 / Hybrid RRF / GraphRAG Traversal)
      const konteksChunks = retrieveCorpus(pertanyaan, mode, k, k_seed, filter);
      const retrievalTime = (Date.now() - t0) / 1000;

      // Step 2: Synthesize Answer via Gemini 3.7 Flash with zero hallucination guidance
      const llmResult = await askGeminiLegal(pertanyaan, konteksChunks, temperature);
      const totalTime = (Date.now() - t0) / 1000;

      const citations = extractCitations(konteksChunks);

      const responsePayload: QueryResponse = {
        pertanyaan,
        jawaban: llmResult.jawaban,
        mode,
        konteks: konteksChunks,
        waktu_retrieval: Number(retrievalTime.toFixed(3)),
        waktu_llm: Number(llmResult.waktu_llm.toFixed(3)),
        total_waktu: Number(totalTime.toFixed(3)),
        model: llmResult.model,
        status: llmResult.status,
        errorDetails: llmResult.errorDetails,
        citasi: citations,
      };

      res.json(responsePayload);
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      res.status(500).json({
        error: err?.message || 'Terjadi kesalahan pemrosesan konsultasi hukum.',
      });
    }
  });

  // ── 6. Benchmark Evaluation API ──
  app.get('/api/benchmark/gold-standard', (req, res) => {
    try {
      const csvPath = path.join(process.cwd(), 'gold_standard.csv');
      if (fs.existsSync(csvPath)) {
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="gold_standard.csv"');
        res.sendFile(csvPath);
      } else {
        res.status(404).json({ error: 'File gold_standard.csv tidak ditemukan' });
      }
    } catch (err: any) {
      res.status(500).json({ error: err?.message });
    }
  });

  app.post('/api/benchmark/run', async (req, res) => {
    try {
      const includeLlm = req.body?.includeLlmEval !== false;
      const report = await runFullBenchmark(includeLlm);
      res.json({
        success: true,
        ...report,
      });
    } catch (err: any) {
      console.error('Benchmark execution error:', err);
      res.status(500).json({ success: false, error: err?.message || 'Gagal menjalankan evaluasi benchmark' });
    }
  });

  // ── Vite Middleware / Static Serving ──
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();

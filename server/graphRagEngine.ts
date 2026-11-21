import { ChunkItem, KnowledgeGraphData, GraphNode, GraphEdge, RetrievalFilter } from '../src/types';
import { KOMDIGI_CORPUS, CORPUS_EDGES } from '../src/data/komdigiCorpus';

const STOPWORDS = new Set([
  'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'dengan', 'dalam', 'adalah', 'atau',
  'sebagaimana', 'dimaksud', 'ayat', 'pasal', 'huruf', 'angka', 'bab', 'ini', 'itu', 'oleh',
  'dapat', 'tidak', 'akan', 'telah', 'harus', 'wajib', 'sebagai', 'atas', 'terhadap',
  'dilakukan', 'berdasarkan', 'sesuai', 'antara', 'serta', 'bahwa', 'maka', 'setiap', 'paling',
  'apa', 'bagaimana', 'siapa', 'dimana', 'kapan', 'mengapa', 'kenapa', 'berupa', 'bagi',
  'kalo', 'kalau', 'jika', 'bila'
]);

const SYNONYM_MAP: Record<string, string[]> = {
  'isr': ['izin', 'stasiun', 'radio', 'spektrum', 'frekuensi'],
  'ipfr': ['izin', 'pita', 'frekuensi', 'radio'],
  'bhp': ['biaya', 'hak', 'penggunaan', 'pnbp', 'tarif'],
  'tasfri': ['tabel', 'alokasi', 'spektrum', 'frekuensi', 'radio', 'itu'],
  'sdppi': ['sumber', 'daya', 'perangkat', 'pos', 'informatika', 'djid', 'infrastruktur', 'digital'],
  'djid': ['direktorat', 'jenderal', 'infrastruktur', 'digital', 'sdppi', 'spektrum', 'frekuensi'],
  'komdigi': ['komunikasi', 'digital', 'kementerian', 'menteri', 'kominfo'],
  'kominfo': ['komunikasi', 'informatika', 'menteri', 'komdigi'],
  'wifi': ['wlan', 'rlan', 'spektrum', 'frekuensi', '5400', '5800', 'izin', 'kelas'],
  '5400': ['5400', 'frekuensi', 'spektrum', 'radio', 'isr', 'izin', 'dfs', 'tpc'],
  '5400mhz': ['5400', 'mhz', 'frekuensi', 'spektrum', 'radio', 'isr', 'dfs'],
  'pmr': ['pmr', '409', 'private', 'mobile', 'radio', 'walkie', 'talkie', 'izin', 'kelas', '500mw'],
  'pmr409': ['pmr', '409', 'private', 'mobile', 'radio', 'izin', 'kelas', '500mw', 'srd', 'short', 'range'],
  '409': ['409', 'pmr', 'private', 'mobile', 'radio', 'izin', 'kelas', '500mw'],
  'krap': ['krap', 'komunikasi', 'radio', 'antar', 'penduduk', 'ikrap', 'rapi', 'amatir'],
  'ikrap': ['izin', 'komunikasi', 'radio', 'antar', 'penduduk', 'krap'],
  'srd': ['srd', 'short', 'range', 'device', 'daya', 'rendah', 'izin', 'kelas'],
  'ipp': ['izin', 'penyelenggaraan', 'penyiaran', 'komunitas', 'lpk'],
  'lpk': ['lembaga', 'penyiaran', 'komunitas', 'ipp', 'siaran'],
  'denda': ['sanksi', 'pidana', 'administratif', 'denda', 'keterlambatan', 'teguran'],
  'sanksi': ['pidana', 'penjara', 'denda', 'teguran', 'pencabutan', 'sanksi', 'administratif'],
  'interferensi': ['harmful', 'interference', 'gangguan', 'merugikan', 'frekuensi'],
};

export function expandQuery(query: string): string {
  let expanded = (query || '').toLowerCase();
  for (const [key, synonyms] of Object.entries(SYNONYM_MAP)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    if (regex.test(expanded)) {
      expanded += ' ' + synonyms.join(' ');
    }
  }
  return expanded;
}

export function tokenize(text: string): string[] {
  const normalized = (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ');
  
  const tokens = normalized
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w));

  const expandedTokens = [...tokens];
  for (const t of tokens) {
    if (SYNONYM_MAP[t]) {
      for (const syn of SYNONYM_MAP[t]) {
        if (!expandedTokens.includes(syn)) {
          expandedTokens.push(syn);
        }
      }
    }
  }

  return expandedTokens;
}

// BM25 Sparse Scorer
class BM25Engine {
  private docs: string[][];
  private docLengths: number[];
  private avgDocLength: number;
  private df: Map<string, number>;
  private idf: Map<string, number>;
  private k1: number = 1.5;
  private b: number = 0.75;

  constructor(corpus: ChunkItem[]) {
    this.docs = corpus.map(item =>
      tokenize(`${item.nama_dokumen} ${item.nama_bab || ''} Pasal ${item.pasal} ${item.isi} ${item.kata_kunci || ''} ${item.entitas || ''}`)
    );
    this.docLengths = this.docs.map(d => d.length);
    this.avgDocLength = this.docLengths.reduce((a, b) => a + b, 0) / (this.docLengths.length || 1);
    this.df = new Map();
    this.idf = new Map();

    const N = this.docs.length;
    for (const doc of this.docs) {
      const uniqueWords = new Set(doc);
      for (const word of uniqueWords) {
        this.df.set(word, (this.df.get(word) || 0) + 1);
      }
    }

    for (const [word, count] of this.df.entries()) {
      const idfScore = Math.log(1 + (N - count + 0.5) / (count + 0.5));
      this.idf.set(word, idfScore);
    }
  }

  public score(queryTokens: string[]): number[] {
    return this.docs.map((doc, docIdx) => {
      const docLen = this.docLengths[docIdx];
      const termFreqs = new Map<string, number>();
      for (const t of doc) {
        termFreqs.set(t, (termFreqs.get(t) || 0) + 1);
      }

      let score = 0;
      for (const qToken of queryTokens) {
        if (!this.idf.has(qToken)) continue;
        const tf = termFreqs.get(qToken) || 0;
        if (tf === 0) continue;
        const idfVal = this.idf.get(qToken) || 0;
        const numerator = tf * (this.k1 + 1);
        const denominator = tf + this.k1 * (1 - this.b + this.b * (docLen / this.avgDocLength));
        score += idfVal * (numerator / denominator);
      }
      return score;
    });
  }
}

const bm25Engine = new BM25Engine(KOMDIGI_CORPUS);

// Dense matching simulator (n-gram + semantic overlap + positional boosting)
function calculateDenseScore(query: string, item: ChunkItem): number {
  const qTokens = tokenize(query);
  const targetText = `${item.nama_dokumen} ${item.nama_bab || ''} Pasal ${item.pasal} ${item.isi} ${item.kata_kunci || ''} ${item.entitas || ''}`.toLowerCase();
  
  if (qTokens.length === 0) return 0;
  let matchCount = 0;
  let exactMatchBonus = 0;

  for (const token of qTokens) {
    if (targetText.includes(token)) {
      matchCount++;
      if (item.kata_kunci?.toLowerCase().includes(token)) {
        exactMatchBonus += 0.2;
      }
      if (item.isi.toLowerCase().includes(token)) {
        exactMatchBonus += 0.15;
      }
    }
  }

  // Check phrase/substring occurrences
  const queryLower = query.toLowerCase();
  if (item.isi.toLowerCase().includes(queryLower)) {
    exactMatchBonus += 0.5;
  }

  const baseScore = (matchCount / qTokens.length) * 0.7 + Math.min(exactMatchBonus, 0.3);
  return Math.min(Math.max(baseScore, 0), 1);
}

// Filter metadata
export function applyMetadataFilter(corpus: ChunkItem[], filter?: RetrievalFilter): ChunkItem[] {
  if (!filter) return corpus;
  return corpus.filter(item => {
    if (filter.jenis && item.jenis.toLowerCase() !== filter.jenis.toLowerCase()) {
      return false;
    }
    if (filter.tahunMin && item.tahun < filter.tahunMin) {
      return false;
    }
    if (filter.tahunMax && item.tahun > filter.tahunMax) {
      return false;
    }
    if (filter.tipe && filter.tipe.length > 0 && !filter.tipe.includes(item.tipe)) {
      return false;
    }
    if (filter.doc_id && item.doc_id.toLowerCase() !== filter.doc_id.toLowerCase()) {
      return false;
    }
    if (filter.entitas && !item.entitas?.toLowerCase().includes(filter.entitas.toLowerCase())) {
      return false;
    }
    if (filter.kata_kunci && !item.kata_kunci?.toLowerCase().includes(filter.kata_kunci.toLowerCase())) {
      return false;
    }
    return true;
  });
}

// Build Graph Structure in Memory
interface GraphNetwork {
  nodes: Map<string, GraphNode>;
  adjOut: Map<string, { to: string; rel: string }[]>;
  adjIn: Map<string, { from: string; rel: string }[]>;
}

function buildGraph(): GraphNetwork {
  const nodes = new Map<string, GraphNode>();
  const adjOut = new Map<string, { to: string; rel: string }[]>();
  const adjIn = new Map<string, { from: string; rel: string }[]>();

  function addEdge(from: string, to: string, rel: string) {
    if (!adjOut.has(from)) adjOut.set(from, []);
    if (!adjIn.has(to)) adjIn.set(to, []);
    adjOut.get(from)!.push({ to, rel });
    adjIn.get(to)!.push({ from, rel });
  }

  // 1. Documents, Babs, Pasals, Chunks
  for (const c of KOMDIGI_CORPUS) {
    const docId = c.doc_id;
    const babId = `${c.doc_id}::${c.bab || 'BAB'}`;
    const pasalId = `${c.doc_id}::P${c.pasal}`;
    const chunkId = c.chunk_id;

    if (!nodes.has(docId)) {
      nodes.set(docId, { id: docId, label: c.nama_dokumen, tipe: 'dokumen', jenis: c.jenis, tahun: c.tahun, doc_id: docId });
    }
    if (!nodes.has(babId)) {
      nodes.set(babId, { id: babId, label: c.nama_bab || c.bab || 'BAB', tipe: 'bab', doc_id: docId });
      addEdge(docId, babId, 'memuat');
    }
    if (!nodes.has(pasalId)) {
      nodes.set(pasalId, { id: pasalId, label: `Pasal ${c.pasal}`, tipe: 'pasal', pasal: c.pasal, doc_id: docId });
      addEdge(babId, pasalId, 'memuat');
    }
    if (!nodes.has(chunkId)) {
      nodes.set(chunkId, { id: chunkId, label: `${c.nama_dokumen} P${c.pasal}${c.ayat ? ` a${c.ayat}` : ''}`, tipe: 'satuan', norma: c.tipe, pasal: c.pasal, doc_id: docId });
      addEdge(pasalId, chunkId, 'memuat');
    }

    // Entities
    if (c.entitas) {
      const ents = c.entitas.split(',').map(e => e.trim()).filter(Boolean);
      for (const ent of ents) {
        const entId = `ENT::${ent}`;
        if (!nodes.has(entId)) {
          nodes.set(entId, { id: entId, label: ent, tipe: 'entitas' });
        }
        addEdge(chunkId, entId, 'menyebut');
      }
    }
  }

  // Cross references from CORPUS_EDGES
  for (const e of CORPUS_EDGES) {
    addEdge(e.from, e.to, e.rel);
  }

  return { nodes, adjOut, adjIn };
}

const memoryGraph = buildGraph();

export function getFullKnowledgeGraphData(): KnowledgeGraphData {
  const nodesList: GraphNode[] = [];
  const edgesList: GraphEdge[] = [];
  const byType: Record<string, number> = { dokumen: 0, bab: 0, pasal: 0, satuan: 0, entitas: 0 };
  const byRel: Record<string, number> = { memuat: 0, merujuk: 0, merujuk_dokumen: 0, menyebut: 0 };

  const degreeCount = new Map<string, number>();

  for (const [id, n] of memoryGraph.nodes.entries()) {
    const outs = memoryGraph.adjOut.get(id)?.length || 0;
    const ins = memoryGraph.adjIn.get(id)?.length || 0;
    const deg = outs + ins;
    degreeCount.set(id, deg);

    nodesList.push({ ...n, derajat: deg });
    byType[n.tipe] = (byType[n.tipe] || 0) + 1;
  }

  for (const [from, outList] of memoryGraph.adjOut.entries()) {
    for (const item of outList) {
      edgesList.push({ from, to: item.to, rel: item.rel as any, label: item.rel });
      byRel[item.rel] = (byRel[item.rel] || 0) + 1;
    }
  }

  const topHubs = Array.from(degreeCount.entries())
    .map(([id, degree]) => ({ id, label: memoryGraph.nodes.get(id)?.label || id, degree }))
    .sort((a, b) => b.degree - a.degree)
    .slice(0, 10);

  return {
    nodes: nodesList,
    edges: edgesList,
    stats: {
      totalNodes: nodesList.length,
      totalEdges: edgesList.length,
      byType,
      byRel,
      topHubs,
    },
  };
}

// Graph traversal function (perluas_graf)
function expandGraph(seedIds: string[], seedWeights: Map<string, number>, maxPerSeed = 4, decay = 0.5): Map<string, number> {
  const finalScores = new Map<string, number>(seedWeights);

  for (const cid of seedIds) {
    const seedWeight = seedWeights.get(cid) || 1.0;
    const candidates = new Map<string, number>();

    // Step 1: Find parent pasal
    const parents = memoryGraph.adjIn.get(cid) || [];
    for (const p of parents) {
      if (p.rel === 'memuat') {
        const pasalId = p.from;
        // (a) Siblings in same pasal
        const siblings = memoryGraph.adjOut.get(pasalId) || [];
        for (const sib of siblings) {
          if (sib.rel === 'memuat' && sib.to !== cid && sib.to.includes('__')) {
            candidates.set(sib.to, Math.max(candidates.get(sib.to) || 0, 1.0));
          }
        }

        // (b) Cross-referenced pasals
        const outRefs = memoryGraph.adjOut.get(pasalId) || [];
        for (const ref of outRefs) {
          if (ref.rel === 'merujuk') {
            const targetPasalUnits = memoryGraph.adjOut.get(ref.to) || [];
            for (const unit of targetPasalUnits) {
              if (unit.rel === 'memuat') {
                candidates.set(unit.to, Math.max(candidates.get(unit.to) || 0, 0.85));
              }
            }
          }
        }

        const inRefs = memoryGraph.adjIn.get(pasalId) || [];
        for (const ref of inRefs) {
          if (ref.rel === 'merujuk') {
            const sourcePasalUnits = memoryGraph.adjOut.get(ref.from) || [];
            for (const unit of sourcePasalUnits) {
              if (unit.rel === 'memuat') {
                candidates.set(unit.to, Math.max(candidates.get(unit.to) || 0, 0.75));
              }
            }
          }
        }
      }
    }

    // (c) Shared Entities
    const entities = memoryGraph.adjOut.get(cid) || [];
    for (const ent of entities) {
      if (ent.rel === 'menyebut') {
        const otherChunks = memoryGraph.adjIn.get(ent.to) || [];
        for (const other of otherChunks) {
          if (other.rel === 'menyebut' && other.from !== cid) {
            candidates.set(other.from, Math.max(candidates.get(other.from) || 0, 0.5));
          }
        }
      }
    }

    // Sort and take top per seed
    const sortedCandidates = Array.from(candidates.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxPerSeed);

    for (const [candId, weight] of sortedCandidates) {
      const addedScore = seedWeight * decay * weight;
      const current = finalScores.get(candId) || 0;
      finalScores.set(candId, Math.max(current, addedScore));
    }
  }

  return finalScores;
}

// Main Retrieval Function
export function retrieveCorpus(
  query: string,
  mode: 'dense' | 'bm25' | 'hybrid' | 'graphrag' = 'graphrag',
  k = 8,
  k_seed = 6,
  filter?: RetrievalFilter
): ChunkItem[] {
  const filteredCorpus = applyMetadataFilter(KOMDIGI_CORPUS, filter);
  if (filteredCorpus.length === 0) return [];

  const qTokens = tokenize(query);

  if (mode === 'bm25') {
    const scores = bm25Engine.score(qTokens);
    const scoredList = KOMDIGI_CORPUS.map((item, idx) => ({
      item,
      score: scores[idx] || 0,
    }))
      .filter(({ item }) => filteredCorpus.some(f => f.chunk_id === item.chunk_id))
      .sort((a, b) => b.score - a.score)
      .slice(0, k);

    return scoredList.map(({ item, score }) => ({
      ...item,
      skor: score,
      asal: 'seed',
    }));
  }

  if (mode === 'dense') {
    const scoredList = filteredCorpus
      .map(item => ({
        item,
        score: calculateDenseScore(query, item),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k);

    return scoredList.map(({ item, score }) => ({
      ...item,
      skor: score,
      asal: 'seed',
    }));
  }

  // Hybrid RRF (Reciprocal Rank Fusion)
  const denseScores = filteredCorpus.map(item => ({
    chunk_id: item.chunk_id,
    score: calculateDenseScore(query, item),
  })).sort((a, b) => b.score - a.score);

  const bmScoresAll = bm25Engine.score(qTokens);
  const bmScores = KOMDIGI_CORPUS
    .map((item, idx) => ({ chunk_id: item.chunk_id, score: bmScoresAll[idx] || 0 }))
    .filter(x => filteredCorpus.some(f => f.chunk_id === x.chunk_id))
    .sort((a, b) => b.score - a.score);

  const rrfK = 60;
  const rrfMap = new Map<string, number>();

  denseScores.slice(0, 50).forEach((item, rank) => {
    rrfMap.set(item.chunk_id, (rrfMap.get(item.chunk_id) || 0) + 1 / (rrfK + rank + 1));
  });

  bmScores.slice(0, 50).forEach((item, rank) => {
    rrfMap.set(item.chunk_id, (rrfMap.get(item.chunk_id) || 0) + 1 / (rrfK + rank + 1));
  });

  const chunkMap = new Map(KOMDIGI_CORPUS.map(c => [c.chunk_id, c]));

  if (mode === 'hybrid') {
    const sortedRRF = Array.from(rrfMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, k);

    return sortedRRF.map(([cid, score]) => ({
      ...chunkMap.get(cid)!,
      skor: score,
      asal: 'seed',
    }));
  }

  // GraphRAG: Seed hybrid + Graph traversal
  const sortedSeeds = Array.from(rrfMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k_seed);

  const maxRRF = sortedSeeds[0]?.[1] || 1;
  const normalizedSeedWeights = new Map<string, number>();
  const seedSet = new Set<string>();

  for (const [cid, s] of sortedSeeds) {
    normalizedSeedWeights.set(cid, s / maxRRF);
    seedSet.add(cid);
  }

  const expandedScores = expandGraph(Array.from(seedSet), normalizedSeedWeights, 4, 0.5);

  const finalRanked = Array.from(expandedScores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k);

  return finalRanked.map(([cid, score]) => {
    const chunk = chunkMap.get(cid) || {
      chunk_id: cid,
      doc_id: cid.split('__')[0] || 'DOK',
      nama_dokumen: 'Regulasi Terkait',
      jenis: 'UU',
      tahun: 2024,
      nomor: '1',
      pasal: cid.replace(/.*__P(\d+).*/, '$1'),
      tipe: 'Ketentuan',
      isi: 'Satuan regulasi terhubung dalam grafik pengetahuan.',
    } as ChunkItem;

    return {
      ...chunk,
      skor: Number(score.toFixed(4)),
      asal: seedSet.has(cid) ? 'seed' : 'graf',
    };
  });
}

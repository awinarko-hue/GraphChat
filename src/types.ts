export type NormaType =
  | 'Ketentuan'
  | 'Kewajiban'
  | 'Sanksi'
  | 'Larangan'
  | 'Hak'
  | 'Definisi'
  | 'Prinsip'
  | 'Lainnya';

export type JenisDokumen =
  | 'UU'
  | 'PP'
  | 'Permen'
  | 'Perppu'
  | 'Perpres';

export interface ChunkItem {
  chunk_id: string;
  doc_id: string;
  nama_dokumen: string;
  jenis: JenisDokumen;
  tahun: number;
  nomor: string;
  bab?: string;
  nama_bab?: string;
  bagian?: string;
  paragraf?: string;
  pasal: string;
  ayat?: string;
  huruf?: string;
  angka?: string;
  tipe: NormaType;
  isi: string;
  referensi?: string;
  kata_kunci?: string;
  entitas?: string;
  sumber_file?: string;
  skor?: number;
  asal?: 'seed' | 'graf';
}

export interface GraphNode {
  id: string;
  label: string;
  tipe: 'dokumen' | 'bab' | 'pasal' | 'satuan' | 'entitas';
  jenis?: string;
  tahun?: number;
  norma?: NormaType;
  pasal?: string;
  doc_id?: string;
  derajat?: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  rel: 'memuat' | 'merujuk' | 'merujuk_dokumen' | 'menyebut';
  label?: string;
  title?: string;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  stats: {
    totalNodes: number;
    totalEdges: number;
    byType: Record<string, number>;
    byRel: Record<string, number>;
    topHubs: { id: string; label: string; degree: number }[];
  };
}

export interface RetrievalFilter {
  jenis?: string;
  tahunMin?: number;
  tahunMax?: number;
  tipe?: NormaType[];
  entitas?: string;
  kata_kunci?: string;
  doc_id?: string;
}

export type RetrievalMode = 'dense' | 'bm25' | 'hybrid' | 'graphrag';

export interface QueryRequest {
  pertanyaan: string;
  mode?: RetrievalMode;
  k?: number;
  k_seed?: number;
  filter?: RetrievalFilter;
  temperature?: number;
}

export interface CitationItem {
  nama_dokumen: string;
  pasal: string;
  ayat?: string;
  isi: string;
  tipe: NormaType;
  chunk_id: string;
  asal?: 'seed' | 'graf';
  skor?: number;
}

export interface QueryResponse {
  pertanyaan: string;
  jawaban: string;
  mode: RetrievalMode;
  konteks: ChunkItem[];
  waktu_retrieval: number;
  waktu_llm: number;
  total_waktu: number;
  model: string;
  status: 'success' | 'fallback' | 'error';
  errorDetails?: string;
  citasi: CitationItem[];
}

export interface DiagnosticResult {
  hasGeminiKey: boolean;
  modelName: string;
  activeSdk: string;
  apiStatus: 'online' | 'missing_key' | 'rate_limited' | 'error';
  latencyMs: number;
  sampleResponse?: string;
  colabFixSnippet: {
    pythonModernSdk: string;
    envSetup: string;
    errorAnalysis: string;
  };
}

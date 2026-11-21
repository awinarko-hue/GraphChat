export interface BenchmarkTestCase {
  id: string;
  kategori: string;
  pertanyaan: string;
  ground_truth_chunks: string[];
  ground_truth_pasal_labels: string[];
  keterangan: string;
}

/**
 * 46 Kasus Uji Standar Resmi dari gold_standard.csv
 * Menguji metrik Information Retrieval (Hit@k, Precision@k, Recall@k, MRR)
 * dan metrik RAGAS (Faithfulness, Answer Relevance, Context Precision).
 */
export const BENCHMARK_TEST_SET: BenchmarkTestCase[] = [
  {
    "id": "TC-01",
    "kategori": "Sanksi & Penegakan Hukum",
    "pertanyaan": "Apa sanksi bagi penyelenggara telekomunikasi tanpa izin?",
    "ground_truth_chunks": [
      "UU_36_1999__P47__0",
      "UU_36_1999__P11__a1",
      "UU_6_2023__P71__a1__1",
      "PP_52_2000__P2__0",
      "PP_28_2025__P2__a1",
      "PP_28_2025__P172__0",
      "PP_28_2025__P173__0"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 47",
      "UU 36/1999 Pasal 11 ayat (1)",
      "UU 6/2023 Pasal 71 ayat (1)",
      "PP 52/2000 Pasal 2",
      "PP 28/2025 Pasal 2 ayat (1)",
      "PP 28/2025 Pasal 172",
      "PP 28/2025 Pasal 173"
    ],
    "keterangan": "Gold standard case 1: UU 36/1999 Pasal 47; UU 36/1999 Pasal 11 ayat (1)"
  },
  {
    "id": "TC-02",
    "kategori": "Spektrum & Telekomunikasi",
    "pertanyaan": "Bagaimana pengaturan penggunaan spektrum frekuensi radio?",
    "ground_truth_chunks": [
      "UU_36_1999__P33__a1",
      "UU_36_1999__P33__a2",
      "UU_36_1999__P33__a3",
      "UU_36_1999__P33__a4",
      "UU_6_2023__P33__a1__10",
      "UU_6_2023__P33__a2__3",
      "UU_6_2023__P33__a3__8",
      "UU_6_2023__P33__a8",
      "PP_53_2000__P17__a1",
      "PP_53_2000__P17__a2",
      "PP_46_2021__P45__a1",
      "PP_46_2021__P45__a3"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 33 ayat (1)",
      "UU 36/1999 Pasal 33 ayat (2)",
      "UU 36/1999 Pasal 33 ayat (3)",
      "UU 36/1999 Pasal 33 ayat (4)",
      "UU 6/2023 Pasal 33 ayat (1)",
      "UU 6/2023 Pasal 33 ayat (2)",
      "UU 6/2023 Pasal 33 ayat (3)",
      "UU 6/2023 Pasal 33 ayat (8)",
      "PP 53/2000 Pasal 17 ayat (1)",
      "PP 53/2000 Pasal 17 ayat (2)",
      "PP 46/2021 Pasal 45 ayat (1)",
      "PP 46/2021 Pasal 45 ayat (3)"
    ],
    "keterangan": "Gold standard case 2: UU 36/1999 Pasal 33 ayat (1); UU 36/1999 Pasal 33 ayat (2)"
  },
  {
    "id": "TC-03",
    "kategori": "Spektrum & Telekomunikasi",
    "pertanyaan": "Apa saja jenis izin penggunaan spektrum frekuensi radio?",
    "ground_truth_chunks": [
      "PP_46_2021__P45__a1",
      "Permen_9_2023__P1__n6",
      "Permen_9_2023__P1__n7",
      "Permen_2_2023__P1__n4",
      "Permen_2_2023__P1__n5",
      "PP_53_2000__P17__a2"
    ],
    "ground_truth_pasal_labels": [
      "PP 46/2021 Pasal 45 ayat (1)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 1 angka 6",
      "Permen Kominfo/Komdigi 9/2023 Pasal 1 angka 7",
      "Permen Kominfo/Komdigi 2/2023 Pasal 1 angka 4",
      "Permen Kominfo/Komdigi 2/2023 Pasal 1 angka 5",
      "PP 53/2000 Pasal 17 ayat (2)"
    ],
    "keterangan": "Gold standard case 3: PP 46/2021 Pasal 45 ayat (1); Permen Kominfo/Komdigi 9/2023 Pasal 1 angka 6"
  },
  {
    "id": "TC-04",
    "kategori": "Spektrum & Telekomunikasi",
    "pertanyaan": "Berapa lama masa berlaku Izin Pita Frekuensi Radio (IPFR) dan Izin Stasiun Radio (ISR)?",
    "ground_truth_chunks": [
      "PP_46_2021__P46__a1",
      "PP_46_2021__P46__a2",
      "PP_46_2021__P47__a1",
      "PP_53_2000__P23__a1",
      "PP_53_2000__P23__a2"
    ],
    "ground_truth_pasal_labels": [
      "PP 46/2021 Pasal 46 ayat (1)",
      "PP 46/2021 Pasal 46 ayat (2)",
      "PP 46/2021 Pasal 47 ayat (1)",
      "PP 53/2000 Pasal 23 ayat (1)",
      "PP 53/2000 Pasal 23 ayat (2)"
    ],
    "keterangan": "Gold standard case 4: PP 46/2021 Pasal 46 ayat (1); PP 46/2021 Pasal 46 ayat (2)"
  },
  {
    "id": "TC-05",
    "kategori": "BHP Spektrum Frekuensi",
    "pertanyaan": "Siapa yang wajib membayar Biaya Hak Penggunaan (BHP) spektrum frekuensi radio?",
    "ground_truth_chunks": [
      "UU_36_1999__P34__a1",
      "UU_6_2023__P34__a1__5",
      "PP_46_2021__P59__a1",
      "PP_53_2000__P29__a1",
      "PP_53_2000__P29__a3",
      "PP_53_2000__P29__a4",
      "Permen_9_2023__P1__n10"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 34 ayat (1)",
      "UU 6/2023 Pasal 34 ayat (1)",
      "PP 46/2021 Pasal 59 ayat (1)",
      "PP 53/2000 Pasal 29 ayat (1)",
      "PP 53/2000 Pasal 29 ayat (3)",
      "PP 53/2000 Pasal 29 ayat (4)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 1 angka 10"
    ],
    "keterangan": "Gold standard case 5: UU 36/1999 Pasal 34 ayat (1); UU 6/2023 Pasal 34 ayat (1)"
  },
  {
    "id": "TC-06",
    "kategori": "Manajemen Spektrum Frekuensi",
    "pertanyaan": "Bagaimana ketentuan kerja sama penggunaan spektrum frekuensi radio antar penyelenggara telekomunikasi?",
    "ground_truth_chunks": [
      "UU_6_2023__P33__a6__3",
      "UU_6_2023__P33__a6__ha",
      "UU_6_2023__P33__a6__hb",
      "PP_46_2021__P50__a4",
      "PP_46_2021__P50__a5",
      "PP_46_2021__P50__a6",
      "PP_46_2021__P51__a5",
      "PP_46_2021__P52__a1"
    ],
    "ground_truth_pasal_labels": [
      "UU 6/2023 Pasal 33 ayat (6)",
      "UU 6/2023 Pasal 33 ayat (6) huruf a",
      "UU 6/2023 Pasal 33 ayat (6) huruf b",
      "PP 46/2021 Pasal 50 ayat (4)",
      "PP 46/2021 Pasal 50 ayat (5)",
      "PP 46/2021 Pasal 50 ayat (6)",
      "PP 46/2021 Pasal 51 ayat (5)",
      "PP 46/2021 Pasal 52 ayat (1)"
    ],
    "keterangan": "Gold standard case 6: UU 6/2023 Pasal 33 ayat (6); UU 6/2023 Pasal 33 ayat (6) huruf a"
  },
  {
    "id": "TC-07",
    "kategori": "Manajemen Spektrum Frekuensi",
    "pertanyaan": "Bagaimana ketentuan pengalihan hak penggunaan spektrum frekuensi radio?",
    "ground_truth_chunks": [
      "UU_6_2023__P33__a6__hb",
      "PP_46_2021__P55__a3",
      "PP_46_2021__P56__a3",
      "PP_46_2021__P56__a5",
      "PP_46_2021__P56__a6",
      "PP_46_2021__P56__a6__hb",
      "PP_46_2021__P57__a1"
    ],
    "ground_truth_pasal_labels": [
      "UU 6/2023 Pasal 33 ayat (6) huruf b",
      "PP 46/2021 Pasal 55 ayat (3)",
      "PP 46/2021 Pasal 56 ayat (3)",
      "PP 46/2021 Pasal 56 ayat (5)",
      "PP 46/2021 Pasal 56 ayat (6)",
      "PP 46/2021 Pasal 56 ayat (6) huruf b",
      "PP 46/2021 Pasal 57 ayat (1)"
    ],
    "keterangan": "Gold standard case 7: UU 6/2023 Pasal 33 ayat (6) huruf b; PP 46/2021 Pasal 55 ayat (3)"
  },
  {
    "id": "TC-08",
    "kategori": "Sanksi & Penegakan Hukum",
    "pertanyaan": "Apa sanksi bagi penggunaan spektrum frekuensi radio tanpa izin?",
    "ground_truth_chunks": [
      "UU_36_1999__P53__a1",
      "UU_36_1999__P53__a2",
      "UU_36_1999__P33__a1",
      "PP_28_2025__P486__a1",
      "PP_28_2025__P486__a1__ha",
      "PP_28_2025__P486__a1__hb",
      "PP_28_2025__P486__a3",
      "Permen_9_2023__P62__ha",
      "Permen_9_2023__P63__a1__ha"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 53 ayat (1)",
      "UU 36/1999 Pasal 53 ayat (2)",
      "UU 36/1999 Pasal 33 ayat (1)",
      "PP 28/2025 Pasal 486 ayat (1)",
      "PP 28/2025 Pasal 486 ayat (1) huruf a",
      "PP 28/2025 Pasal 486 ayat (1) huruf b",
      "PP 28/2025 Pasal 486 ayat (3)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 62 huruf a",
      "Permen Kominfo/Komdigi 9/2023 Pasal 63 ayat (1) huruf a"
    ],
    "keterangan": "Gold standard case 8: UU 36/1999 Pasal 53 ayat (1); UU 36/1999 Pasal 53 ayat (2)"
  },
  {
    "id": "TC-09",
    "kategori": "Manajemen Spektrum Frekuensi",
    "pertanyaan": "Bagaimana ketentuan penggunaan bersama spektrum frekuensi radio?",
    "ground_truth_chunks": [
      "UU_6_2023__P33__a5__2",
      "PP_46_2021__P49__a1",
      "PP_46_2021__P49__a2__1",
      "PP_46_2021__P49__a3",
      "PP_53_2000__P14__a1",
      "PP_53_2000__P14__a3",
      "PP_53_2000__P14__a4",
      "PP_53_2000__P16__0",
      "PP_53_2000__P30"
    ],
    "ground_truth_pasal_labels": [
      "UU 6/2023 Pasal 33 ayat (5)",
      "PP 46/2021 Pasal 49 ayat (1)",
      "PP 46/2021 Pasal 49 ayat (2)",
      "PP 46/2021 Pasal 49 ayat (3)",
      "PP 53/2000 Pasal 14 ayat (1)",
      "PP 53/2000 Pasal 14 ayat (3)",
      "PP 53/2000 Pasal 14 ayat (4)",
      "PP 53/2000 Pasal 16",
      "PP 53/2000 Pasal 30"
    ],
    "keterangan": "Gold standard case 9: UU 6/2023 Pasal 33 ayat (5); PP 46/2021 Pasal 49 ayat (1)"
  },
  {
    "id": "TC-10",
    "kategori": "Manajemen Spektrum Frekuensi",
    "pertanyaan": "Bagaimana ketentuan optimalisasi dan realokasi penggunaan spektrum frekuensi radio?",
    "ground_truth_chunks": [
      "UU_6_2023__P33__a4__2",
      "PP_46_2021__P58__a1",
      "PP_46_2021__P58__a1__hc",
      "PP_46_2021__P58__a3__1",
      "PP_53_2000__P27__a1",
      "PP_53_2000__P27__a3",
      "PP_53_2000__P28__0",
      "PP_53_2000__P28__1"
    ],
    "ground_truth_pasal_labels": [
      "UU 6/2023 Pasal 33 ayat (4)",
      "PP 46/2021 Pasal 58 ayat (1)",
      "PP 46/2021 Pasal 58 ayat (1) huruf c",
      "PP 46/2021 Pasal 58 ayat (3)",
      "PP 53/2000 Pasal 27 ayat (1)",
      "PP 53/2000 Pasal 27 ayat (3)",
      "PP 53/2000 Pasal 28"
    ],
    "keterangan": "Gold standard case 10: UU 6/2023 Pasal 33 ayat (4); PP 46/2021 Pasal 58 ayat (1)"
  },
  {
    "id": "TC-11",
    "kategori": "Manajemen Spektrum Frekuensi",
    "pertanyaan": "Apa saja alasan pencabutan atau pengakhiran izin penggunaan spektrum frekuensi radio?",
    "ground_truth_chunks": [
      "PP_46_2021__P63__a1",
      "PP_46_2021__P63__a1__ha",
      "PP_46_2021__P63__a1__hb",
      "PP_46_2021__P63__a3",
      "PP_46_2021__P64__a1",
      "PP_46_2021__P64__a1__hb",
      "PP_46_2021__P64__a1__he",
      "PP_46_2021__P64__a1__hf",
      "PP_46_2021__P64__a1__hh",
      "PP_46_2021__P65__a1",
      "UU_6_2023__P33__a4__2"
    ],
    "ground_truth_pasal_labels": [
      "PP 46/2021 Pasal 63 ayat (1)",
      "PP 46/2021 Pasal 63 ayat (1) huruf a",
      "PP 46/2021 Pasal 63 ayat (1) huruf b",
      "PP 46/2021 Pasal 63 ayat (3)",
      "PP 46/2021 Pasal 64 ayat (1)",
      "PP 46/2021 Pasal 64 ayat (1) huruf b",
      "PP 46/2021 Pasal 64 ayat (1) huruf e",
      "PP 46/2021 Pasal 64 ayat (1) huruf f",
      "PP 46/2021 Pasal 64 ayat (1) huruf h",
      "PP 46/2021 Pasal 65 ayat (1)",
      "UU 6/2023 Pasal 33 ayat (4)"
    ],
    "keterangan": "Gold standard case 11: PP 46/2021 Pasal 63 ayat (1); PP 46/2021 Pasal 63 ayat (1) huruf a"
  },
  {
    "id": "TC-12",
    "kategori": "Alokasi & Perencanaan Spektrum",
    "pertanyaan": "Hal apa saja yang harus diperhatikan dalam perencanaan penggunaan spektrum frekuensi radio?",
    "ground_truth_chunks": [
      "PP_53_2000__P4__0",
      "PP_53_2000__P4__ha",
      "PP_53_2000__P4__hb",
      "PP_53_2000__P4__hc",
      "PP_53_2000__P4__hd__1",
      "PP_53_2000__P4__he",
      "PP_53_2000__P6__0",
      "PP_53_2000__P6__ha",
      "PP_53_2000__P6__hb"
    ],
    "ground_truth_pasal_labels": [
      "PP 53/2000 Pasal 4",
      "PP 53/2000 Pasal 4 huruf a",
      "PP 53/2000 Pasal 4 huruf b",
      "PP 53/2000 Pasal 4 huruf c",
      "PP 53/2000 Pasal 4 huruf d",
      "PP 53/2000 Pasal 4 huruf e",
      "PP 53/2000 Pasal 6",
      "PP 53/2000 Pasal 6 huruf a",
      "PP 53/2000 Pasal 6 huruf b"
    ],
    "keterangan": "Gold standard case 12: PP 53/2000 Pasal 4; PP 53/2000 Pasal 4 huruf a"
  },
  {
    "id": "TC-13",
    "kategori": "Alokasi & Perencanaan Spektrum",
    "pertanyaan": "Apa fungsi Tabel Alokasi Spektrum Frekuensi Radio Indonesia?",
    "ground_truth_chunks": [
      "Permen_8_2026__P1__n3",
      "Permen_8_2026__P2__a1",
      "Permen_8_2026__P2__a2",
      "Permen_8_2026__P2__a4",
      "Permen_8_2026__P3",
      "Permen_8_2026__P3__ha",
      "Permen_8_2026__P3__hb",
      "Permen_8_2026__P3__hc"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 8/2026 Pasal 1 angka 3",
      "Permen Kominfo/Komdigi 8/2026 Pasal 2 ayat (1)",
      "Permen Kominfo/Komdigi 8/2026 Pasal 2 ayat (2)",
      "Permen Kominfo/Komdigi 8/2026 Pasal 2 ayat (4)",
      "Permen Kominfo/Komdigi 8/2026 Pasal 3",
      "Permen Kominfo/Komdigi 8/2026 Pasal 3 huruf a",
      "Permen Kominfo/Komdigi 8/2026 Pasal 3 huruf b",
      "Permen Kominfo/Komdigi 8/2026 Pasal 3 huruf c"
    ],
    "keterangan": "Gold standard case 13: Permen Kominfo/Komdigi 8/2026 Pasal 1 angka 3; Permen Kominfo/Komdigi 8/2026 Pasal 2 ayat (1)"
  },
  {
    "id": "TC-14",
    "kategori": "Manajemen Spektrum Frekuensi",
    "pertanyaan": "Bagaimana pengawasan dan pengendalian penggunaan spektrum frekuensi radio dilakukan?",
    "ground_truth_chunks": [
      "UU_36_1999__P33__a3",
      "UU_6_2023__P33__a8",
      "PP_53_2000__P36__a1",
      "PP_53_2000__P36__a2",
      "PP_53_2000__P3__a2__hg",
      "PP_46_2021__P90__0",
      "Permen_2_2023__P20",
      "Permen_2_2023__P21__a1"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 33 ayat (3)",
      "UU 6/2023 Pasal 33 ayat (8)",
      "PP 53/2000 Pasal 36 ayat (1)",
      "PP 53/2000 Pasal 36 ayat (2)",
      "PP 53/2000 Pasal 3 ayat (2) huruf g",
      "PP 46/2021 Pasal 90",
      "Permen Kominfo/Komdigi 2/2023 Pasal 20",
      "Permen Kominfo/Komdigi 2/2023 Pasal 21 ayat (1)"
    ],
    "keterangan": "Gold standard case 14: UU 36/1999 Pasal 33 ayat (3); UU 6/2023 Pasal 33 ayat (8)"
  },
  {
    "id": "TC-15",
    "kategori": "Manajemen Spektrum Frekuensi",
    "pertanyaan": "Bagaimana pengaturan penggunaan spektrum frekuensi radio untuk keperluan pertahanan dan keamanan negara?",
    "ground_truth_chunks": [
      "PP_53_2000__P11__a1",
      "PP_53_2000__P11__a2__1",
      "PP_53_2000__P11__a3",
      "PP_53_2000__P12__0",
      "PP_53_2000__P13__a1",
      "PP_53_2000__P13__a2",
      "PP_53_2000__P4__he",
      "PP_53_2000__P31__a1__ha"
    ],
    "ground_truth_pasal_labels": [
      "PP 53/2000 Pasal 11 ayat (1)",
      "PP 53/2000 Pasal 11 ayat (2)",
      "PP 53/2000 Pasal 11 ayat (3)",
      "PP 53/2000 Pasal 12",
      "PP 53/2000 Pasal 13 ayat (1)",
      "PP 53/2000 Pasal 13 ayat (2)",
      "PP 53/2000 Pasal 4 huruf e",
      "PP 53/2000 Pasal 31 ayat (1) huruf a"
    ],
    "keterangan": "Gold standard case 15: PP 53/2000 Pasal 11 ayat (1); PP 53/2000 Pasal 11 ayat (2)"
  },
  {
    "id": "TC-16",
    "kategori": "Manajemen Spektrum Frekuensi",
    "pertanyaan": "Bagaimana ketentuan penggunaan spektrum frekuensi radio yang bersifat sementara?",
    "ground_truth_chunks": [
      "PP_53_2000__P19__a1",
      "PP_53_2000__P19__a2",
      "PP_53_2000__P19__a3__1",
      "PP_53_2000__P19__a4",
      "PP_53_2000__P20",
      "PP_46_2021__P47__a3__hc"
    ],
    "ground_truth_pasal_labels": [
      "PP 53/2000 Pasal 19 ayat (1)",
      "PP 53/2000 Pasal 19 ayat (2)",
      "PP 53/2000 Pasal 19 ayat (3)",
      "PP 53/2000 Pasal 19 ayat (4)",
      "PP 53/2000 Pasal 20",
      "PP 46/2021 Pasal 47 ayat (3) huruf c"
    ],
    "keterangan": "Gold standard case 16: PP 53/2000 Pasal 19 ayat (1); PP 53/2000 Pasal 19 ayat (2)"
  },
  {
    "id": "TC-17",
    "kategori": "Orbit Satelit",
    "pertanyaan": "Bagaimana ketentuan biaya hak penggunaan orbit satelit?",
    "ground_truth_chunks": [
      "PP_53_2000__P35__a1",
      "PP_53_2000__P35__a2",
      "PP_53_2000__P35__a3",
      "PP_53_2000__P35__a4",
      "PP_53_2000__P35__a5",
      "PP_53_2000__P1__n12",
      "UU_36_1999__P33__a1"
    ],
    "ground_truth_pasal_labels": [
      "PP 53/2000 Pasal 35 ayat (1)",
      "PP 53/2000 Pasal 35 ayat (2)",
      "PP 53/2000 Pasal 35 ayat (3)",
      "PP 53/2000 Pasal 35 ayat (4)",
      "PP 53/2000 Pasal 35 ayat (5)",
      "PP 53/2000 Pasal 1 angka 12",
      "UU 36/1999 Pasal 33 ayat (1)"
    ],
    "keterangan": "Gold standard case 17: PP 53/2000 Pasal 35 ayat (1); PP 53/2000 Pasal 35 ayat (2)"
  },
  {
    "id": "TC-18",
    "kategori": "Amatir Radio & KRAP",
    "pertanyaan": "Apa yang dimaksud dengan Izin Amatir Radio (IAR) dan berapa masa berlakunya?",
    "ground_truth_chunks": [
      "Permen_17_2018__P1__n3",
      "Permen_17_2018__P1__n4",
      "Permen_17_2018__P1__n5",
      "Permen_17_2018__P14__a1",
      "Permen_17_2018__P14__a2",
      "Permen_17_2018__P14__a3"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 17/2018 Pasal 1 angka 3",
      "Permen Kominfo/Komdigi 17/2018 Pasal 1 angka 4",
      "Permen Kominfo/Komdigi 17/2018 Pasal 1 angka 5",
      "Permen Kominfo/Komdigi 17/2018 Pasal 14 ayat (1)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 14 ayat (2)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 14 ayat (3)"
    ],
    "keterangan": "Gold standard case 18: Permen Kominfo/Komdigi 17/2018 Pasal 1 angka 3; Permen Kominfo/Komdigi 17/2018 Pasal 1 angka 4"
  },
  {
    "id": "TC-19",
    "kategori": "Amatir Radio & KRAP",
    "pertanyaan": "Apa saja tingkatan Izin Amatir Radio (IAR)?",
    "ground_truth_chunks": [
      "Permen_17_2018__P10__a1__ha",
      "Permen_17_2018__P10__a1__hb",
      "Permen_17_2018__P10__a1__hc",
      "Permen_17_2018__P11__a1",
      "Permen_17_2018__P11__a2",
      "Permen_17_2018__P50__a2__ha__n1",
      "Permen_17_2018__P50__a2__ha__n2",
      "Permen_17_2018__P50__a2__ha__n3"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 17/2018 Pasal 10 ayat (1) huruf a",
      "Permen Kominfo/Komdigi 17/2018 Pasal 10 ayat (1) huruf b",
      "Permen Kominfo/Komdigi 17/2018 Pasal 10 ayat (1) huruf c",
      "Permen Kominfo/Komdigi 17/2018 Pasal 11 ayat (1)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 11 ayat (2)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (2) huruf a angka 1",
      "Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (2) huruf a angka 2",
      "Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (2) huruf a angka 3"
    ],
    "keterangan": "Gold standard case 19: Permen Kominfo/Komdigi 17/2018 Pasal 10 ayat (1) huruf a; Permen Kominfo/Komdigi 17/2018 Pasal 10 ayat (1) huruf b"
  },
  {
    "id": "TC-20",
    "kategori": "Amatir Radio & KRAP",
    "pertanyaan": "Apa saja larangan penggunaan Stasiun Radio Amatir?",
    "ground_truth_chunks": [
      "Permen_17_2018__P4__a1",
      "Permen_17_2018__P4__a1__ha",
      "Permen_17_2018__P4__a1__hb",
      "Permen_17_2018__P4__a1__hc",
      "Permen_17_2018__P4__a1__hd",
      "Permen_17_2018__P4__a1__he",
      "Permen_17_2018__P4__a1__hf",
      "Permen_17_2018__P4__a1__hg",
      "Permen_17_2018__P4__a1__hh",
      "Permen_17_2018__P4__a1__hi",
      "Permen_17_2018__P4__a1__hj",
      "Permen_17_2018__P4__a2"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf a",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf b",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf c",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf d",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf e",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf f",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf g",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf h",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf i",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf j",
      "Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (2)"
    ],
    "keterangan": "Gold standard case 20: Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1); Permen Kominfo/Komdigi 17/2018 Pasal 4 ayat (1) huruf a"
  },
  {
    "id": "TC-21",
    "kategori": "Amatir Radio & KRAP",
    "pertanyaan": "Apa kewajiban amatir radio dalam mencegah gangguan atau interferensi?",
    "ground_truth_chunks": [
      "Permen_17_2018__P40__a1",
      "Permen_17_2018__P40__a2",
      "Permen_17_2018__P40__a2__ha",
      "Permen_17_2018__P40__a2__hb",
      "Permen_17_2018__P40__a2__hc",
      "Permen_17_2018__P42"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 17/2018 Pasal 40 ayat (1)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 40 ayat (2)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 40 ayat (2) huruf a",
      "Permen Kominfo/Komdigi 17/2018 Pasal 40 ayat (2) huruf b",
      "Permen Kominfo/Komdigi 17/2018 Pasal 40 ayat (2) huruf c",
      "Permen Kominfo/Komdigi 17/2018 Pasal 42"
    ],
    "keterangan": "Gold standard case 21: Permen Kominfo/Komdigi 17/2018 Pasal 40 ayat (1); Permen Kominfo/Komdigi 17/2018 Pasal 40 ayat (2)"
  },
  {
    "id": "TC-22",
    "kategori": "Amatir Radio & KRAP",
    "pertanyaan": "Bagaimana susunan tanda panggilan (call sign) amatir radio?",
    "ground_truth_chunks": [
      "Permen_17_2018__P1__n14",
      "Permen_17_2018__P50__a1",
      "Permen_17_2018__P50__a2",
      "Permen_17_2018__P50__a2__ha",
      "Permen_17_2018__P50__a2__ha__n1",
      "Permen_17_2018__P50__a2__ha__n2",
      "Permen_17_2018__P50__a2__ha__n3",
      "Permen_17_2018__P50__a2__hc",
      "Permen_17_2018__P51__a1",
      "Permen_17_2018__P51__a2"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 17/2018 Pasal 1 angka 14",
      "Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (1)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (2)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (2) huruf a",
      "Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (2) huruf a angka 1",
      "Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (2) huruf a angka 2",
      "Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (2) huruf a angka 3",
      "Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (2) huruf c",
      "Permen Kominfo/Komdigi 17/2018 Pasal 51 ayat (1)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 51 ayat (2)"
    ],
    "keterangan": "Gold standard case 22: Permen Kominfo/Komdigi 17/2018 Pasal 1 angka 14; Permen Kominfo/Komdigi 17/2018 Pasal 50 ayat (1)"
  },
  {
    "id": "TC-23",
    "kategori": "Amatir Radio & KRAP",
    "pertanyaan": "Apa yang dimaksud dengan IKRAP dan berapa masa berlakunya?",
    "ground_truth_chunks": [
      "Permen_17_2018__P1__n8",
      "Permen_17_2018__P2__a4",
      "Permen_17_2018__P58",
      "Permen_17_2018__P59__a1",
      "Permen_17_2018__P59__a2",
      "Permen_17_2018__P59__a3",
      "Permen_17_2018__P60__a2"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 17/2018 Pasal 1 angka 8",
      "Permen Kominfo/Komdigi 17/2018 Pasal 2 ayat (4)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 58",
      "Permen Kominfo/Komdigi 17/2018 Pasal 59 ayat (1)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 59 ayat (2)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 59 ayat (3)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 60 ayat (2)"
    ],
    "keterangan": "Gold standard case 23: Permen Kominfo/Komdigi 17/2018 Pasal 1 angka 8; Permen Kominfo/Komdigi 17/2018 Pasal 2 ayat (4)"
  },
  {
    "id": "TC-24",
    "kategori": "Amatir Radio & KRAP",
    "pertanyaan": "Bagaimana prosedur permohonan IKRAP?",
    "ground_truth_chunks": [
      "Permen_17_2018__P61__a1",
      "Permen_17_2018__P61__a2",
      "Permen_17_2018__P61__a2__ha",
      "Permen_17_2018__P61__a2__hb",
      "Permen_17_2018__P61__a2__hc",
      "Permen_17_2018__P62",
      "Permen_17_2018__P62__ha",
      "Permen_17_2018__P62__hb",
      "Permen_17_2018__P63__a1",
      "Permen_17_2018__P64__a1"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 17/2018 Pasal 61 ayat (1)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 61 ayat (2)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 61 ayat (2) huruf a",
      "Permen Kominfo/Komdigi 17/2018 Pasal 61 ayat (2) huruf b",
      "Permen Kominfo/Komdigi 17/2018 Pasal 61 ayat (2) huruf c",
      "Permen Kominfo/Komdigi 17/2018 Pasal 62",
      "Permen Kominfo/Komdigi 17/2018 Pasal 62 huruf a",
      "Permen Kominfo/Komdigi 17/2018 Pasal 62 huruf b",
      "Permen Kominfo/Komdigi 17/2018 Pasal 63 ayat (1)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 64 ayat (1)"
    ],
    "keterangan": "Gold standard case 24: Permen Kominfo/Komdigi 17/2018 Pasal 61 ayat (1); Permen Kominfo/Komdigi 17/2018 Pasal 61 ayat (2)"
  },
  {
    "id": "TC-25",
    "kategori": "Amatir Radio & KRAP",
    "pertanyaan": "Apa saja larangan bagi Stasiun Radio Antar Penduduk (KRAP)?",
    "ground_truth_chunks": [
      "Permen_17_2018__P57__a1",
      "Permen_17_2018__P57__a1__hd",
      "Permen_17_2018__P57__a2",
      "Permen_17_2018__P57__a3",
      "Permen_17_2018__P74__a3"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 17/2018 Pasal 57 ayat (1)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 57 ayat (1) huruf d",
      "Permen Kominfo/Komdigi 17/2018 Pasal 57 ayat (2)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 57 ayat (3)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 74 ayat (3)"
    ],
    "keterangan": "Gold standard case 25: Permen Kominfo/Komdigi 17/2018 Pasal 57 ayat (1); Permen Kominfo/Komdigi 17/2018 Pasal 57 ayat (1) huruf d"
  },
  {
    "id": "TC-26",
    "kategori": "Amatir Radio & KRAP",
    "pertanyaan": "Bagaimana peran amatir radio dan KRAP dalam keadaan darurat atau bencana?",
    "ground_truth_chunks": [
      "Permen_17_2018__P3__a1__ha",
      "Permen_17_2018__P3__a2",
      "Permen_17_2018__P13__hp",
      "Permen_17_2018__P52__a1__hd__n3",
      "Permen_17_2018__P54__hb",
      "Permen_17_2018__P73__a2__hb__n3",
      "Permen_17_2018__P73__a2__hb__n4",
      "Permen_17_2018__P78__a1__hd"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 17/2018 Pasal 3 ayat (1) huruf a",
      "Permen Kominfo/Komdigi 17/2018 Pasal 3 ayat (2)",
      "Permen Kominfo/Komdigi 17/2018 Pasal 13 huruf p",
      "Permen Kominfo/Komdigi 17/2018 Pasal 52 ayat (1) huruf d angka 3",
      "Permen Kominfo/Komdigi 17/2018 Pasal 54 huruf b",
      "Permen Kominfo/Komdigi 17/2018 Pasal 73 ayat (2) huruf b angka 3",
      "Permen Kominfo/Komdigi 17/2018 Pasal 73 ayat (2) huruf b angka 4",
      "Permen Kominfo/Komdigi 17/2018 Pasal 78 ayat (1) huruf d"
    ],
    "keterangan": "Gold standard case 26: Permen Kominfo/Komdigi 17/2018 Pasal 3 ayat (1) huruf a; Permen Kominfo/Komdigi 17/2018 Pasal 3 ayat (2)"
  },
  {
    "id": "TC-27",
    "kategori": "Izin Kelas & Perangkat",
    "pertanyaan": "Apa yang dimaksud dengan Izin Kelas dan perangkat apa saja yang menggunakannya?",
    "ground_truth_chunks": [
      "Permen_2_2023__P1__n4",
      "Permen_2_2023__P1__n10",
      "Permen_2_2023__P1__n11",
      "Permen_2_2023__P1__n12",
      "Permen_2_2023__P1__n13",
      "Permen_2_2023__P2__a1",
      "Permen_2_2023__P2__a1__hd",
      "Permen_2_2023__P2__a2",
      "Permen_2_2023__P17__a1",
      "PP_46_2021__P62__hf"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 2/2023 Pasal 1 angka 4",
      "Permen Kominfo/Komdigi 2/2023 Pasal 1 angka 10",
      "Permen Kominfo/Komdigi 2/2023 Pasal 1 angka 11",
      "Permen Kominfo/Komdigi 2/2023 Pasal 1 angka 12",
      "Permen Kominfo/Komdigi 2/2023 Pasal 1 angka 13",
      "Permen Kominfo/Komdigi 2/2023 Pasal 2 ayat (1)",
      "Permen Kominfo/Komdigi 2/2023 Pasal 2 ayat (1) huruf d",
      "Permen Kominfo/Komdigi 2/2023 Pasal 2 ayat (2)",
      "Permen Kominfo/Komdigi 2/2023 Pasal 17 ayat (1)",
      "PP 46/2021 Pasal 62 huruf f"
    ],
    "keterangan": "Gold standard case 27: Permen Kominfo/Komdigi 2/2023 Pasal 1 angka 4; Permen Kominfo/Komdigi 2/2023 Pasal 1 angka 10"
  },
  {
    "id": "TC-28",
    "kategori": "Microwave Link",
    "pertanyaan": "Apa yang dimaksud dengan Microwave Link dan bagaimana ketentuan penggunaannya?",
    "ground_truth_chunks": [
      "Permen_8_2024__P1__n9",
      "Permen_8_2024__P5",
      "Permen_8_2024__P9__a1",
      "Permen_8_2024__P10",
      "Permen_8_2024__P11",
      "Permen_8_2024__P13__a1",
      "Permen_8_2024__P18__a1",
      "Permen_8_2024__P19__a1"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 8/2024 Pasal 1 angka 9",
      "Permen Kominfo/Komdigi 8/2024 Pasal 5",
      "Permen Kominfo/Komdigi 8/2024 Pasal 9 ayat (1)",
      "Permen Kominfo/Komdigi 8/2024 Pasal 10",
      "Permen Kominfo/Komdigi 8/2024 Pasal 11",
      "Permen Kominfo/Komdigi 8/2024 Pasal 13 ayat (1)",
      "Permen Kominfo/Komdigi 8/2024 Pasal 18 ayat (1)",
      "Permen Kominfo/Komdigi 8/2024 Pasal 19 ayat (1)"
    ],
    "keterangan": "Gold standard case 28: Permen Kominfo/Komdigi 8/2024 Pasal 1 angka 9; Permen Kominfo/Komdigi 8/2024 Pasal 5"
  },
  {
    "id": "TC-29",
    "kategori": "Microwave Link",
    "pertanyaan": "Bagaimana ketentuan Hak Labuh Microwave Link?",
    "ground_truth_chunks": [
      "Permen_8_2024__P14",
      "Permen_8_2024__P15__a5",
      "Permen_8_2024__P16__a1",
      "Permen_8_2024__P16__a2",
      "Permen_8_2024__P17__a1",
      "Permen_8_2024__P23"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 8/2024 Pasal 14",
      "Permen Kominfo/Komdigi 8/2024 Pasal 15 ayat (5)",
      "Permen Kominfo/Komdigi 8/2024 Pasal 16 ayat (1)",
      "Permen Kominfo/Komdigi 8/2024 Pasal 16 ayat (2)",
      "Permen Kominfo/Komdigi 8/2024 Pasal 17 ayat (1)",
      "Permen Kominfo/Komdigi 8/2024 Pasal 23"
    ],
    "keterangan": "Gold standard case 29: Permen Kominfo/Komdigi 8/2024 Pasal 14; Permen Kominfo/Komdigi 8/2024 Pasal 15 ayat (5)"
  },
  {
    "id": "TC-30",
    "kategori": "BHP Spektrum Frekuensi",
    "pertanyaan": "Bagaimana formula penghitungan BHP IPFR?",
    "ground_truth_chunks": [
      "Permen_9_2023__P5__a4__ha",
      "Permen_9_2023__P6__a1",
      "Permen_9_2023__P6__a2",
      "Permen_9_2023__P7__a1",
      "Permen_9_2023__P8__a1",
      "Permen_9_2023__P9__a1",
      "Permen_9_2023__P10__a1",
      "Permen_9_2023__P11__a1",
      "Permen_9_2023__P15__a1"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 9/2023 Pasal 5 ayat (4) huruf a",
      "Permen Kominfo/Komdigi 9/2023 Pasal 6 ayat (1)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 6 ayat (2)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 7 ayat (1)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 8 ayat (1)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 9 ayat (1)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 10 ayat (1)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 11 ayat (1)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 15 ayat (1)"
    ],
    "keterangan": "Gold standard case 30: Permen Kominfo/Komdigi 9/2023 Pasal 5 ayat (4) huruf a; Permen Kominfo/Komdigi 9/2023 Pasal 6 ayat (1)"
  },
  {
    "id": "TC-31",
    "kategori": "Sanksi & Penegakan Hukum",
    "pertanyaan": "Bagaimana ketentuan denda administratif atas pelanggaran penggunaan spektrum frekuensi radio?",
    "ground_truth_chunks": [
      "Permen_9_2023__P61",
      "Permen_9_2023__P62",
      "Permen_9_2023__P63__a1",
      "Permen_9_2023__P65__a1",
      "Permen_9_2023__P66__a2",
      "Permen_9_2023__P67__a1",
      "Permen_9_2023__P67__a2",
      "Permen_9_2023__P67__a3",
      "PP_28_2025__P487__a1",
      "PP_28_2025__P487__a5"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 9/2023 Pasal 61",
      "Permen Kominfo/Komdigi 9/2023 Pasal 62",
      "Permen Kominfo/Komdigi 9/2023 Pasal 63 ayat (1)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 65 ayat (1)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 66 ayat (2)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 67 ayat (1)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 67 ayat (2)",
      "Permen Kominfo/Komdigi 9/2023 Pasal 67 ayat (3)",
      "PP 28/2025 Pasal 487 ayat (1)",
      "PP 28/2025 Pasal 487 ayat (5)"
    ],
    "keterangan": "Gold standard case 31: Permen Kominfo/Komdigi 9/2023 Pasal 61; Permen Kominfo/Komdigi 9/2023 Pasal 62"
  },
  {
    "id": "TC-32",
    "kategori": "Sertifikasi Perangkat",
    "pertanyaan": "Apa kewajiban sertifikasi alat dan perangkat telekomunikasi?",
    "ground_truth_chunks": [
      "PP_46_2021__P34__a1",
      "PP_46_2021__P34__a2",
      "PP_46_2021__P35__a1",
      "PP_46_2021__P4__a1__2",
      "PP_52_2000__P71__a1",
      "PP_52_2000__P74__a1",
      "PP_52_2000__P77__a1",
      "Permen_2_2025__P1__n8__0",
      "Permen_2_2023__P1__n8"
    ],
    "ground_truth_pasal_labels": [
      "PP 46/2021 Pasal 34 ayat (1)",
      "PP 46/2021 Pasal 34 ayat (2)",
      "PP 46/2021 Pasal 35 ayat (1)",
      "PP 46/2021 Pasal 4 ayat (1)",
      "PP 52/2000 Pasal 71 ayat (1)",
      "PP 52/2000 Pasal 74 ayat (1)",
      "PP 52/2000 Pasal 77 ayat (1)",
      "Permen Kominfo/Komdigi 2/2025 Pasal 1 angka 8",
      "Permen Kominfo/Komdigi 2/2023 Pasal 1 angka 8"
    ],
    "keterangan": "Gold standard case 32: PP 46/2021 Pasal 34 ayat (1); PP 46/2021 Pasal 34 ayat (2)"
  },
  {
    "id": "TC-33",
    "kategori": "Sanksi & Penegakan Hukum",
    "pertanyaan": "Apa sanksi bagi perdagangan atau penggunaan perangkat telekomunikasi yang tidak memenuhi persyaratan teknis atau tidak bersertifikat?",
    "ground_truth_chunks": [
      "UU_36_1999__P52__0",
      "PP_28_2025__P499__a1__2",
      "PP_28_2025__P499__a5",
      "PP_28_2025__P502__a1",
      "PP_28_2025__P502__a3",
      "PP_46_2021__P39__a1__hb"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 52",
      "PP 28/2025 Pasal 499 ayat (1)",
      "PP 28/2025 Pasal 499 ayat (5)",
      "PP 28/2025 Pasal 502 ayat (1)",
      "PP 28/2025 Pasal 502 ayat (3)",
      "PP 46/2021 Pasal 39 ayat (1) huruf b"
    ],
    "keterangan": "Gold standard case 33: UU 36/1999 Pasal 52; PP 28/2025 Pasal 499 ayat (1)"
  },
  {
    "id": "TC-34",
    "kategori": "Sanksi & Penegakan Hukum",
    "pertanyaan": "Apa sanksi bagi perbuatan yang menimbulkan gangguan fisik dan elektromagnetik terhadap penyelenggaraan telekomunikasi?",
    "ground_truth_chunks": [
      "UU_36_1999__P38__0",
      "UU_36_1999__P55",
      "PP_52_2000__P78__ha",
      "PP_52_2000__P78__hb"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 38",
      "UU 36/1999 Pasal 55",
      "PP 52/2000 Pasal 78 huruf a",
      "PP 52/2000 Pasal 78 huruf b"
    ],
    "keterangan": "Gold standard case 34: UU 36/1999 Pasal 38; UU 36/1999 Pasal 55"
  },
  {
    "id": "TC-35",
    "kategori": "Penyelenggaraan Telekomunikasi",
    "pertanyaan": "Apa saja bentuk penyelenggaraan telekomunikasi dan siapa yang dapat menyelenggarakannya?",
    "ground_truth_chunks": [
      "UU_36_1999__P7__a1",
      "UU_36_1999__P7__a1__ha",
      "UU_36_1999__P7__a1__hb",
      "UU_36_1999__P7__a1__hc",
      "UU_36_1999__P8__a1",
      "UU_36_1999__P8__a1__ha",
      "UU_36_1999__P8__a1__hb",
      "UU_36_1999__P8__a1__hc",
      "UU_36_1999__P8__a1__hd",
      "UU_36_1999__P8__a2",
      "UU_36_1999__P8__a2__ha",
      "UU_36_1999__P8__a2__hb",
      "UU_36_1999__P8__a2__hc",
      "PP_52_2000__P3__hc",
      "PP_52_2000__P5"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 7 ayat (1)",
      "UU 36/1999 Pasal 7 ayat (1) huruf a",
      "UU 36/1999 Pasal 7 ayat (1) huruf b",
      "UU 36/1999 Pasal 7 ayat (1) huruf c",
      "UU 36/1999 Pasal 8 ayat (1)",
      "UU 36/1999 Pasal 8 ayat (1) huruf a",
      "UU 36/1999 Pasal 8 ayat (1) huruf b",
      "UU 36/1999 Pasal 8 ayat (1) huruf c",
      "UU 36/1999 Pasal 8 ayat (1) huruf d",
      "UU 36/1999 Pasal 8 ayat (2)",
      "UU 36/1999 Pasal 8 ayat (2) huruf a",
      "UU 36/1999 Pasal 8 ayat (2) huruf b",
      "UU 36/1999 Pasal 8 ayat (2) huruf c",
      "PP 52/2000 Pasal 3 huruf c",
      "PP 52/2000 Pasal 5"
    ],
    "keterangan": "Gold standard case 35: UU 36/1999 Pasal 7 ayat (1); UU 36/1999 Pasal 7 ayat (1) huruf a"
  },
  {
    "id": "TC-36",
    "kategori": "Penyelenggaraan Telekomunikasi",
    "pertanyaan": "Apa yang dimaksud dengan penyelenggaraan telekomunikasi khusus dan untuk keperluan apa saja?",
    "ground_truth_chunks": [
      "UU_36_1999__P1__n9",
      "UU_36_1999__P7",
      "PP_52_2000__P38__0",
      "PP_52_2000__P39__0",
      "PP_52_2000__P40__0",
      "PP_52_2000__P43__a1",
      "PP_52_2000__P44__0",
      "PP_52_2000__P47__a1",
      "PP_52_2000__P46__a1",
      "PP_52_2000__P46__a2"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 1 angka 9",
      "UU 36/1999 Pasal 7",
      "PP 52/2000 Pasal 38",
      "PP 52/2000 Pasal 39",
      "PP 52/2000 Pasal 40",
      "PP 52/2000 Pasal 43 ayat (1)",
      "PP 52/2000 Pasal 44",
      "PP 52/2000 Pasal 47 ayat (1)",
      "PP 52/2000 Pasal 46 ayat (1)",
      "PP 52/2000 Pasal 46 ayat (2)"
    ],
    "keterangan": "Gold standard case 36: UU 36/1999 Pasal 1 angka 9; UU 36/1999 Pasal 7"
  },
  {
    "id": "TC-37",
    "kategori": "Penyelenggaraan Telekomunikasi",
    "pertanyaan": "Bagaimana ketentuan interkoneksi antar penyelenggara jaringan telekomunikasi?",
    "ground_truth_chunks": [
      "UU_36_1999__P25__a1",
      "UU_36_1999__P25__a2",
      "UU_36_1999__P25__a4",
      "PP_52_2000__P20__a1",
      "PP_52_2000__P20__a2",
      "PP_52_2000__P20__a3",
      "PP_52_2000__P21__a1",
      "PP_52_2000__P21__a2",
      "PP_52_2000__P22__a1",
      "PP_52_2000__P22__a2",
      "PP_52_2000__P23__a1",
      "PP_52_2000__P23__a2",
      "PP_52_2000__P23__a3"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 25 ayat (1)",
      "UU 36/1999 Pasal 25 ayat (2)",
      "UU 36/1999 Pasal 25 ayat (4)",
      "PP 52/2000 Pasal 20 ayat (1)",
      "PP 52/2000 Pasal 20 ayat (2)",
      "PP 52/2000 Pasal 20 ayat (3)",
      "PP 52/2000 Pasal 21 ayat (1)",
      "PP 52/2000 Pasal 21 ayat (2)",
      "PP 52/2000 Pasal 22 ayat (1)",
      "PP 52/2000 Pasal 22 ayat (2)",
      "PP 52/2000 Pasal 23 ayat (1)",
      "PP 52/2000 Pasal 23 ayat (2)",
      "PP 52/2000 Pasal 23 ayat (3)"
    ],
    "keterangan": "Gold standard case 37: UU 36/1999 Pasal 25 ayat (1); UU 36/1999 Pasal 25 ayat (2)"
  },
  {
    "id": "TC-38",
    "kategori": "Penyelenggaraan Telekomunikasi",
    "pertanyaan": "Bagaimana pengaturan tarif penyelenggaraan jaringan dan jasa telekomunikasi?",
    "ground_truth_chunks": [
      "UU_36_1999__P27__0",
      "UU_36_1999__P28__0",
      "UU_36_1999__P27__1",
      "UU_36_1999__P28__1",
      "PP_52_2000__P34__a1",
      "PP_52_2000__P34__a2",
      "PP_52_2000__P35__a1",
      "PP_52_2000__P35__a2",
      "PP_52_2000__P35__a3",
      "PP_52_2000__P36__a1"
    ],
    "ground_truth_pasal_labels": [
      "UU 36/1999 Pasal 27",
      "UU 36/1999 Pasal 28",
      "PP 52/2000 Pasal 34 ayat (1)",
      "PP 52/2000 Pasal 34 ayat (2)",
      "PP 52/2000 Pasal 35 ayat (1)",
      "PP 52/2000 Pasal 35 ayat (2)",
      "PP 52/2000 Pasal 35 ayat (3)",
      "PP 52/2000 Pasal 36 ayat (1)"
    ],
    "keterangan": "Gold standard case 38: UU 36/1999 Pasal 27; UU 36/1999 Pasal 28"
  },
  {
    "id": "TC-39",
    "kategori": "Sertifikasi Perangkat",
    "pertanyaan": "Apa kewajiban penyelenggara telekomunikasi terkait standar kualitas layanan?",
    "ground_truth_chunks": [
      "Permen_5_2021__P7__a1",
      "Permen_5_2021__P7__a2",
      "Permen_5_2021__P8",
      "Permen_5_2021__P11__a1",
      "Permen_5_2021__P25__a1",
      "Permen_5_2021__P25__a2",
      "PP_46_2021__P90__a1",
      "PP_46_2021__P90__a2__0",
      "PP_46_2021__P90__a3"
    ],
    "ground_truth_pasal_labels": [
      "Permen Kominfo/Komdigi 5/2021 Pasal 7 ayat (1)",
      "Permen Kominfo/Komdigi 5/2021 Pasal 7 ayat (2)",
      "Permen Kominfo/Komdigi 5/2021 Pasal 8",
      "Permen Kominfo/Komdigi 5/2021 Pasal 11 ayat (1)",
      "Permen Kominfo/Komdigi 5/2021 Pasal 25 ayat (1)",
      "Permen Kominfo/Komdigi 5/2021 Pasal 25 ayat (2)",
      "PP 46/2021 Pasal 90 ayat (1)",
      "PP 46/2021 Pasal 90 ayat (2)",
      "PP 46/2021 Pasal 90 ayat (3)"
    ],
    "keterangan": "Gold standard case 39: Permen Kominfo/Komdigi 5/2021 Pasal 7 ayat (1); Permen Kominfo/Komdigi 5/2021 Pasal 7 ayat (2)"
  },
  {
    "id": "TC-40",
    "kategori": "Penyiaran & Komunitas",
    "pertanyaan": "Bagaimana ketentuan izin penyelenggaraan penyiaran dan masa berlakunya?",
    "ground_truth_chunks": [
      "UU_32_2002__P1__n14",
      "UU_32_2002__P33__a1",
      "UU_32_2002__P33__a3",
      "UU_32_2002__P33__a4",
      "UU_32_2002__P33__a4__hd__1",
      "UU_32_2002__P33__a5",
      "UU_32_2002__P33__a7",
      "UU_32_2002__P34__a1",
      "UU_32_2002__P34__a1__ha",
      "UU_32_2002__P34__a1__hb",
      "UU_32_2002__P34__a4",
      "UU_32_2002__P34__a5",
      "UU_32_2002__P34__a5__hb"
    ],
    "ground_truth_pasal_labels": [
      "UU 32/2002 Pasal 1 angka 14",
      "UU 32/2002 Pasal 33 ayat (1)",
      "UU 32/2002 Pasal 33 ayat (3)",
      "UU 32/2002 Pasal 33 ayat (4)",
      "UU 32/2002 Pasal 33 ayat (4) huruf d",
      "UU 32/2002 Pasal 33 ayat (5)",
      "UU 32/2002 Pasal 33 ayat (7)",
      "UU 32/2002 Pasal 34 ayat (1)",
      "UU 32/2002 Pasal 34 ayat (1) huruf a",
      "UU 32/2002 Pasal 34 ayat (1) huruf b",
      "UU 32/2002 Pasal 34 ayat (4)",
      "UU 32/2002 Pasal 34 ayat (5)",
      "UU 32/2002 Pasal 34 ayat (5) huruf b"
    ],
    "keterangan": "Gold standard case 40: UU 32/2002 Pasal 1 angka 14; UU 32/2002 Pasal 33 ayat (1)"
  },
  {
    "id": "TC-41",
    "kategori": "Sanksi & Penegakan Hukum",
    "pertanyaan": "Apa sanksi pidana bagi lembaga penyiaran yang menyelenggarakan penyiaran tanpa izin?",
    "ground_truth_chunks": [
      "UU_32_2002__P33__a1",
      "UU_32_2002__P58__0",
      "UU_32_2002__P57__0",
      "UU_6_2023__P58__a1__2",
      "Perppu_2_2022__P58__a1__2"
    ],
    "ground_truth_pasal_labels": [
      "UU 32/2002 Pasal 33 ayat (1)",
      "UU 32/2002 Pasal 58",
      "UU 32/2002 Pasal 57",
      "UU 6/2023 Pasal 58 ayat (1)",
      "Perppu 2/2022 Pasal 58 ayat (1)"
    ],
    "keterangan": "Gold standard case 41: UU 32/2002 Pasal 33 ayat (1); UU 32/2002 Pasal 58"
  },
  {
    "id": "TC-42",
    "kategori": "Penyiaran & Komunitas",
    "pertanyaan": "Apa yang dimaksud dengan Lembaga Penyiaran Komunitas dan apa larangannya?",
    "ground_truth_chunks": [
      "UU_32_2002__P21__a1__0",
      "UU_32_2002__P21__a3",
      "UU_32_2002__P22__a1",
      "UU_32_2002__P22__a2",
      "UU_32_2002__P23__a1",
      "UU_32_2002__P23__a2",
      "UU_32_2002__P24__a1",
      "UU_32_2002__P24__a2"
    ],
    "ground_truth_pasal_labels": [
      "UU 32/2002 Pasal 21 ayat (1)",
      "UU 32/2002 Pasal 21 ayat (3)",
      "UU 32/2002 Pasal 22 ayat (1)",
      "UU 32/2002 Pasal 22 ayat (2)",
      "UU 32/2002 Pasal 23 ayat (1)",
      "UU 32/2002 Pasal 23 ayat (2)",
      "UU 32/2002 Pasal 24 ayat (1)",
      "UU 32/2002 Pasal 24 ayat (2)"
    ],
    "keterangan": "Gold standard case 42: UU 32/2002 Pasal 21 ayat (1); UU 32/2002 Pasal 21 ayat (3)"
  },
  {
    "id": "TC-43",
    "kategori": "Penyiaran & Komunitas",
    "pertanyaan": "Bagaimana penguasaan negara atas spektrum frekuensi radio untuk penyiaran?",
    "ground_truth_chunks": [
      "UU_32_2002__P1__n2",
      "UU_32_2002__P1__n8__1",
      "UU_32_2002__P6__a1__1",
      "UU_32_2002__P33__a4__hd__1",
      "UU_36_1999__P4__a1",
      "Perppu_2_2022__P60A"
    ],
    "ground_truth_pasal_labels": [
      "UU 32/2002 Pasal 1 angka 2",
      "UU 32/2002 Pasal 1 angka 8",
      "UU 32/2002 Pasal 6 ayat (1)",
      "UU 32/2002 Pasal 33 ayat (4) huruf d",
      "UU 36/1999 Pasal 4 ayat (1)",
      "Perppu 2/2022 Pasal 60A"
    ],
    "keterangan": "Gold standard case 43: UU 32/2002 Pasal 1 angka 2; UU 32/2002 Pasal 1 angka 8"
  },
  {
    "id": "TC-44",
    "kategori": "Sanksi & Penegakan Hukum",
    "pertanyaan": "Apa sanksi pidana bagi penyelenggara pos yang melanggar ketentuan perizinan?",
    "ground_truth_chunks": [
      "UU_38_2009__P42__0",
      "UU_38_2009__P47__a1"
    ],
    "ground_truth_pasal_labels": [
      "UU 38/2009 Pasal 42",
      "UU 38/2009 Pasal 47 ayat (1)"
    ],
    "keterangan": "Gold standard case 44: UU 38/2009 Pasal 42; UU 38/2009 Pasal 47 ayat (1)"
  },
  {
    "id": "TC-45",
    "kategori": "Kelembagaan & Regulasi",
    "pertanyaan": "Apa tugas dan fungsi Kementerian Komunikasi dan Digital?",
    "ground_truth_chunks": [
      "Perpres_174_2024__P5",
      "Perpres_174_2024__P6",
      "Perpres_174_2024__P6__hc",
      "Perpres_174_2024__P6__he",
      "Perpres_174_2024__P6__hf",
      "Perpres_174_2024__P12",
      "Perpres_174_2024__P13"
    ],
    "ground_truth_pasal_labels": [
      "Perpres 174/2024 Pasal 5",
      "Perpres 174/2024 Pasal 6",
      "Perpres 174/2024 Pasal 6 huruf c",
      "Perpres 174/2024 Pasal 6 huruf e",
      "Perpres 174/2024 Pasal 6 huruf f",
      "Perpres 174/2024 Pasal 12",
      "Perpres 174/2024 Pasal 13"
    ],
    "keterangan": "Gold standard case 45: Perpres 174/2024 Pasal 5; Perpres 174/2024 Pasal 6"
  },
  {
    "id": "TC-46",
    "kategori": "Kelembagaan & Regulasi",
    "pertanyaan": "Bagaimana jenis dan hierarki peraturan perundang-undangan di Indonesia?",
    "ground_truth_chunks": [
      "UU_12_2011__P7__a1",
      "UU_12_2011__P7__a1__ha",
      "UU_12_2011__P7__a1__hb",
      "UU_12_2011__P7__a1__hc",
      "UU_12_2011__P7__a1__hd",
      "UU_12_2011__P7__a1__he",
      "UU_12_2011__P7__a1__hf",
      "UU_12_2011__P7__a1__hg",
      "UU_12_2011__P7__a2",
      "UU_12_2011__P104__ha__1"
    ],
    "ground_truth_pasal_labels": [
      "UU 12/2011 Pasal 7 ayat (1)",
      "UU 12/2011 Pasal 7 ayat (1) huruf a",
      "UU 12/2011 Pasal 7 ayat (1) huruf b",
      "UU 12/2011 Pasal 7 ayat (1) huruf c",
      "UU 12/2011 Pasal 7 ayat (1) huruf d",
      "UU 12/2011 Pasal 7 ayat (1) huruf e",
      "UU 12/2011 Pasal 7 ayat (1) huruf f",
      "UU 12/2011 Pasal 7 ayat (1) huruf g",
      "UU 12/2011 Pasal 7 ayat (2)",
      "UU 12/2011 Pasal 104 huruf a"
    ],
    "keterangan": "Gold standard case 46: UU 12/2011 Pasal 7 ayat (1); UU 12/2011 Pasal 7 ayat (1) huruf a"
  }
];

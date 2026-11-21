import { GraphEdge } from '../types';

export interface InterdocCitation {
  chunk_id: string;
  doc_id: string;
  jenis_tuju: string;
  nomor: string;
  tahun: number;
  doc_tuju: string;
  dalam_korpus: boolean;
}

export interface PasalCrossReference {
  chunk_id: string;
  doc_id: string;
  pasal_asal: string;
  pasal_tuju: string;
  ayat_tuju?: string;
  valid: boolean;
}

export const RAW_INTERDOC_CITATIONS: InterdocCitation[] = [
  { chunk_id: 'PP_28_2025__P147__a1__hb', doc_id: 'PP_28_2025', jenis_tuju: 'UU', nomor: '6', tahun: 2023, doc_tuju: 'UU_6_2023', dalam_korpus: true },
  { chunk_id: 'PP_28_2025__P147__a1__hb', doc_id: 'PP_28_2025', jenis_tuju: 'Perppu', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'PP_28_2025__P159__a1__hc__1', doc_id: 'PP_28_2025', jenis_tuju: 'UU', nomor: '6', tahun: 2023, doc_tuju: 'UU_6_2023', dalam_korpus: true },
  { chunk_id: 'PP_28_2025__P159__a1__hc__1', doc_id: 'PP_28_2025', jenis_tuju: 'Perppu', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'PP_28_2025__P552__0', doc_id: 'PP_28_2025', jenis_tuju: 'UU', nomor: '6', tahun: 2023, doc_tuju: 'UU_6_2023', dalam_korpus: true },
  { chunk_id: 'PP_28_2025__P552__0', doc_id: 'PP_28_2025', jenis_tuju: 'Perppu', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'PP_46_2021__P101', doc_id: 'PP_46_2021', jenis_tuju: 'PP', nomor: '52', tahun: 2000, doc_tuju: 'PP_52_2000', dalam_korpus: true },
  { chunk_id: 'PP_46_2021__P101__hc', doc_id: 'PP_46_2021', jenis_tuju: 'PP', nomor: '51', tahun: 2005, doc_tuju: 'PP_51_2005', dalam_korpus: true },
  { chunk_id: 'PP_46_2021__P103__hd', doc_id: 'PP_46_2021', jenis_tuju: 'UU', nomor: '36', tahun: 1999, doc_tuju: 'UU_36_1999', dalam_korpus: true },
  { chunk_id: 'PP_49_2005__P8__0', doc_id: 'PP_49_2005', jenis_tuju: 'UU', nomor: '32', tahun: 2002, doc_tuju: 'UU_32_2002', dalam_korpus: true },
  { chunk_id: 'PP_51_2005__P1__n1', doc_id: 'PP_51_2005', jenis_tuju: 'UU', nomor: '32', tahun: 2002, doc_tuju: 'UU_32_2002', dalam_korpus: true },
  { chunk_id: 'PP_51_2005__P1__n10__1', doc_id: 'PP_51_2005', jenis_tuju: 'UU', nomor: '32', tahun: 2002, doc_tuju: 'UU_32_2002', dalam_korpus: true },
  { chunk_id: 'PP_51_2005__P56__0', doc_id: 'PP_51_2005', jenis_tuju: 'UU', nomor: '32', tahun: 2002, doc_tuju: 'UU_32_2002', dalam_korpus: true },
  { chunk_id: 'PP_52_2000__P98', doc_id: 'PP_52_2000', jenis_tuju: 'UU', nomor: '36', tahun: 1999, doc_tuju: 'UU_36_1999', dalam_korpus: true },
  { chunk_id: 'Perppu_2_2022__P69__ha__0', doc_id: 'Perppu_2_2022', jenis_tuju: 'UU', nomor: '38', tahun: 2009, doc_tuju: 'UU_38_2009', dalam_korpus: true },
  { chunk_id: 'Perppu_2_2022__P69__hb__0', doc_id: 'Perppu_2_2022', jenis_tuju: 'UU', nomor: '36', tahun: 1999, doc_tuju: 'UU_36_1999', dalam_korpus: true },
  { chunk_id: 'Perppu_2_2022__P70__3', doc_id: 'Perppu_2_2022', jenis_tuju: 'UU', nomor: '38', tahun: 2009, doc_tuju: 'UU_38_2009', dalam_korpus: true },
  { chunk_id: 'Perppu_2_2022__P71__3', doc_id: 'Perppu_2_2022', jenis_tuju: 'UU', nomor: '36', tahun: 1999, doc_tuju: 'UU_36_1999', dalam_korpus: true },
  { chunk_id: 'Perppu_2_2022__P85__ha', doc_id: 'Perppu_2_2022', jenis_tuju: 'UU', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'Perppu_2_2022__P103__1', doc_id: 'Perppu_2_2022', jenis_tuju: 'UU', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'Perppu_2_2022__P186__ha__1', doc_id: 'Perppu_2_2022', jenis_tuju: 'UU', nomor: '12', tahun: 2011, doc_tuju: 'UU_12_2011', dalam_korpus: true },
  { chunk_id: 'Perppu_2_2022__P186__hc__2', doc_id: 'Perppu_2_2022', jenis_tuju: 'UU', nomor: '12', tahun: 2011, doc_tuju: 'UU_12_2011', dalam_korpus: true },
  { chunk_id: 'UU_12_2011__P59__n262', doc_id: 'UU_12_2011', jenis_tuju: 'UU', nomor: '38', tahun: 2009, doc_tuju: 'UU_38_2009', dalam_korpus: true },
  { chunk_id: 'UU_6_2023__P1__0', doc_id: 'UU_6_2023', jenis_tuju: 'Perppu', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'UU_6_2023__P2__0', doc_id: 'UU_6_2023', jenis_tuju: 'Perppu', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'UU_6_2023__P2__hc__6', doc_id: 'UU_6_2023', jenis_tuju: 'Perppu', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'UU_6_2023__P2__1', doc_id: 'UU_6_2023', jenis_tuju: 'Perppu', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'UU_6_2023__P69__hb__0', doc_id: 'UU_6_2023', jenis_tuju: 'UU', nomor: '36', tahun: 1999, doc_tuju: 'UU_36_1999', dalam_korpus: true },
  { chunk_id: 'UU_6_2023__P71__3', doc_id: 'UU_6_2023', jenis_tuju: 'UU', nomor: '36', tahun: 1999, doc_tuju: 'UU_36_1999', dalam_korpus: true },
  { chunk_id: 'UU_6_2023__P85__hc', doc_id: 'UU_6_2023', jenis_tuju: 'UU', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'UU_6_2023__P103__2', doc_id: 'UU_6_2023', jenis_tuju: 'UU', nomor: '2', tahun: 2022, doc_tuju: 'Perppu_2_2022', dalam_korpus: true },
  { chunk_id: 'UU_6_2023__P186__ha__2', doc_id: 'UU_6_2023', jenis_tuju: 'UU', nomor: '12', tahun: 2011, doc_tuju: 'UU_12_2011', dalam_korpus: true },
  { chunk_id: 'UU_6_2023__P186__hc__3', doc_id: 'UU_6_2023', jenis_tuju: 'UU', nomor: '12', tahun: 2011, doc_tuju: 'UU_12_2011', dalam_korpus: true },
];

export const RAW_PASAL_REFERENCES: PasalCrossReference[] = [
  // Permen 17 Tahun 2018 (Amatir Radio & KRAP / PMR)
  { chunk_id: 'Permen_17_2018__P3__a1', doc_id: 'Permen_17_2018', pasal_asal: '3', pasal_tuju: '2', ayat_tuju: '2', valid: true },
  { chunk_id: 'Permen_17_2018__P4__a1__hg', doc_id: 'Permen_17_2018', pasal_asal: '4', pasal_tuju: '3', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_17_2018__P5', doc_id: 'Permen_17_2018', pasal_asal: '5', pasal_tuju: '3', valid: true },
  { chunk_id: 'Permen_17_2018__P6', doc_id: 'Permen_17_2018', pasal_asal: '6', pasal_tuju: '3', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_17_2018__P10__a1', doc_id: 'Permen_17_2018', pasal_asal: '10', pasal_tuju: '2', ayat_tuju: '3', valid: true },
  { chunk_id: 'Permen_17_2018__P11__a1', doc_id: 'Permen_17_2018', pasal_asal: '11', pasal_tuju: '10', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_17_2018__P12', doc_id: 'Permen_17_2018', pasal_asal: '12', pasal_tuju: '10', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_17_2018__P13', doc_id: 'Permen_17_2018', pasal_asal: '13', pasal_tuju: '10', ayat_tuju: '2', valid: true },
  { chunk_id: 'Permen_17_2018__P14__a1', doc_id: 'Permen_17_2018', pasal_asal: '14', pasal_tuju: '10', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_17_2018__P15__a1', doc_id: 'Permen_17_2018', pasal_asal: '15', pasal_tuju: '14', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_17_2018__P19__a2__ha', doc_id: 'Permen_17_2018', pasal_asal: '19', pasal_tuju: '10', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_17_2018__P33__a1__ha', doc_id: 'Permen_17_2018', pasal_asal: '33', pasal_tuju: '31', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_17_2018__P43__a3', doc_id: 'Permen_17_2018', pasal_asal: '43', pasal_tuju: '13', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_17_2018__P82__a1__0', doc_id: 'Permen_17_2018', pasal_asal: '82', pasal_tuju: '40', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_17_2018__P83__a1', doc_id: 'Permen_17_2018', pasal_asal: '83', pasal_tuju: '3', ayat_tuju: '2', valid: true },

  // Permen 5 Tahun 2021 (Penyelenggaraan Telekomunikasi)
  { chunk_id: 'Permen_5_2021__P5__a2__hc', doc_id: 'Permen_5_2021', pasal_asal: '5', pasal_tuju: '4', ayat_tuju: '2', valid: true },
  { chunk_id: 'Permen_5_2021__P8', doc_id: 'Permen_5_2021', pasal_asal: '8', pasal_tuju: '7', ayat_tuju: '2', valid: true },
  { chunk_id: 'Permen_5_2021__P10__a1', doc_id: 'Permen_5_2021', pasal_asal: '10', pasal_tuju: '9', ayat_tuju: '2', valid: true },
  { chunk_id: 'Permen_5_2021__P14', doc_id: 'Permen_5_2021', pasal_asal: '14', pasal_tuju: '13', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_5_2021__P30__a1', doc_id: 'Permen_5_2021', pasal_asal: '30', pasal_tuju: '28', ayat_tuju: '2', valid: true },
  { chunk_id: 'Permen_5_2021__P35__a1__0', doc_id: 'Permen_5_2021', pasal_asal: '35', pasal_tuju: '34', valid: true },
  { chunk_id: 'Permen_5_2021__P54', doc_id: 'Permen_5_2021', pasal_asal: '54', pasal_tuju: '46', valid: true },
  { chunk_id: 'Permen_5_2021__P60__a1', doc_id: 'Permen_5_2021', pasal_asal: '60', pasal_tuju: '59', valid: true },
  { chunk_id: 'Permen_5_2021__P95__a1', doc_id: 'Permen_5_2021', pasal_asal: '95', pasal_tuju: '94', valid: true },
  { chunk_id: 'Permen_5_2021__P102__a1', doc_id: 'Permen_5_2021', pasal_asal: '102', pasal_tuju: '53', valid: true },
  { chunk_id: 'Permen_5_2021__P112__a1', doc_id: 'Permen_5_2021', pasal_asal: '112', pasal_tuju: '111', valid: true },
  { chunk_id: 'Permen_5_2021__P144__a1', doc_id: 'Permen_5_2021', pasal_asal: '144', pasal_tuju: '143', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_5_2021__P156', doc_id: 'Permen_5_2021', pasal_asal: '156', pasal_tuju: '155', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_5_2021__P181__a1', doc_id: 'Permen_5_2021', pasal_asal: '181', pasal_tuju: '177', valid: true },
  { chunk_id: 'Permen_5_2021__P197__a1', doc_id: 'Permen_5_2021', pasal_asal: '197', pasal_tuju: '187', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_5_2021__P205__a1', doc_id: 'Permen_5_2021', pasal_asal: '205', pasal_tuju: '202', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_5_2021__P222__he', doc_id: 'Permen_5_2021', pasal_asal: '222', pasal_tuju: '198', valid: true },
  { chunk_id: 'Permen_5_2021__P228__a1__0', doc_id: 'Permen_5_2021', pasal_asal: '228', pasal_tuju: '7', valid: true },
  { chunk_id: 'Permen_5_2021__P228__a1__0', doc_id: 'Permen_5_2021', pasal_asal: '228', pasal_tuju: '40', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_5_2021__P236', doc_id: 'Permen_5_2021', pasal_asal: '236', pasal_tuju: '225', valid: true },

  // Permen 8 Tahun 2024 (Sertifikasi Perangkat Telekomunikasi)
  { chunk_id: 'Permen_8_2024__P3__a1', doc_id: 'Permen_8_2024', pasal_asal: '3', pasal_tuju: '2', valid: true },
  { chunk_id: 'Permen_8_2024__P6__a1', doc_id: 'Permen_8_2024', pasal_asal: '6', pasal_tuju: '5', valid: true },
  { chunk_id: 'Permen_8_2024__P9__a2__ha', doc_id: 'Permen_8_2024', pasal_asal: '9', pasal_tuju: '3', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_8_2024__P16__a1', doc_id: 'Permen_8_2024', pasal_asal: '16', pasal_tuju: '15', ayat_tuju: '8', valid: true },
  { chunk_id: 'Permen_8_2024__P21__a2__0', doc_id: 'Permen_8_2024', pasal_asal: '21', pasal_tuju: '3', ayat_tuju: '1', valid: true },

  // Permen 8 Tahun 2026 (TASFRI)
  { chunk_id: 'Permen_8_2026__P3', doc_id: 'Permen_8_2026', pasal_asal: '3', pasal_tuju: '2', valid: true },
  { chunk_id: 'Permen_8_2026__P4', doc_id: 'Permen_8_2026', pasal_asal: '4', pasal_tuju: '2', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_8_2026__P6__a1', doc_id: 'Permen_8_2026', pasal_asal: '6', pasal_tuju: '5', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_8_2026__P8__ha', doc_id: 'Permen_8_2026', pasal_asal: '8', pasal_tuju: '3', ayat_tuju: '2', valid: true },
  { chunk_id: 'Permen_8_2026__P8__ha', doc_id: 'Permen_8_2026', pasal_asal: '8', pasal_tuju: '9', ayat_tuju: '1', valid: true },

  // Permen 9 Tahun 2023 (BHP Spektrum Frekuensi & ISR)
  { chunk_id: 'Permen_9_2023__P1__n10', doc_id: 'Permen_9_2023', pasal_asal: '1', pasal_tuju: '5', valid: true },
  { chunk_id: 'Permen_9_2023__P4__a1', doc_id: 'Permen_9_2023', pasal_asal: '4', pasal_tuju: '3', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_9_2023__P7__a1', doc_id: 'Permen_9_2023', pasal_asal: '7', pasal_tuju: '6', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_9_2023__P14__a1', doc_id: 'Permen_9_2023', pasal_asal: '14', pasal_tuju: '13', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_9_2023__P18__a1', doc_id: 'Permen_9_2023', pasal_asal: '18', pasal_tuju: '17', ayat_tuju: '2', valid: true },
  { chunk_id: 'Permen_9_2023__P25__a1', doc_id: 'Permen_9_2023', pasal_asal: '25', pasal_tuju: '24', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_9_2023__P30__a1', doc_id: 'Permen_9_2023', pasal_asal: '30', pasal_tuju: '16', ayat_tuju: '4', valid: true },
  { chunk_id: 'Permen_9_2023__P35__ha', doc_id: 'Permen_9_2023', pasal_asal: '35', pasal_tuju: '6', ayat_tuju: '2', valid: true },
  { chunk_id: 'Permen_9_2023__P36__a1', doc_id: 'Permen_9_2023', pasal_asal: '36', pasal_tuju: '3', ayat_tuju: '4', valid: true },
  { chunk_id: 'Permen_9_2023__P46__a1', doc_id: 'Permen_9_2023', pasal_asal: '46', pasal_tuju: '45', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_9_2023__P52__ha', doc_id: 'Permen_9_2023', pasal_asal: '52', pasal_tuju: '36', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_9_2023__P58__a1', doc_id: 'Permen_9_2023', pasal_asal: '58', pasal_tuju: '56', valid: true },
  { chunk_id: 'Permen_9_2023__P63__a1', doc_id: 'Permen_9_2023', pasal_asal: '63', pasal_tuju: '61', valid: true },
  { chunk_id: 'Permen_9_2023__P64', doc_id: 'Permen_9_2023', pasal_asal: '64', pasal_tuju: '61', valid: true },
  { chunk_id: 'Permen_9_2023__P65__a1', doc_id: 'Permen_9_2023', pasal_asal: '65', pasal_tuju: '61', valid: true },

  // Permen 2 Tahun 2023 (Penggunaan Spektrum Berdasarkan Izin Kelas / PMR 409)
  { chunk_id: 'Permen_2_2023__P3__a1', doc_id: 'Permen_2_2023', pasal_asal: '3', pasal_tuju: '2', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_2_2023__P10__ha', doc_id: 'Permen_2_2023', pasal_asal: '10', pasal_tuju: '2', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_2_2023__P13__a1', doc_id: 'Permen_2_2023', pasal_asal: '13', pasal_tuju: '11', ayat_tuju: '4', valid: true },
  { chunk_id: 'Permen_2_2023__P18__a1', doc_id: 'Permen_2_2023', pasal_asal: '18', pasal_tuju: '17', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_2_2023__P25__a1', doc_id: 'Permen_2_2023', pasal_asal: '25', pasal_tuju: '2', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_2_2023__P28__a1__0', doc_id: 'Permen_2_2023', pasal_asal: '28', pasal_tuju: '12', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_2_2023__P30__a1__0', doc_id: 'Permen_2_2023', pasal_asal: '30', pasal_tuju: '14', ayat_tuju: '1', valid: true },
  { chunk_id: 'Permen_2_2023__P34__a1__0', doc_id: 'Permen_2_2023', pasal_asal: '34', pasal_tuju: '17', ayat_tuju: '1', valid: true },

  // PP 28 Tahun 2025 (Perizinan Berbasis Risiko)
  { chunk_id: 'PP_28_2025__P5__a1', doc_id: 'PP_28_2025', pasal_asal: '5', pasal_tuju: '2', ayat_tuju: '2', valid: true },
  { chunk_id: 'PP_28_2025__P28__a1', doc_id: 'PP_28_2025', pasal_asal: '28', pasal_tuju: '19', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_28_2025__P46__a1', doc_id: 'PP_28_2025', pasal_asal: '46', pasal_tuju: '45', ayat_tuju: '2', valid: true },
  { chunk_id: 'PP_28_2025__P81__a1', doc_id: 'PP_28_2025', pasal_asal: '81', pasal_tuju: '80', ayat_tuju: '2', valid: true },
  { chunk_id: 'PP_28_2025__P127__a1', doc_id: 'PP_28_2025', pasal_asal: '127', pasal_tuju: '126', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_28_2025__P234__a6', doc_id: 'PP_28_2025', pasal_asal: '234', pasal_tuju: '222', valid: true },
  { chunk_id: 'PP_28_2025__P445__0', doc_id: 'PP_28_2025', pasal_asal: '445', pasal_tuju: '435', ayat_tuju: '2', valid: true },
  { chunk_id: 'PP_28_2025__P479__0', doc_id: 'PP_28_2025', pasal_asal: '479', pasal_tuju: '474', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_28_2025__P492', doc_id: 'PP_28_2025', pasal_asal: '492', pasal_tuju: '490', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_28_2025__P493', doc_id: 'PP_28_2025', pasal_asal: '493', pasal_tuju: '492', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_28_2025__P509__a1', doc_id: 'PP_28_2025', pasal_asal: '509', pasal_tuju: '492', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_28_2025__P509__a1', doc_id: 'PP_28_2025', pasal_asal: '509', pasal_tuju: '493', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_28_2025__P510__a1', doc_id: 'PP_28_2025', pasal_asal: '510', pasal_tuju: '492', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_28_2025__P510__a1', doc_id: 'PP_28_2025', pasal_asal: '510', pasal_tuju: '493', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_28_2025__P531', doc_id: 'PP_28_2025', pasal_asal: '531', pasal_tuju: '530', valid: true },

  // PP 46 Tahun 2021 (Postelsiar)
  { chunk_id: 'PP_46_2021__P4__a1__0', doc_id: 'PP_46_2021', pasal_asal: '4', pasal_tuju: '3', ayat_tuju: '3', valid: true },
  { chunk_id: 'PP_46_2021__P8__a1', doc_id: 'PP_46_2021', pasal_asal: '8', pasal_tuju: '5', ayat_tuju: '2', valid: true },
  { chunk_id: 'PP_46_2021__P54__a1', doc_id: 'PP_46_2021', pasal_asal: '54', pasal_tuju: '50', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_46_2021__P56__a1', doc_id: 'PP_46_2021', pasal_asal: '56', pasal_tuju: '55', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_46_2021__P63__a1', doc_id: 'PP_46_2021', pasal_asal: '63', pasal_tuju: '46', valid: true },
  { chunk_id: 'PP_46_2021__P64__a1', doc_id: 'PP_46_2021', pasal_asal: '64', pasal_tuju: '63', ayat_tuju: '2', valid: true },
  { chunk_id: 'PP_46_2021__P86__a1', doc_id: 'PP_46_2021', pasal_asal: '86', pasal_tuju: '70', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_46_2021__P101', doc_id: 'PP_46_2021', pasal_asal: '101', pasal_tuju: '26', valid: true },

  // PP 51 Tahun 2005 (Lembaga Penyiaran Komunitas)
  { chunk_id: 'PP_51_2005__P9__a1', doc_id: 'PP_51_2005', pasal_asal: '9', pasal_tuju: '8', ayat_tuju: '3', valid: true },
  { chunk_id: 'PP_51_2005__P37__a3', doc_id: 'PP_51_2005', pasal_asal: '37', pasal_tuju: '38', valid: true },
  { chunk_id: 'PP_51_2005__P40__a1', doc_id: 'PP_51_2005', pasal_asal: '40', pasal_tuju: '13', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_51_2005__P52__a1', doc_id: 'PP_51_2005', pasal_asal: '52', pasal_tuju: '40', valid: true },
  { chunk_id: 'PP_51_2005__P56__0', doc_id: 'PP_51_2005', pasal_asal: '56', pasal_tuju: '21', valid: true },

  // PP 52 Tahun 2000 (Penyelenggaraan Telekomunikasi)
  { chunk_id: 'PP_52_2000__P6__a1', doc_id: 'PP_52_2000', pasal_asal: '6', pasal_tuju: '3', valid: true },
  { chunk_id: 'PP_52_2000__P15__a4', doc_id: 'PP_52_2000', pasal_asal: '15', pasal_tuju: '16', valid: true },
  { chunk_id: 'PP_52_2000__P41__a1', doc_id: 'PP_52_2000', pasal_asal: '41', pasal_tuju: '40', valid: true },
  { chunk_id: 'PP_52_2000__P56__a1', doc_id: 'PP_52_2000', pasal_asal: '56', pasal_tuju: '55', ayat_tuju: '1', valid: true },
  { chunk_id: 'PP_52_2000__P95__a1', doc_id: 'PP_52_2000', pasal_asal: '95', pasal_tuju: '6', valid: true },

  // PP 53 Tahun 2000 (Spektrum Frekuensi & Orbit Satelit)
  { chunk_id: 'PP_53_2000__P5__a1', doc_id: 'PP_53_2000', pasal_asal: '5', pasal_tuju: '4', valid: true },
  { chunk_id: 'PP_53_2000__P14__a4', doc_id: 'PP_53_2000', pasal_asal: '14', pasal_tuju: '15', valid: true },
  { chunk_id: 'PP_53_2000__P25__a2', doc_id: 'PP_53_2000', pasal_asal: '25', pasal_tuju: '26', valid: true },
  { chunk_id: 'PP_53_2000__P37__a2', doc_id: 'PP_53_2000', pasal_asal: '37', pasal_tuju: '38', valid: true },

  // Perpres 174 Tahun 2024 (Komdigi)
  { chunk_id: 'Perpres_174_2024__P6', doc_id: 'Perpres_174_2024', pasal_asal: '6', pasal_tuju: '5', valid: true },
  { chunk_id: 'Perpres_174_2024__P9', doc_id: 'Perpres_174_2024', pasal_asal: '9', pasal_tuju: '10', valid: true },
  { chunk_id: 'Perpres_174_2024__P13', doc_id: 'Perpres_174_2024', pasal_asal: '13', pasal_tuju: '12', valid: true },
  { chunk_id: 'Perpres_174_2024__P16', doc_id: 'Perpres_174_2024', pasal_asal: '16', pasal_tuju: '15', valid: true },
  { chunk_id: 'Perpres_174_2024__P22', doc_id: 'Perpres_174_2024', pasal_asal: '22', pasal_tuju: '21', valid: true },

  // UU 12 Tahun 2011 (Pembentukan Peraturan Perundang-undangan)
  { chunk_id: 'UU_12_2011__P8__a1__0', doc_id: 'UU_12_2011', pasal_asal: '8', pasal_tuju: '7', ayat_tuju: '1', valid: true },
  { chunk_id: 'UU_12_2011__P22__a1', doc_id: 'UU_12_2011', pasal_asal: '22', pasal_tuju: '21', ayat_tuju: '1', valid: true },
  { chunk_id: 'UU_12_2011__P33__a1__0', doc_id: 'UU_12_2011', pasal_asal: '33', pasal_tuju: '32', valid: true },
  { chunk_id: 'UU_12_2011__P73__a1', doc_id: 'UU_12_2011', pasal_asal: '73', pasal_tuju: '72', valid: true },
  { chunk_id: 'UU_12_2011__P77__0', doc_id: 'UU_12_2011', pasal_asal: '77', pasal_tuju: '75', valid: true },
  { chunk_id: 'UU_12_2011__P85__0', doc_id: 'UU_12_2011', pasal_asal: '85', pasal_tuju: '82', valid: true },

  // UU 32 Tahun 2002 (Penyiaran)
  { chunk_id: 'UU_32_2002__P7__a1', doc_id: 'UU_32_2002', pasal_asal: '7', pasal_tuju: '6', ayat_tuju: '4', valid: true },
  { chunk_id: 'UU_32_2002__P14__a1', doc_id: 'UU_32_2002', pasal_asal: '14', pasal_tuju: '13', ayat_tuju: '2', valid: true },
  { chunk_id: 'UU_32_2002__P29__a1', doc_id: 'UU_32_2002', pasal_asal: '29', pasal_tuju: '16', ayat_tuju: '2', valid: true },
  { chunk_id: 'UU_32_2002__P55__a1', doc_id: 'UU_32_2002', pasal_asal: '55', pasal_tuju: '15', ayat_tuju: '2', valid: true },
  { chunk_id: 'UU_32_2002__P62__a1', doc_id: 'UU_32_2002', pasal_asal: '62', pasal_tuju: '14', ayat_tuju: '10', valid: true },

  // UU 36 Tahun 1999 (Telekomunikasi)
  { chunk_id: 'UU_36_1999__P8__a1', doc_id: 'UU_36_1999', pasal_asal: '8', pasal_tuju: '7', ayat_tuju: '1', valid: true },
  { chunk_id: 'UU_36_1999__P9__a1', doc_id: 'UU_36_1999', pasal_asal: '9', pasal_tuju: '8', ayat_tuju: '1', valid: true },
  { chunk_id: 'UU_36_1999__P29__a1', doc_id: 'UU_36_1999', pasal_asal: '29', pasal_tuju: '9', ayat_tuju: '3', valid: true },
  { chunk_id: 'UU_36_1999__P33__a1', doc_id: 'UU_36_1999', pasal_asal: '33', pasal_tuju: '33', ayat_tuju: '2', valid: true },
  { chunk_id: 'UU_36_1999__P53__a1', doc_id: 'UU_36_1999', pasal_asal: '53', pasal_tuju: '33', ayat_tuju: '1', valid: true },
  { chunk_id: 'UU_36_1999__P58__0', doc_id: 'UU_36_1999', pasal_asal: '58', pasal_tuju: '17', valid: true },

  // UU 38 Tahun 2009 (Pos)
  { chunk_id: 'UU_38_2009__P5__a1', doc_id: 'UU_38_2009', pasal_asal: '5', pasal_tuju: '4', ayat_tuju: '1', valid: true },
  { chunk_id: 'UU_38_2009__P16__a1', doc_id: 'UU_38_2009', pasal_asal: '16', pasal_tuju: '15', ayat_tuju: '1', valid: true },
  { chunk_id: 'UU_38_2009__P24__a3', doc_id: 'UU_38_2009', pasal_asal: '24', pasal_tuju: '22', ayat_tuju: '1', valid: true },
  { chunk_id: 'UU_38_2009__P37__a2', doc_id: 'UU_38_2009', pasal_asal: '37', pasal_tuju: '38', valid: true },
  { chunk_id: 'UU_38_2009__P40__0', doc_id: 'UU_38_2009', pasal_asal: '40', pasal_tuju: '30', valid: true },

  // UU 6 Tahun 2023 (Cipta Kerja)
  { chunk_id: 'UU_6_2023__P7__a1__0', doc_id: 'UU_6_2023', pasal_asal: '7', pasal_tuju: '6', valid: true },
  { chunk_id: 'UU_6_2023__P14__a1__0', doc_id: 'UU_6_2023', pasal_asal: '14', pasal_tuju: '13', valid: true },
  { chunk_id: 'UU_6_2023__P26__a10__n18', doc_id: 'UU_6_2023', pasal_asal: '26', pasal_tuju: '34', valid: true },
  { chunk_id: 'UU_6_2023__P28__6', doc_id: 'UU_6_2023', pasal_asal: '28', pasal_tuju: '27', valid: true },
  { chunk_id: 'UU_6_2023__P34A__a1__0', doc_id: 'UU_6_2023', pasal_asal: '34A', pasal_tuju: '20', ayat_tuju: '5', valid: true },
  { chunk_id: 'UU_6_2023__P71__a1', doc_id: 'UU_6_2023', pasal_asal: '71', pasal_tuju: '61', valid: true },
  { chunk_id: 'UU_6_2023__P73__a1__0', doc_id: 'UU_6_2023', pasal_asal: '73', pasal_tuju: '37', ayat_tuju: '7', valid: true },
  { chunk_id: 'UU_6_2023__P82A__a3', doc_id: 'UU_6_2023', pasal_asal: '82A', pasal_tuju: '59', ayat_tuju: '4', valid: true },
  { chunk_id: 'UU_6_2023__P101__0', doc_id: 'UU_6_2023', pasal_asal: '101', pasal_tuju: '84', ayat_tuju: '1', valid: true },
  { chunk_id: 'UU_6_2023__P150__a1', doc_id: 'UU_6_2023', pasal_asal: '150', pasal_tuju: '26', ayat_tuju: '1', valid: true },
  { chunk_id: 'UU_6_2023__P185__a1__1', doc_id: 'UU_6_2023', pasal_asal: '185', pasal_tuju: '42', ayat_tuju: '2', valid: true },
];

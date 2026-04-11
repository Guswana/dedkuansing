import type { P424Item } from "@/types/p424"

export const P424_LIST: P424Item[] = [
  { code: "01", label: "Surat Izin Tempat Usaha (SITU)" },
  { code: "02", label: "Surat Izin Usaha Perdagangan (SIUP)" },
  { code: "03", label: "Nomor Register Perusahaan (NRP)" },
  { code: "04", label: "Nomor Induk Berusaha (NIB)" },
  { code: "05", label: "Surat Keterangan Domisili Perusahaan (SKDP)" },
  { code: "06", label: "Analisis Mengenai Dampak Lingkungan (Amdal)" },
  { code: "07", label: "Surat Izin Mendirikan Bangunan (SIMB)" },
  { code: "08", label: "Surat Keputusan Badan Hukum (SKBH)" },
  { code: "09", label: "Akta Pendirian Perseroan Terbatas (APPT)" },
  { code: "10", label: "Surat izin lainnya" },
  { code: "11", label: "Belum memiliki izin usaha" },
  { code: "12", label: "Surat Izin Gangguan" },
]

export const P424_MAP = new Map(P424_LIST.map((item) => [item.code, item.label]))

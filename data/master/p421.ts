import type { P421Item } from "@/types/p421"

export const P421_LIST: P421Item[] = [
  { code: "01", label: "Pertanian tanaman padi dan palawija" },
  { code: "02", label: "Hortikultura" },
  { code: "03", label: "Perkebunan" },
  { code: "04", label: "Perikanan" },
  { code: "05", label: "Peternakan" },
  { code: "06", label: "Kehutanan dan pertanian lainnya" },
  { code: "07", label: "Pertambangan dan penggalian" },
  { code: "08", label: "Industri pengolahan" },
  { code: "09", label: "Pengadaan listrik, gas, uap/air panas, dan udara dingin" },
  { code: "10", label: "Pengelolaan air, pengelolaan air limbah, pengelolaan dan daur ulang sampah, dan aktivitas remediasi" },
  { code: "11", label: "Konstruksi" },
  { code: "12", label: "Perdagangan besar dan eceran, reparasi dan perawatan mobil dan sepeda motor" },
  { code: "13", label: "Pengangkutan dan pergudangan" },
  { code: "14", label: "Penyediaan akomodasi dan makan minum" },
  { code: "15", label: "Informasi dan komunikasi" },
  { code: "16", label: "Keuangan dan asuransi" },
  { code: "17", label: "Real estate" },
  { code: "18", label: "Aktivitas profesional, ilmiah, dan teknis" },
  { code: "19", label: "Aktivitas penyewaan dan sewa guna tanpa hak opsi, ketenagakerjaan, agen perjalanan, dan penunjang usaha lainnya" },
  { code: "20", label: "Administrasi pemerintahan, pertahanan, dan jaminan sosial wajib" },
  { code: "21", label: "Pendidikan" },
  { code: "22", label: "Aktivitas kesehatan manusia dan aktivitas sosial" },
  { code: "23", label: "Kesenian, hiburan, dan rekreasi" },
  { code: "24", label: "Aktivitas jasa lainnya" },
  { code: "25", label: "Aktivitas keluarga sebagai pemberi kerja" },
  { code: "26", label: "Aktivitas badan internasional dan badan ekstra internasional lainnya" },
]

export const P421_MAP = new Map(P421_LIST.map((item) => [item.code, item.label]))

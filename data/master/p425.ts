import type { P425Item } from "@/types/p425"

export const P425_LIST: P425Item[] = [
    { code: "1", label: "<5 Juta (ultra mikro)" },
    { code: "2", label: "5=<15 Juta (ultra mikro)" },
    { code: "3", label: "15=<25 Juta (ultra mikro)" },
    { code: "4", label: "25=<167 Juta (mikro)" },
    { code: "5", label: "167=<1250 Juta (kecil)" },
    { code: "6", label: "1250=<4167 Juta (menengah)" },
    { code: "7", label: ">= 4167 Juta (besar)" }
]

export const P425_MAP = new Map(P425_LIST.map((item) => [item.code, item.label]))

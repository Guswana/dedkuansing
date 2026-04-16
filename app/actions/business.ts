'use server'

import { db } from "@/src/db"
import { dataFinal } from "@/src/db/schema"
import { eq, and, like, sql } from "drizzle-orm"
import { KECAMATAN_MAP } from "@/data/master/kecamatan"
import { P421_MAP } from "@/data/master/p421"
import { P425_MAP } from "@/data/master/p425"

export interface BusinessData {
  id: number
  compositeId: string
  kodeProv: number | null
  kodeKab: number | null
  kodeKec: number | null
  kodeDesa: number | null
  kodeSls: number | null
  idRt: number | null
  idArt: number | null
  r421Desk: string | null
  r421: number | null
  r424: number | null
  r425: number | null
  kecamatanLabel: string | null | undefined
  jenisLabel: string | null | undefined
  skalaLabel: string | null | undefined
}

export interface FilterParams {
  kodeKec?: string[]
  r421?: string[]
  r424?: string[]
  r425?: string[]
  r426?: string[]
  search?: string
}

export async function getBusinessData(
  page: number = 1, 
  limit: number = 20, 
  filters: FilterParams = {}
): Promise<{
  data: BusinessData[]
  total: number
  totalPages: number
  currentPage: number
}> {
  const offset = (page - 1) * limit
  
  let whereClause = sql`1=1`
  
  if (filters.kodeKec && filters.kodeKec.length > 0) {
    const kecCodes = filters.kodeKec.map(k => parseInt(k)).filter(Boolean)
    if (kecCodes.length > 0) {
      whereClause = sql`${whereClause} AND ${dataFinal.kodeKec} IN (${sql.join(kecCodes, sql`, `)})`
    }
  }
  
  if (filters.r421 && filters.r421.length > 0) {
    const r421Codes = filters.r421.map(r => parseInt(r)).filter(Boolean)
    if (r421Codes.length > 0) {
      whereClause = sql`${whereClause} AND ${dataFinal.r421} IN (${sql.join(r421Codes, sql`, `)})`
    }
  }
  
  if (filters.r424 && filters.r424.length > 0) {
    const r424Codes = filters.r424.map(r => parseInt(r)).filter(Boolean)
    if (r424Codes.length > 0) {
      whereClause = sql`${whereClause} AND ${dataFinal.r424} IN (${sql.join(r424Codes, sql`, `)})`
    }
  }

  if (filters.r425 && filters.r425.length > 0) {
    const r425Codes = filters.r425.map(r => parseInt(r)).filter(Boolean)
    if (r425Codes.length > 0) {
      whereClause = sql`${whereClause} AND ${dataFinal.r425} IN (${sql.join(r425Codes, sql`, `)})`
    }
  }

  if (filters.r426 && filters.r426.length > 0) {
    const r426Codes = filters.r426.map(r => parseInt(r)).filter(Boolean)
    if (r426Codes.length > 0) {
      whereClause = sql`${whereClause} AND ${dataFinal.r426} & ${sql.join(r426Codes, sql` | `)} > 0`
    }
  }
  
  if (filters.search) {
    whereClause = sql`${whereClause} AND ${dataFinal.r421Desk} LIKE ${`%${filters.search}%`}`
  }

  const [rows, totalResult] = await Promise.all([
    db.select().from(dataFinal).where(whereClause).limit(limit).offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(dataFinal).where(whereClause)
  ])

  const total = totalResult[0]?.count || 0
  const totalPages = Math.ceil(total / limit)

  const data: BusinessData[] = rows.map(row => ({
    id: row.id,
    compositeId: [row.kodeProv, row.kodeKab, row.kodeKec, row.kodeDesa, row.kodeSls, row.idRt, row.idArt].filter(Boolean).join('-'),
    kodeProv: row.kodeProv,
    kodeKab: row.kodeKab,
    kodeKec: row.kodeKec,
    kodeDesa: row.kodeDesa,
    kodeSls: row.kodeSls,
    idRt: row.idRt,
    idArt: row.idArt,
    r421Desk: row.r421Desk,
    r421: row.r421,
    r424: row.r424,
    r425: row.r425,
    // Mapping ke label dengan penanganan kode yang benar
    kecamatanLabel: row.kodeKec ? KECAMATAN_MAP.get(String(row.kodeKec).padStart(3, '0')) : null,
    jenisLabel: row.r421 ? P421_MAP.get(String(row.r421).padStart(2, '0')) : null,
    skalaLabel: row.r425 ? P425_MAP.get(String(Math.round(row.r425))) : null,
  }))

  return {
    data,
    total,
    totalPages,
    currentPage: page
  }
}

export async function getFilterOptions() {
  const [kecamatan, jenisUsaha, skalaUsaha] = await Promise.all([
    db.selectDistinct({ kodeKec: dataFinal.kodeKec }).from(dataFinal).where(sql`${dataFinal.kodeKec} IS NOT NULL`),
    db.selectDistinct({ r421: dataFinal.r421, deskripsi: dataFinal.r421Desk }).from(dataFinal).where(sql`${dataFinal.r421} IS NOT NULL`),
    db.selectDistinct({ r424: dataFinal.r424 }).from(dataFinal).where(sql`${dataFinal.r424} IS NOT NULL`)
  ])

  return {
    kecamatan: kecamatan.map(k => k.kodeKec).filter(Boolean),
    jenisUsaha: jenisUsaha.map(j => ({ kode: j.r421, deskripsi: j.deskripsi })).filter(j => j.kode),
    skalaUsaha: skalaUsaha.map(s => s.r424).filter(Boolean)
  }
}

export async function deleteBusinessData(id: number) {
  try {
    await db.delete(dataFinal).where(eq(dataFinal.id, id))
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Gagal menghapus data' }
  }
}

export async function createBusinessData(data: Partial<typeof dataFinal.$inferInsert>) {
  try {
    const result = await db.insert(dataFinal).values(data).returning()
    return { success: true, data: result[0] }
  } catch (error) {
    return { success: false, error: 'Gagal menambahkan data' }
  }
}

export async function getBusinessById(id: number) {
  try {
    const result = await db.select().from(dataFinal).where(eq(dataFinal.id, id)).limit(1)
    return { success: true, data: result[0] }
  } catch (error) {
    return { success: false, error: 'Data tidak ditemukan' }
  }
}

export async function updateBusinessData(id: number, data: Partial<typeof dataFinal.$inferInsert>) {
  try {
    const result = await db.update(dataFinal).set(data).where(eq(dataFinal.id, id)).returning()
    return { success: true, data: result[0] }
  } catch (error) {
    return { success: false, error: 'Gagal memperbarui data' }
  }
}
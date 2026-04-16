'use server'

import { db } from "@/src/db"
import { dataFinal } from "@/src/db/schema"
import { eq, and, like, sql } from "drizzle-orm"

export interface BusinessData {
  id: string
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
    id: [row.kodeProv, row.kodeKab, row.kodeKec, row.kodeDesa, row.kodeSls, row.idRt, row.idArt].filter(Boolean).join('-'),
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
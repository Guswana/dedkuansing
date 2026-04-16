import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Tabel Admin User
export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  role: text("role").default("admin"),
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;

export const dataFinal = sqliteTable("data_final", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kodeProv: integer("kode_prov"),
  kodeKab: integer("kode_kab"),
  kodeKec: integer("kode_kec"),
  kodeDesa: integer("kode_desa"),
  kodeSls: integer("kode_sls"),
  kodeSubsls: integer("kode_subsls"),
  idRt: integer("id_rt"),
  idArt: integer("id_art"),
  r420a: real("r420a"),
  r420b: real("r420b"),
  r421: integer("r421"),
  r421Desk: text("r421_desk"),
  r422: real("r422"),
  r423: real("r423"),
  r424: integer("r424"),
  r425: real("r425"),
  r426: real("r426"),
  r421Kode: real("r421_kode"),
});

export type DataFinal = typeof dataFinal.$inferSelect;
export type NewDataFinal = typeof dataFinal.$inferInsert;
import fs from 'fs';
import { parse } from 'csv-parse';
import { db } from '../src/db';
import { dataFinal } from '../src/db/schema';

async function importCsv() {
  console.log('Starting CSV import...');
  
  // First truncate table first
  await db.delete(dataFinal);
  console.log('Existing data cleared');
  
  const records: any[] = [];
  
  // Read file with utf8 encoding to handle BOM
  const fileContent = fs.readFileSync('./data/data/data_final.csv', 'utf8');
  // Remove BOM if present
  const cleanContent = fileContent.replace(/^\uFEFF/, '');
  
  const parser = parse(cleanContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    delimiter: ','
  });

  for await (const record of parser) {
    records.push({
      kodeProv: record.kode_prov ? Number(record.kode_prov) : null,
      kodeKab: record.kode_kab ? Number(record.kode_kab) : null,
      kodeKec: record.kode_kec ? Number(record.kode_kec) : null,
      kodeDesa: record.kode_desa ? Number(record.kode_desa) : null,
      kodeSls: record.kode_sls ? Number(record.kode_sls) : null,
      kodeSubsls: record.kode_subsls ? Number(record.kode_subsls) : null,
      idRt: record.id_rt ? Number(record.id_rt) : null,
      idArt: record.id_art ? Number(record.id_art) : null,
      r420a: record.r420a ? Number(record.r420a) : null,
      r420b: record.r420b ? Number(record.r420b) : null,
      r421: record.r421 ? Number(record.r421) : null,
      r421Desk: record.r421_desk?.trim() || null,
      r422: record.r422 ? Number(record.r422) : null,
      r423: record.r423 ? Number(record.r423) : null,
      r424: record.r424 ? Number(record.r424) : null,
      r425: record.r425 ? Number(record.r425) : null,
      r426: record.r426 ? Number(record.r426) : null,
      r421Kode: record.r421_kode ? Number(record.r421_kode) : null,
    });
  }

  console.log(`Found ${records.length} records to import`);
  console.log('Sample record:', records[0]);
  
  // Insert in batches of 100 for performance
  const batchSize = 100;
  let inserted = 0;
  
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await db.insert(dataFinal).values(batch);
    inserted += batch.length;
    console.log(`Inserted ${inserted}/${records.length} records`);
  }
  
  console.log('Import completed successfully!');
}

importCsv().catch(console.error);

import fs from 'fs';
import { parse } from 'csv-parse';

async function testCsv() {
  const fileContent = fs.readFileSync('./data/data/data_final.csv', 'utf8');
  const cleanContent = fileContent.replace(/^\uFEFF/, '');
  
  const parser = parse(cleanContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    delimiter: ','
  });

  let count = 0;
  for await (const record of parser) {
    console.log('kode_prov:', record.kode_prov);
    console.log('kode_kec:', record.kode_kec);
    console.log('r421_desk:', record.r421_desk);
    console.log('Mapped object:');
    console.log({
      kodeProv: record.kode_prov,
      kodeKec: record.kode_kec,
      r421Desk: record.r421_desk
    });
    count++;
    if (count > 0) break;
  }
}

testCsv().catch(console.error);

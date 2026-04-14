import { db } from '../src/db';
import { dataFinal } from '../src/db/schema';
import { count } from 'drizzle-orm';

async function verify() {
  const result = await db.select({ count: count() }).from(dataFinal);
  console.log('Total records in database:', result[0].count);
  
  const sample = await db.select().from(dataFinal).limit(5);
  console.log('\nSample records (first 5):');
  sample.forEach((row, i) => {
    console.log(`${i+1}. ID: ${row.id}, kodeKec: ${row.kodeKec}, r421_desk: ${row.r421Desk}, r421: ${row.r421}`);
  });
}

verify().catch(console.error);

import { db } from '@/src/db'
import { adminUsers } from '@/src/db/schema'
import * as bcrypt from 'bcryptjs'

async function createAdmin() {
  const passwordHash = await bcrypt.hash('admin123', 10)
  
  await db.insert(adminUsers).values({
    username: 'admin',
    passwordHash,
    name: 'Administrator',
    role: 'superadmin'
  })
  
  console.log('✅ Admin berhasil dibuat di database')
  console.log('   Username: admin')
  console.log('   Password: admin123')
}

createAdmin()

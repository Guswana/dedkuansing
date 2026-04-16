'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/src/db'
import { eq } from 'drizzle-orm'
import { adminUsers } from '@/src/db/schema'
import * as bcrypt from 'bcryptjs'

export async function login(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  // Cari user dari database
  const user = await db.select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .get()

  if (!user) {
    return redirect('/admin/login?error=User not found')
  }

  // Verifikasi password hash
  const passwordValid = await bcrypt.compare(password, user.passwordHash)

  if (!passwordValid) {
    return redirect('/admin/login?error=Invalid password')
  }

  // Login berhasil
  const cookieStore = await cookies()
  
  cookieStore.set('admin_session', user.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 hari
    path: '/'
  })
  
  return redirect('/admin')
}

export async function logout() {
  const cookieStore = await cookies()
  
  cookieStore.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })
  
  return redirect('/')
}



// Dapatkan data user
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('admin_session')?.value
  
  if (!userId) return null

  return await db.select({
    id: adminUsers.id,
    username: adminUsers.username,
    name: adminUsers.name,
    role: adminUsers.role
  })
  .from(adminUsers)
  .where(eq(adminUsers.id, parseInt(userId)))
  .get()
}

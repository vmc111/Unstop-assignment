export type AuthUser = {
  id: number
  username: string
  email?: string
  firstName?: string
  lastName?: string
  image?: string
  token: string
  gender?: string
}

const STORAGE_KEY = 'unstop_auth_user'

function emitAuthChanged() {
  try {
    window.dispatchEvent(new Event('auth-changed'))
  } catch {}
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem(STORAGE_KEY)
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function storeUser(user: AuthUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  emitAuthChanged()
}

export function clearUser() {
  localStorage.removeItem(STORAGE_KEY)
  emitAuthChanged()
}

export async function loginApi(params: { username?: string; email?: string; password: string }) {
  // DummyJSON supports username or email + password on this endpoint
  const payload: Record<string, string> = { password: params.password }
  if (params.username) payload.username = params.username
  if (params.email) payload.email = params.email

  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || 'Login failed')
  }
  const data = (await res.json()) as any

  const user: AuthUser = {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    image: data.image,
    token: data.token,
    gender: data.gender,
  }
  storeUser(user)
  return user
}

export function logout() {
  clearUser()
}

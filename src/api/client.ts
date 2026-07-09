// Client HTTP terpusat. Semua panggilan API lewat sini biar konsisten:
// base URL, header, token auth, penanganan error, & auto-refresh saat 401.
import { getAccessToken } from '@/api/auth/tokenStore'
import { refreshAccessToken } from '@/api/auth/refreshToken'

const BASE_URL =
  import.meta.env.VITE_API_URL ?? ''

type ApiOptions = Omit<RequestInit, 'body'> & { body?: unknown }

// Endpoint auth yang TIDAK boleh memicu auto-refresh:
// mencegah rekursi (/auth/refresh) & pesan error yang salah (login gagal ≠ sesi berakhir).
const NO_REFRESH = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout']

export async function apiFetch<T>(
  path: string,
  options: ApiOptions = {},
  _retry = false,
): Promise<T> {
  const { body, headers, ...rest } = options
  const token = getAccessToken()

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  // Access token kadaluarsa → tukar lewat refresh token sekali, lalu ulangi request.
  if (response.status === 401 && !_retry && !NO_REFRESH.includes(path)) {
    try {
      await refreshAccessToken()
    } catch {
      throw new Error('Sesi berakhir. Silakan login lagi.')
    }
    return apiFetch<T>(path, options, true)
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    // FastAPI biasanya kirim { detail }, backend lain { message }.
    throw new Error(data.detail || data.message || `Request gagal (${response.status})`)
  }

  if (response.status === 204) return undefined as T // No Content
  return response.json() as Promise<T>
}

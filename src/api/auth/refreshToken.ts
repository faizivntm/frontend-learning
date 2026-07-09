import { getRefreshToken, setTokens, clearTokens } from './tokenStore'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''

let inFlight: Promise<string> | null = null

// Single-flight: banyak request yang 401 berbarengan cukup memicu SATU refresh.
// Penting karena refresh token berotasi di server — refresh paralel akan saling
// membatalkan (yang satu mencabut token yang sedang dipakai yang lain).
export function refreshAccessToken(): Promise<string> {
  if (!inFlight) {
    inFlight = doRefresh().finally(() => {
      inFlight = null
    })
  }
  return inFlight
}

async function doRefresh(): Promise<string> {
  const refresh_token = getRefreshToken()
  if (!refresh_token) throw new Error('Tidak ada refresh token')

  // Sengaja pakai fetch mentah, bukan apiFetch, biar tidak rekursif ke logika 401.
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token }),
  })

  if (!res.ok) {
    clearTokens() // refresh token invalid/kadaluarsa → sesi berakhir
    throw new Error('Refresh token tidak valid')
  }

  const data = await res.json()
  setTokens(data.access_token, data.refresh_token) // simpan pasangan token BARU (rotasi)
  return data.access_token
}

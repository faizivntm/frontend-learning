import { apiFetch } from '@/api/client'
import { getRefreshToken, clearTokens } from './tokenStore'

// Cabut (revoke) refresh token di server, lalu bersihkan token lokal.
// Kalau request gagal (mis. offline / token sudah invalid), lokal tetap dibersihkan.
export default async function logoutUser(): Promise<void> {
  const refresh_token = getRefreshToken()
  if (refresh_token) {
    await apiFetch('/auth/logout', {
      method: 'POST',
      body: { refresh_token },
    }).catch(() => {})
  }
  clearTokens()
}

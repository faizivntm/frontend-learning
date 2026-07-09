import { apiFetch } from '@/api/client'

export interface LoginCredentials {
  email: string
  password: string
}

// Backend mengembalikan { access_token, refresh_token, token_type }.
interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
}

export default async function loginUser(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const res = await apiFetch<TokenResponse>('/auth/login', {
    method: 'POST',
    body: credentials,
  })
  return { token: res.access_token, refreshToken: res.refresh_token }
}

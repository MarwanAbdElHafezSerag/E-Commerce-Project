import { createContext, useEffect, useState, useCallback } from 'react'
import * as authApi from '../api/authApi'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  // On first mount, check localStorage for a token and, if present,
  // verify it's still valid by fetching the authenticated user.
  useEffect(() => {
    const token = localStorage.getItem('token')
    const cachedUser = localStorage.getItem('user')

    if (!token) {
      setInitializing(false)
      return
    }

    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser))
      } catch {
        // ignore malformed cache
      }
    }

    authApi
      .getAuthUser()
      .then((freshUser) => {
        setUser(freshUser)
        localStorage.setItem('user', JSON.stringify(freshUser))
      })
      .catch(() => {
        // Token expired/invalid — clear the stale session.
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
      })
      .finally(() => setInitializing(false))
  }, [])

  const login = useCallback(async (credentials) => {
    const data = await authApi.login(credentials)
    const token = data.accessToken || data.token
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(data))
    setUser(data)
    return data
  }, [])

  const register = useCallback(async (payload) => {
    // Mock registration flow (DummyJSON does not persist new users).
    const created = await authApi.register(payload)
    return created
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  const value = {
    user,
    isAuthenticated: Boolean(user),
    initializing,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

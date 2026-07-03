import axiosClient from './axiosClient'

/**
 * Log a user in against DummyJSON's auth endpoint.
 * Returns the user object including a JWT `token` / `accessToken`.
 */
export function login({ username, password }) {
  return axiosClient
    .post('/auth/login', {
      username,
      password,
      expiresInMins: 60
    })
    .then((res) => res.data)
}

/**
 * DummyJSON has no real registration endpoint that persists users,
 * so this uses their "add user" endpoint to simulate registration.
 * It returns a mock created-user object (not actually saved server-side).
 */
export function register({ firstName, lastName, email, username, password }) {
  return axiosClient
    .post('/users/add', {
      firstName,
      lastName,
      email,
      username,
      password
    })
    .then((res) => res.data)
}

/**
 * Fetch the currently authenticated user's profile using the stored token.
 */
export function getAuthUser() {
  return axiosClient.get('/auth/me').then((res) => res.data)
}

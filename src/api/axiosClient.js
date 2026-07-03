import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Attach the persisted token to every outgoing request, if present.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Normalize errors so components can rely on a consistent shape:
// { message, status }
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong while talking to the API.'

    // DummyJSON invalidates tokens after a short expiry window.
    // If a protected request comes back unauthorized, clear the
    // stale session so the app doesn't get stuck in a broken state.
    if (status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }

    return Promise.reject({ message, status })
  }
)

export default axiosClient

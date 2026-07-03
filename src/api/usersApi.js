import axiosClient from './axiosClient'

export function getUsers({ limit = 10, skip = 0 } = {}) {
  return axiosClient
    .get('/users', { params: { limit, skip } })
    .then((res) => res.data) // { users, total, skip, limit }
}

export function getUser(id) {
  return axiosClient.get(`/users/${id}`).then((res) => res.data)
}

export function searchUsers({ q, limit = 10, skip = 0 }) {
  return axiosClient
    .get('/users/search', { params: { q, limit, skip } })
    .then((res) => res.data)
}

/**
 * Filter users by a specific key/value, e.g. filterUsers('gender', 'female')
 */
export function filterUsers(key, value, { limit = 10, skip = 0 } = {}) {
  return axiosClient
    .get(`/users/filter`, { params: { key, value, limit, skip } })
    .then((res) => res.data)
}

export function addUser(payload) {
  return axiosClient.post('/users/add', payload).then((res) => res.data)
}

export function updateUser(id, payload) {
  return axiosClient.put(`/users/${id}`, payload).then((res) => res.data)
}

export function deleteUser(id) {
  return axiosClient.delete(`/users/${id}`).then((res) => res.data)
}

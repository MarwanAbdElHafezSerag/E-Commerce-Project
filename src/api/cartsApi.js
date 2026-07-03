import axiosClient from './axiosClient'

export function getCarts({ limit = 10, skip = 0 } = {}) {
  return axiosClient
    .get('/carts', { params: { limit, skip } })
    .then((res) => res.data) // { carts, total, skip, limit }
}

export function getCart(id) {
  return axiosClient.get(`/carts/${id}`).then((res) => res.data)
}

export function getCartsByUser(userId) {
  return axiosClient.get(`/carts/user/${userId}`).then((res) => res.data)
}

export function addCart(payload) {
  // payload: { userId, products: [{ id, quantity }] }
  return axiosClient.post('/carts/add', payload).then((res) => res.data)
}

export function updateCart(id, payload) {
  return axiosClient.put(`/carts/${id}`, payload).then((res) => res.data)
}

export function deleteCart(id) {
  return axiosClient.delete(`/carts/${id}`).then((res) => res.data)
}

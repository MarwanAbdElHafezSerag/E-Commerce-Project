import axiosClient from './axiosClient'

/**
 * Get all products, with optional pagination and sorting.
 * @param {Object} params
 * @param {number} params.limit
 * @param {number} params.skip
 * @param {string} params.sortBy - e.g. 'title' | 'price' | 'rating'
 * @param {'asc'|'desc'} params.order
 */
export function getProducts({ limit = 12, skip = 0, sortBy, order } = {}) {
  return axiosClient
    .get('/products', { params: { limit, skip, sortBy, order } })
    .then((res) => res.data) // { products, total, skip, limit }
}

export function getProduct(id) {
  return axiosClient.get(`/products/${id}`).then((res) => res.data)
}

export function searchProducts({ q, limit = 12, skip = 0 }) {
  return axiosClient
    .get('/products/search', { params: { q, limit, skip } })
    .then((res) => res.data)
}

export function getCategories() {
  // DummyJSON returns an array of { slug, name, url }
  return axiosClient.get('/products/categories').then((res) => res.data)
}

export function getProductsByCategory(category, { limit = 12, skip = 0 } = {}) {
  return axiosClient
    .get(`/products/category/${category}`, { params: { limit, skip } })
    .then((res) => res.data)
}

export function addProduct(payload) {
  return axiosClient.post('/products/add', payload).then((res) => res.data)
}

export function updateProduct(id, payload) {
  return axiosClient.put(`/products/${id}`, payload).then((res) => res.data)
}

export function deleteProduct(id) {
  return axiosClient.delete(`/products/${id}`).then((res) => res.data)
}

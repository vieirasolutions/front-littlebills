import axios from 'axios'
import store from '@/store'

const api = axios.create({
  // baseURL: 'https://littlebills.herokuapp.com'
  baseURL: 'http://0.0.0.0:9000'
})

// Add a request interceptor
api.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

if (localStorage.getItem('lb_access_token')) {
  api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('lb_access_token')}`
  if (Object.keys(store.getters['user/getUser']).length === 0) {
    api({ url: '/users/me', method: 'GET' })
      .then(({ status, data }) => {
        if (status === 200) {
          store.dispatch('user/setUser', data)
        }
      })
      .then(() => {
        api({ url: '/wallets?user=' + store.getters['user/getUser'].id, method: 'GET' })
          .then(({ status, data }) => {
            if (status === 200) {
              store.dispatch('user/setWallet', data[0])
            }
          })
      })
  }
}

export default api

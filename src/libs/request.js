import axios from 'axios'
import { getToken, clearToken } from '@/libs/tool'
import iView from 'iview'

const beforeRequest = (config) => {
  let token = getToken()
  config.headers = config.headers || {}
  if (token && !config.headers['Authorization']) {
    config.headers['Authorization'] = token
  }
  return config
}

function requestError (error) {
  return Promise.reject(error)
}

function resPreHandle (response) {
  return response
}

function responseError (error) {
  console.log(error)
  if (error.response.status === 401) {
    if (error.response.data.notify) {
      iView.Message.error(error.response.data.message)
    }
    clearToken()
  }
  return Promise.reject(error)
}

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 15 * 1000,
})

instance.interceptors.request.use(beforeRequest, requestError)
instance.interceptors.response.use(resPreHandle, responseError)

export default instance
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
  if (error.response.status === 401) {
    iView.Message.error('非法请求，请登录')
    clearToken()
  }
  return Promise.reject(error)
}

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 15 * 1000,
})

instance.interceptors.request.use(beforeRequest, requestError)
instance.interceptors.response.use(resPreHandle, responseError)

export default instance
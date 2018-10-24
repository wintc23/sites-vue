import axios from 'axios'
import { getToken, clearToken } from '@/libs/tool'
import iView from 'iview'

const beforeRequest = (config) => {
  let token = getToken()
  if (token && token.indexOf(':') === -1) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = token
  }
  return config
}

function requestError (error) {
  return Promise.reject(error)
}

function resPreHandle (response) {
  if (response.status === 401) { // 请求需要验证的接口未通过认证
    iView.Message.error('非法请求，请登录22')
    clearToken()
  }
  return response
}

function responseError (error) {
  return Promise.reject(error)
}

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 15 * 1000,
})

instance.interceptors.request.use(beforeRequest, requestError)
instance.interceptors.response.use(resPreHandle, responseError)

export default instance
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 2500
})

function beforeRequest (config) {
  return config
}

function requestError (error) {
  console.log(error)
}

function resPreHandle (response) {
  //
}

function responseError (error) {
  console.log(error)
}

instance.interceptors.request.use(beforeRequest, requestError)
instance.interceptors.request.use(resPreHandle, responseError)
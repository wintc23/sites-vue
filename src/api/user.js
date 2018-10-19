import axios from '@/libs/request'

export default {
  login (params) {
    console.log('hello')
    return axios.post('/login', params)
  }
}
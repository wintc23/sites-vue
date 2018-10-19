import axios from '@/libs/request'

export default {
  login (params) {
    return axios.post('/login', params)
  }
}
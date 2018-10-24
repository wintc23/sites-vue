import axios from '@/libs/request'

export default {
  register (params) {
    return axios.post('/register/', params)
  },
  login (params) {
    return axios.post('/tokens/', {}, {
      headers: {
        'Authorization': `${params.email}:${params.password}`
      }
    })
  },
  getUserInfoByToken () {
    return axios.get('/user/')
  }
}
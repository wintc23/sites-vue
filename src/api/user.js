import axios from '@/libs/request'

export default {
  register (params) {
    return axios.post('/api/register/', params)
  },
  login (params) {
    return axios.post('/api/tokens/', {}, {
      headers: {
        'Authorization': `${params.email}:${params.password}`
      }
    })
  },
  getUserInfoByToken () {
    return axios.get('/api/user/')
  }
}
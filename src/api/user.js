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
  },
  getUserInfoById (id) {
    return axios.get('/api/userinfo/?id=' + id)
  },
  getManagerId () {
    return axios.get('/api/userid/')
  },
  confirmAccount (params) {
    return axios.post('/api/confirm/', params)
  },
  changePasswd (params) {
    return axios.post('/api/change-password/', params)
  }
}
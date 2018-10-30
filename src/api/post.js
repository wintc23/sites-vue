import axios from '@/libs/request'

export default {
  getPosts (page) {
    return axios.get('/posts/?page=' + page)
  }
}
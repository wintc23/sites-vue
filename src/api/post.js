import axios from '@/libs/request'

export default {
  getPosts (page) {
    return axios.get('/api/posts/?page=' + page)
  },
  getPost (id) {
    return axios.get('/api/post/?id=' + id)
  },
  getPostType () {
    return axios.get('/api/post-types/')
  },
  updateType (params) {
    return axios.post('/api/type-manage/', params)
  },
  addType (params) {
    return axios.post('/api/type-add/', params)
  },
  getTagList () {
    return axios.get('/api/post-tags/')
  },
  updateTag (params) {
    return axios.post('/api/tag-manage/', params)
  },
  addTag (params) {
    return axios.post('/api/tag-add/', params)
  }
}
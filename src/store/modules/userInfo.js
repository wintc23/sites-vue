import userApi from '@/api/user'
import { getToken, clearToken } from '@/libs/tool'

export default {
  namespaced: true,
  state: {
    username: '',
    avatar: '',
    manager: false
  },
  actions: {
    getUserInfo (context) {
      if (getToken()) {
        userApi.getUserInfoByToken().then(res => {
          if (res.status === 200) {
            context.commit('setInfo', res.data)
          }
        }).catch(error => {
          clearToken()
        })
      }
    }
  },
  mutations: {
    setInfo (state, data) {
      for (let key in data) {
        state[key] = data[key]
      }
    },
    clearInfo (state) {
      state.username = ''
      state.avatar = ''
      state.manager = false
    }
  }
}
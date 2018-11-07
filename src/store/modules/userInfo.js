import userApi from '@/api/user'
import { getToken, clearToken } from '@/libs/tool'

export default {
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
      state.obj = { ...data }
    },
    clearInfo (state) {
      state.obj = {
        username: '',
        avatar: '',
        manager: false
      }
    }
  }
}
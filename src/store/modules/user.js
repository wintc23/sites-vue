// 用户信息集，避免重复获取
import userApi from '@/api/user'

export default {
  namespaced: true,
  state: {
    info: {}
  },
  actions: {
    getInfo (context, data) {
      if (context.state.info[data.id]) {
        data.callback && data.callback()
        return 
      }
      userApi.getUserInfoById(data.id).then(res => {
        if (res.status === 200) {
          context.commit('setInfo', res.data)
          data.callback && data.callback()
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mutations: {
    setInfo (state, data) {
      state.info[data.id] = data
    }
  }
}


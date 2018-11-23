export default {
  namespaced: true,
  state: {
    readList: {}
  },
  mutations: {
    addReadTime (state, data) {
      state.readList[data.id] = true
    }
  }
}
export default {
  state: {
    tempObj: {}
  },
  mutations: {
    updatedTempObj (state, tempObj) {
      state.tempObj = tempObj
    }
  },
  actions: {
    updatedTempObj ({commit}, tempObj) {
      commit('updatedTempObj', tempObj)
    }
  }
}

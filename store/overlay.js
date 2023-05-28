export const state = () => ({
  visible: false,
})

export const mutations = {
  update(state, value) {
    state.visible = value
  },
}

export default {
  state,
  mutations,
}

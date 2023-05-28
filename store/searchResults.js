import { get } from 'lodash-es'
export const state = () => ({
  item: {
    preHeading: '',
    heading: '',
    results: [],
  },
})

export const mutations = {
  store(state, value) {
    state.item = value
  },
}

export default {
  state,
  mutations,
  getters: {
    item: (state) => get(state, 'item'),
  },
}

import { throttle } from 'lodash-es'

export const state = () => {
  return {
    width: 0,
    height: 0,
    container: 0,
  }
}

export const actions = {
  init({ commit, state }, payload) {
    if (!process.browser) return
    if (state.width && state.height) return

    const calcWinsize = () => {
      const payload = { width: window.innerWidth, height: window.innerHeight }
      const container = document.querySelector('.tc-container')

      // if (!container) {
      //   console.log('recalculating')
      //   return setTimeout(calcWinsize, 500)
      // }
      commit('update', payload)
      commit('update', { container: container && container.offsetWidth })
    }

    calcWinsize()
    window.addEventListener('resize', throttle(calcWinsize, 500))
  },
}

export const mutations = {
  update(state, payload) {
    Object.assign(state, payload)
  },
  container(state, payload) {
    Object.assign(state, payload)
  },
}

export const getters = {
  customVariables(state) {
    return {
      '--container-width': state.container + 'px',
      '--container-edge': (state.width - state.container) / 2 + 'px',
      '--container-col': state.container / 12 + 'px',
      '--container-col-5': (state.container / 12) * 5 + 'px',
      '--sidebar-width': state.container / 4 + 'px',
    }
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}

import Vue from 'vue'
import { forEach, get } from 'lodash-es'
import graphqlClient from '@/graph-ql/client'

export const state = () => ({
  loaded: false,
  previewToken: null,
  transNav: true,
  bannerOpen: true,
  cache: {
    'popup-newsletter': false,
  },
})

export const actions = {
  async index({ state, commit, getters }) {
    const response = await graphqlClient({ token: state.previewToken }).query({
      query: require('~/graph-ql/model/globals/index.graphql'),
      variables: {},
    })

    commit('store', response.data)
    commit('loaded', true)
  },

  setToken({ commit }, token) {
    commit('store', {
      previewToken: token,
    })
  },
}

export const mutations = {
  loaded(state) {
    state.loaded = true
  },
  store(state, globals) {
    forEach(globals, (item, key) => {
      Vue.set(state, key, item)
    })
  },

  transNav(state, val) {
    state.transNav = val
  },

  closeBanner(state) {
    state.bannerOpen = false
  },

  cache(state, args) {
    Vue.set(state.cache, args.key, args.value)
  },
}

export default {
  state,
  actions,
  mutations,
  getters: {
    siteBanner: (state) => get(state, 'siteBanner'),
    newsletter: (state) => get(state, 'newsletter'),
    settings: (state) => get(state, 'settings'),
    seo: (state) => get(state, 'seo.seoSettingsGlobal[0]'),
    redirects: (state) => get(state, 'redirects.redirects'),
    schema: (state) => get(state, 'schema'),
    analytics: (state) => get(state, 'analytics'),
    footer: (state) => get(state, 'footer'),
    primary: (state) => get(state, 'primary'),
    footerPrimary: (state) => get(state, 'footerPrimary'),
  },
}

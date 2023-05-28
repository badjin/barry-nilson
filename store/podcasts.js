// eslint-disable-next-line no-unused-vars
import {
  entryActions,
  entryGetters,
  entryMutations,
  entryState,
} from '@/store/entry'

import getQuery from '@/graph-ql/model/podcasts/get.graphql'
import indexQuery from '@/graph-ql/model/podcasts/index.graphql'

export const state = () => {
  return {
    ...entryState(),
    limit: 12,
    taxonomies: {},
    industry: null,
    type: null,
  }
}

export const actions = {
  ...entryActions({
    identifier: 'podcasts',
    section: 'podcasts',
    getQuery,
    indexQuery,
  }),
}

export const getters = {
  ...entryGetters(),
}

export const mutations = {
  ...entryMutations(),
}

export default {
  state,
  actions,
  mutations,
  getters,
}

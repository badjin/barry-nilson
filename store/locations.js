// eslint-disable-next-line no-unused-vars
import {
  entryActions,
  entryGetters,
  entryMutations,
  entryState,
} from '@/store/entry'

import indexQuery from '@/graph-ql/model/locations/index.graphql'
import getQuery from '@/graph-ql/model/locations/get.graphql'

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
    identifier: 'locations',
    section: 'locations',
    indexQuery,
    getQuery,
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

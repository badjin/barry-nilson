// eslint-disable-next-line no-unused-vars
import {
  entryActions,
  entryGetters,
  entryMutations,
  entryState,
} from '@/store/entry'

import getQuery from '@/graph-ql/model/singles/knowledgeHub.graphql'

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
    identifier: 'knowledgeHub',
    section: 'knowledgeHub',
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

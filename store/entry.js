/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import { first, forEach, values } from 'lodash-es'
import Vue from 'vue'
import get from 'lodash-es/get'
import { makeClass } from '@/models/entry'
import graphqlClient from '@/graph-ql/client'

export const entryState = () => {
  return {
    current: '',
    items: {},
    page: 0,
    limit: 10,
    type: 'entries',
    latest: {},
  }
}

export const state = () => {
  return {
    ...entryState(),
  }
}

export const entryMutations = () => ({
  empty(state) {
    state.items = {}
  },

  store(state, items) {
    forEach(items, (item) => {
      if (state.items[item.id] && state.items[item.id].fullyLoaded) {
        return Vue.set(state.items, item.id, {
          ...state.items[item.id],
          ...item,
        })
      }
      Vue.set(state.items, item.id, item)
    })
  },

  select(state, id) {
    state.current = id
  },

  latest(state, items) {
    forEach(items, (item) => {
      if (item.id) {
        Vue.set(state.latest, item.id, item)
      }
    })
  },

  noMoreItems(state) {
    state.noMoreItems = true
  },

  SET_PAGE_LIMIT(state, payload) {
    state.limit = payload
  },
})

export const mutations = {
  ...entryMutations(),

  CHANGE_TYPE(state, payload) {
    state.type = payload
  },
}

export const queries = {
  async getEntry({ context, slug, query, variables, identifier }) {
    let id
    const args = { context, slug, query, variables, identifier }
    try {
      const entry = context.getters.findBySlug(slug)
      // We look if the entry is in the store
      // by searching by slug
      if (entry && entry.fullyLoaded) {
        id = context.getters.findBySlug(slug).id
        context.commit('select', id)
      } else {
        let error = true
        let attempts = 0
        let response
        while (error && attempts < 9) {
          try {
            response = await graphqlClient({
              token: context.rootState.globals.previewToken,
            }).query({
              query,
              variables,
            })
            error = false
          } catch (err) {
            // console.error('Caught error fetching query', err)
          }
          attempts++
        }
        // const response = await graphqlClient({
        //   token: context.rootState.globals.previewToken,
        // })
        //   .query({
        //     query,
        //     variables,
        //   })
        //   .catch((error) => {
        //     console.error(error)
        //     console.error(Object.keys(error))
        //     console.dir(error)
        //   })
        const newEntry =
          get(response, 'data.entry') ||
          get(response, 'data.entries[0]') ||
          get(response, 'data.category') ||
          get(response, 'data.categories[0]')
        // add the flag
        context.commit('store', [
          {
            fullyLoaded: true,
            ...newEntry,
          },
        ])

        id = get(newEntry, 'id')
        if (id) context.commit('select', id)
        else {
          // console.log(response, variables)
          // eslint-disable-next-line no-throw-literal
          throw '404 Error | Page not found'
        }
      }
    } catch (err) {
      console.log(
        'Caught error in entry.js queries getEntry, identifier:',
        identifier,
        err,
        'args.variables: ',
        args.variables
      )
      // eslint-disable-next-line no-throw-literal
      throw '404 Error | Page not found'
    }
  },

  async indexEntry({ context, query, variables }) {
    try {
      let error = true
      let attempts = 0
      let response
      while (error && attempts < 9) {
        try {
          response = await graphqlClient({
            token: context.rootState.globals.previewToken,
          }).query({
            query,
            variables: {
              ...variables,
              search: context.state.search || '',
              limit: context.state.limit || 10,
              offset: context.state.page * context.state.limit,
            },
          })
          error = false
        } catch (err) {
          // console.error('Caught error fetching query', err)
        }
        attempts++
      }

      // console.log('Response', response)
      context.commit(
        'store',
        get(response, 'data.entries') || get(response, 'data.categories')
      )
    } catch (err) {
      console.log('Caught error in entry.js queries indexEntry', err)
    }
  },

  async latestEntry({ context, query, variables }) {
    try {
      const response = await graphqlClient({
        token: '',
      }).query({
        query,
        variables,
      })
      context.commit('latest', response.data.entries)
    } catch (err) {
      console.log('Caught error in entry.js queries latestEntry', err)
    }
  },
}

export const entryGetters = () => ({
  item(state) {
    return state.current ? makeClass(state.items[state.current]) : {}
    // eslint-disable-next-line no-undef
  },

  items(state) {
    // eslint-disable-next-line new-cap
    return values(state.items).map(makeClass)
  },

  latest(state) {
    return values(state.latest).map(makeClass)
  },

  findBySlug: (state, getters) => (slug) => {
    return getters.items.find((item) => item.slug === slug)
  },
})

export const entryActions = ({
  identifier,
  section,
  indexQuery,
  latestQuery,
  getQuery,
  authorQuery,
}) => ({
  async get(context, slug) {
    console.log('Getting page with slug ', slug)
    if (!getQuery) return
    try {
      await queries.getEntry({
        identifier,
        context,
        slug,
        query: getQuery,
        variables: {
          section,
          slug,
          site: process.env.FRONTEND_SITE || 'default',
        },
      })
    } catch (err) {
      console.log(
        'Caught error in entry.js entryActions get, identifier: ',
        identifier,
        err
      )
    }
  },
  async index(context, limit) {
    if (!indexQuery) return
    context.commit('SET_PAGE_LIMIT', limit)
    try {
      await queries.indexEntry({
        context,
        query: indexQuery,
        variables: {
          section,
        },
      })
    } catch (err) {
      console.log('Caught error in entry.js entryActions index', err)
    }
  },

  async indexByAuthor(context, value) {
    if (!authorQuery) return
    context.commit('SET_PAGE_LIMIT', 4)
    context.commit('empty')
    try {
      await queries.indexEntry({
        context,
        query: authorQuery,
        variables: {
          section,
          authorId: value,
        },
      })
    } catch (err) {
      console.log('Caught error in entry.js entryActions index', err)
    }
  },

  async latest(context) {
    if (!latestQuery) return
    try {
      await queries.latestEntry({
        context,
        query: latestQuery,
        variables: {
          section,
        },
      })
    } catch (err) {
      console.log('Caught error in entry.js entryActions latest', err)
    }
  },
})

export const getters = {
  ...entryGetters(),
  item(state, getters, rootState) {
    // Look at the the type set by CHANGE_TYPE
    // and retrieve the state
    const module = rootState[state.type]
    if (!module) return {}
    try {
      return module.current ? makeClass(module.items[module.current]) : {}
    } catch (err) {
      console.log('Caught error in entry.js getters item', err)
    }
    return {}
  },
}

export default {
  state,
  getters,
  mutations,
}

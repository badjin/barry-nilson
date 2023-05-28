// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import { get } from 'lodash-es'

export const state = () => {
  return {
    products: {
      test: {
        title: "I'm here",
      },
    },
    cartItems: 0,
  }
}

export const actions = {
  async get({ commit }, productHandle) {
    console.log('Getting product with handle', productHandle)
    if (Vue.prototype.ShopifySDK) {
      const product = await Vue.prototype.ShopifySDK.product.fetchByHandle(
        productHandle
      )
      console.log('Found product: ', product ? 'yes' : 'no')
      commit('product', product)
    }
  },
  openCart() {
    console.log('Opening cart')
    Vue.prototype.ShopifyUI.openCart()
  },
  countCartItems({ commit }) {
    const cartItems = get(
      Vue,
      'prototype.ShopifyUI.components.cart.0.lineItems',
      []
    )
    let count = 0
    cartItems.forEach((item) => {
      count += item.quantity
    })
    commit('thing', {
      path: 'cartItems',
      value: count,
    })
  },
}

export const mutations = {
  product(state, product) {
    if (product && product.handle) {
      Vue.set(state.products, `${product.handle}`, product)
    }
  },
  thing(state, args) {
    state[args.path] = args.value
  },
}

export const getters = {
  product: (state) => (handle) => {
    return state.products[handle]
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}

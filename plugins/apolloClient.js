import Vue from 'vue'
import ApolloClient from '@/graph-ql/client'

Vue.prototype.$apolloClient = ApolloClient({ token: '' })

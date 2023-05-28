<template>
  <div>
    <PageHerosLocation :module="hero" />
    <PageContentLocation v-if="fetched" :module="body" />
    <ContentBuilder :modules="page.contentBuilder" />
  </div>
</template>

<script>
import { trimStart, trimEnd } from 'lodash-es'
import seo from '@/models/seo.js'
export default {
  asyncData(context) {
    return {
      uri: trimEnd(trimStart(context.route.path, '/'), '/'),
      error: context.error,
    }
  },
  data() {
    return {
      fetched: false,
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch('locations/get', this.uri)
      this.$store.commit('globals/transNav', true)
      this.$store.commit('entry/CHANGE_TYPE', 'locations')
    } catch (e) {
      this.error('404', e)
    }
    if (!Object.keys(this.page || {}).length) {
      this.error('404', 'No page found')
    }
    this.fetched = true
  },
  head() {
    return seo.bind(this)(this.page)
  },

  computed: {
    page() {
      return this.$store.getters['locations/item'] || []
    },
    hero() {
      return {
        heading: this.page.heading || this.page.title,
        parentLinks: this.uri,
      }
    },
    body() {
      return {
        name: this.page.heading || this.page.title,
        contactDetail: this.page.contactDetail,
        howToGetHere: this.page.howToGetHere,
        locationMapDetails: this.page.locationMapDetails,
        address: this.page.address,
        openingHours: this.page.openingHours || [],
        postalAddress: this.page.postalAddress,
      }
    },
  },
  async mounted() {
    // wait for fetch to be true
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.fetched) {
          clearInterval(interval)
          resolve()
        }
      }, 100)
    })
  },
}
</script>

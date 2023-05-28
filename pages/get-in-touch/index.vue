<template>
  <div>
    <PageHerosContact :module="hero" />
    <ContactForm :module="formMeta" />
    <ContactLocation :module="locationModules" />
    <ContentBuilder :modules="page.contentBuilder" />
  </div>
</template>

<script>
import { get } from 'lodash-es'
import seo from '@/models/seo'
export default {
  layout: 'talkToUs',
  async fetch() {
    try {
      await Promise.all([
        this.$store.dispatch('getInTouch/get', 'getInTouch'),
        this.$store.dispatch('locations/index'),
      ])
      this.$store.commit('globals/transNav', true)
      this.$store.commit('entry/CHANGE_TYPE', 'getInTouch')
    } catch (e) {
      this.error('404', e)
    }
    if (!Object.keys(this.page || {}).length) {
      this.error('404', 'No page found')
    }
  },
  head() {
    return seo.bind(this)(this.page)
  },
  computed: {
    page() {
      return this.$store.getters['getInTouch/item'] || []
    },
    hero() {
      return get(this.page.hero, '[0]') || {}
    },
    formMeta() {
      return get(this.page.formMeta, '[0]') || {}
    },
    locationModules() {
      return this.$store.getters['locations/items'] || []
    },
  },
}
</script>

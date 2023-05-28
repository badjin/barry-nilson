<template>
  <div>
    <PageHerosKitchenSink :module="hero" />
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
  async fetch() {
    try {
      await this.$store.dispatch('kitchen/get', this.uri)
      this.$store.commit('globals/transNav', true)
      this.$store.commit('entry/CHANGE_TYPE', 'kitchen')
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
      return this.$store.getters['kitchen/item'] || []
    },
    hero() {
      return {
        heading: this.page.heading || this.page.title,
        subheading: this.page.subheading,
        wysiwyg: this.page.wysiwyg,
        parentLinks: this.uri,
      }
    },
  },
}
</script>

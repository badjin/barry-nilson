<template>
  <div>
    <PageHerosKnowledgeHub :module="hero" />
    <client-only>
      <PageContentKnowledgeHub :featured="featuredNews" />
    </client-only>
    <ContentBuilder :modules="page.contentBuilder" />
  </div>
</template>

<script>
import { get } from 'lodash-es'
import seo from '@/models/seo'
export default {
  // async fetch() {
  //   await this.$store.dispatch('knowledgeHub/get', 'knowledgeHub')
  //   this.$store.commit('globals/transNav', true)
  //   this.$store.commit('entry/CHANGE_TYPE', 'knowledgeHub')

  //   await this.$store.dispatch('winSize/init')
  // },
  async fetch() {
    try {
      await this.$store.dispatch('knowledgeHub/get', 'knowledgeHub')
      this.$store.commit('globals/transNav', true)
      this.$store.commit('entry/CHANGE_TYPE', 'knowledgeHub')

      await this.$store.dispatch('winSize/init')
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
      return this.$store.getters['knowledgeHub/item'] || []
    },
    hero() {
      return {
        heading: this.page.heading,
        wysiwyg: this.page.wysiwyg,
        image: this.page.image,
      }
    },
    featuredNews() {
      return get(this.page, 'featuredNews') || []
    },
  },
}
</script>

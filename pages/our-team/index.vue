<template>
  <div>
    <PageHerosKnowledgeHub :module="hero" />
    <client-only>
      <PageContentOurTeam :module="body" />
    </client-only>
    <ContentBuilder :modules="page.contentBuilder" />
  </div>
</template>

<script>
import seo from '@/models/seo'
export default {
  async fetch() {
    try {
      await this.$store.dispatch('ourTeam/get', 'ourTeam')
      this.$store.commit('globals/transNav', true)
      this.$store.commit('entry/CHANGE_TYPE', 'ourTeam')

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
      return this.$store.getters['ourTeam/item'] || []
    },
    hero() {
      return {
        heading: this.page.heading,
        wysiwyg: this.page.wysiwyg,
        image: this.page.image,
      }
    },
    body() {
      return {}
    },
  },
}
</script>

<template>
  <div>
    <PageHerosGeneric :module="hero" />
    <div class="tc-container py-c form-container">
      <iframe :src="formUrl" height="100%" width="100%" frameborder="0" />
    </div>
  </div>
</template>

<script>
import get from 'lodash-es/get'
import seo from '@/models/seo'
export default {
  layout: 'member',
  async fetch() {
    try {
      await this.$store.dispatch('subscribe/get', 'subscribe')
      this.$store.commit('globals/transNav', true)
      this.$store.commit('entry/CHANGE_TYPE', 'subscribe')
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
      return this.$store.getters['subscribe/item'] || []
    },
    hero() {
      return {
        heading: this.page.heading || this.page.title,
      }
    },
    subscribeModule() {
      return this.$store.getters['globals/newsletter']
    },
    popupModule() {
      return get(this.subscribeModule, 'newsletter[0]') || {}
    },
    formUrl() {
      const popup = get(this.popupModule, 'popupWindow[0]') || ''
      return popup.formUrl
    },
  },
  mounted() {
    this.openPopup()
  },
  methods: {
    openPopup() {
      this.$store.commit('globals/cache', {
        key: 'popup-newsletter',
        value: true,
      })
    },
  },
}
</script>
<style lang="postcss" scoped>
.form-container {
  height: 2000px;
  max-width: 860px;
  max-height: 2000px;
  overflow-y: auto;
}

@screen md {
  .form-container {
    height: 1300px;
    max-height: 1300px;
    overflow-y: auto;
  }
}
</style>

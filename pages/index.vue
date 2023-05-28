<template>
  <div>
    <PageHerosHomepage :module="hero" />
    <ContentBuilder :modules="page.contentBuilder" />
  </div>
</template>

<script>
import seo from '@/models/seo'
export default {
  async fetch() {
    // Get the Home page
    await Promise.all([
      this.$store.dispatch('homepage/get', 'homepage'),
      this.$store.dispatch('winSize/init'),
    ])
    this.$store.commit('globals/transNav', true)
    this.$store.commit('entry/CHANGE_TYPE', 'homepage')
  },
  head() {
    return seo.bind(this)(this.page)
  },
  computed: {
    page() {
      return this.$store.getters['homepage/item'] || []
    },
    hero() {
      return {
        heading: this.page.heading,
        description: this.page.description,
        image: this.page.image,
        videoClip: this.page.videoClip,
        mediaSwitch: this.page.mediaSwitch,
        ctas: this.page.ctas,
      }
    },
  },
  mounted() {
    this.fetchLatest()
  },
  methods: {
    async fetchLatest() {
      await Promise.all([
        this.$store.dispatch('homepage/get', 'homepage'),
        this.$store.dispatch('podcasts/index'),
      ])
    },
  },
}
</script>

<template>
  <div>
    <PageHerosGeneric :module="{ heading: 'Search' }" />
    <client-only>
      <SearchResult :query="page.query" />
    </client-only>
  </div>
</template>

<script>
import seo from '@/models/seo.js'
export default {
  head() {
    return seo.bind(this)(this.page)
  },
  computed: {
    page() {
      return this.$store.getters['searchResults/item'] || []
    },
  },
}
</script>

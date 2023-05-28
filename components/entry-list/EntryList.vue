<template>
  <div>
    <div
      class="flex justify-between"
      :class="(module.heading || hasCta) && 'lg:pb-10'"
    >
      <h2 v-show="module.heading" class="tc-component-h2">
        {{ module.heading }}
      </h2>
      <CraftLink v-if="hasCta" :link="module.cta">
        <ButtonPrimary colour="#003E53">{{
          module.cta.customText || module.cta.text
        }}</ButtonPrimary>
      </CraftLink>
    </div>
    <CardGrid :cards="moreNews" card-type="Custom" />
  </div>
</template>
<script>
import { get, chunk, uniqBy } from 'lodash-es'
import searchClient from '@/models/searchClient'
import searchIndex from '@/models/searchIndex'
export default {
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      searchClient,
      searchIndex,
      newsCount: 3,
      hubData: [],
      defaultFilter:
        'services:"Insurance & Health" OR services:"Insurance" OR services:"Health" OR services:"Family Law" OR services:"Wills & Estates"',
    }
  },
  computed: {
    hasCta() {
      return this.module.cta && this.module.cta.url
    },
    override() {
      return get(this.module, 'entryOverride') || null
    },
    moreNews() {
      return chunk(
        uniqBy([...this.override, ...this.hubData], 'id'),
        this.newsCount
      )[0]
    },
    servicesFilters() {
      const categories = get(this.module, 'knowledgeHubService') || []
      return categories.length
        ? categories
            .filter((item) => item.level === 1)
            .map((item) => `services:"${item.title}"`)
            .join(' OR ')
        : this.defaultFilter
    },
    categoryFilters() {
      const categories = get(this.module, 'knowledgeHubCategory') || []
      return categories.length
        ? categories.map((item) => `categories:"${item.title}"`).join(' OR ')
        : ''
    },
  },
  mounted() {
    if (this.override.length < this.newsCount) {
      this.doRefine()
    }
  },
  methods: {
    async doRefine() {
      const res = await searchClient
        .initIndex(this.searchIndex.knowledgeHub)
        .search('', {
          hitsPerPage: 3,
          filters: this.getFilters(),
        })

      this.hubData = [...res.hits]
    },
    getFilters() {
      const categories = this.categoryFilters
        ? ' AND ' + this.categoryFilters
        : ''
      // return this.servicesFilters
      return this.servicesFilters + categories + ' AND noIndex:false'
    },
  },
}
</script>

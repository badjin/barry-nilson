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
    tagFilters() {
      const tags = get(this.module, 'newsTags') || []
      return tags.length
        ? tags.map((item) => ` AND tags:"${item.title}"`).join(' OR ')
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
          hitsPerPage: 4,
          filters: `type: "news"${this.tagFilters} AND noIndex:false`,
        })

      this.hubData = [...res.hits]
    },
  },
}
</script>

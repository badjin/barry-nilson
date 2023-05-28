<template>
  <div>
    <PageHerosArticle :module="hero" />
    <PageContentArticle :module="body" />
    <ContentBuilder :modules="page.contentBuilder" />
    <div class="tc-container pb-c">
      <CardGrid
        class="border-t border-steelblue border-opacity-30"
        :cards="relatedArticles"
        card-type="Channel"
      />
    </div>
  </div>
</template>

<script>
import { trimStart, trimEnd, chunk, uniqBy, get } from 'lodash-es'
import searchClient from '@/models/searchClient'
import searchIndex from '@/models/searchIndex'
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
      moreArticlesCount: 3,
      searchClient,
      searchIndex,
      hubData: [],
      // parentLink: '',
      fetched: false,
    }
  },
  async fetch() {
    try {
      this.$store.commit('globals/transNav', true)
      await this.$store.dispatch('articles/get', this.uri)

      if (this.hasOverride < this.moreArticlesCount) {
        this.doRefine()
      }
      this.$store.commit('entry/CHANGE_TYPE', 'insights')
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
      return this.$store.getters['articles/item'] || []
    },
    parentLink() {
      // return `knowledge-hub/${this.page.slug || this.page.title}`
      const links = this.uri
        ? this.uri.split('/')
        : trimEnd(trimStart(this.$route.fullPath, '/'), '/').split('/')
      return links.length > 2 ? `${links[0]}/${links[2]}` : this.uri
    },
    hero() {
      return {
        heading: this.page.heading || this.page.title,
        parentLinks: this.parentLink || '',
        postDate: this.page.postDateFormatted,
        categories: this.page.categories,
        image: this.page.image,
        service: Object.keys(this.service).length ? this.service.title : '',
      }
    },
    body() {
      return {
        triggerWarning: this.page.triggerWarning,
        mainContent: this.page.mainContent,
        authors: this.authors,
        articleTags: this.page.articleTags,
        getInTouch: this.page.getInTouch,
        service: Object.keys(this.service).length ? this.service.title : '',
      }
    },
    authors() {
      const authorFromTheTeam = this.page.authorKnowledgeHub?.length
        ? this.page.authorKnowledgeHub
        : []
      const authorFromGuest = this.page.customAuthor?.length
        ? this.page.customAuthor
        : []
      const authors = [...authorFromTheTeam, ...authorFromGuest]
      return authors.length ? authors : [{ name: this.page.author?.name }]
    },
    service() {
      return get(this.page.knowledgeHubService, '[0]') || []
    },
    overrideKnowledge() {
      return this.page.overrideKnowledge || []
    },
    hasOverride() {
      return this.overrideKnowledge?.length || 0
    },
    relatedArticles() {
      return chunk(
        uniqBy([...this.overrideKnowledge, ...this.hubData], 'id'),
        this.moreArticlesCount
      )[0]
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
    this.$store.commit('globals/transNav', true)
    await this.$store.dispatch('articles/get', this.uri)

    if (this.hasOverride < this.moreArticlesCount) {
      this.doRefine()
    }
  },
  methods: {
    async doRefine() {
      const res = await searchClient
        .initIndex(this.searchIndex.knowledgeHub)
        .search('', {
          hitsPerPage: 3,
          filters: `type:articles AND NOT objectID:"${this.page.id}"  AND noIndex:false`,
        })

      this.hubData = [...res.hits]
    },
  },
}
</script>

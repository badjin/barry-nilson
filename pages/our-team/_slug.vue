<template>
  <div>
    <PageHerosMember :module="hero" />
    <PageContentMember :module="body" />
    <ContentBuilder :modules="page.contentBuilder" />
    <div v-if="hubData.length" class="tc-container pb-c">
      <h2 class="tc-component-h2 tc-display1 pb-6 lg:pb-12">
        Insights from
        <span class="hidden lg:inline">{{ firstName }}</span>
        <span class="lg:hidden">{{ firstName }}</span>
      </h2>
      <CardGrid :cards="sliceArticles" card-type="Custom" />
      <div v-if="showButton" class="flex justify-center w-full mt-4 lg:mt-10">
        <nuxt-link
          :to="`/knowledge-hub/?knowledgeHub%5BrefinementList%5D%5Bauthor%5D%5B0%5D=${encodeURIComponent(
            hero?.heading
          )}`"
        >
          <ButtonPrimary>
            View all Insights from {{ firstName }}
          </ButtonPrimary>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { trimStart, trimEnd } from 'lodash-es'
import searchClient from '@/models/searchClient'
import searchIndex from '@/models/searchIndex'
import seo from '@/models/seo.js'
export default {
  layout: 'member',
  asyncData(context) {
    return {
      uri: trimEnd(trimStart(context.route.path, '/'), '/'),
      error: context.error,
    }
  },
  data() {
    return {
      searchClient,
      searchIndex,
      hubData: [],
    }
  },
  async fetch() {
    try {
      this.$store.commit('globals/transNav', true)
      await this.$store.dispatch('team/get', this.uri)
      // await this.$store.dispatch('articles/indexByAuthor', this.page.id)

      this.$store.commit('entry/CHANGE_TYPE', 'team')
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
      return this.$store.getters['team/item'] || []
    },
    firstName() {
      return this.page?.name?.split(' ')[0] || ''
    },
    hero() {
      return {
        heading: this.page.name || this.page.title,
        role: this.page.rolesPositions,
        expertise: this.page.expertise || [],
        location: this.page.location,
        parentLinks: this.uri,
        image: this.page.profile,
        contactDetails: this.page.peopleContactDetails,
        firstName: this.firstName,
      }
    },
    body() {
      return {
        mainContent: this.page.description,
        skills: this.page.peopleSkills,
        expertise: this.page.expertise || [],
      }
    },
    // articles() {
    //   return this.$store.getters['articles/items'] || []
    // },
    sliceArticles() {
      return this.hubData.slice(0, 3)
    },
    showButton() {
      return this.sliceArticles.length < this.hubData.length
    },
  },
  mounted() {
    this.doRefine()
  },
  methods: {
    async doRefine() {
      const res = await searchClient
        .initIndex(this.searchIndex.knowledgeHub)
        .search('', {
          hitsPerPage: 500,
          filters: `type:articles AND author:"${[
            this.page.name || this.page.title,
          ]}"`,
        })

      this.hubData = [...res.hits]
    },
  },
}
</script>

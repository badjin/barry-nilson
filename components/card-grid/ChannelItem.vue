<template>
  <div class="w-full">
    <div class="mb-4 text-xs tracking-loose text-primary uppercase">
      {{ entryType }}
    </div>
    <div v-if="card.heading" class="flex flex-col justify-between">
      <div class="heading-wrapper mb-4">
        <nuxt-link :to="`/${card.uri}`">
          <h2 class="tc-h2">
            {{ headingTruncate }}
          </h2>
        </nuxt-link>
      </div>

      <div class="flex flex-col">
        <div class="">
          <div v-if="eventWhen" class="text-xs pb-6">{{ eventWhen }}</div>
          <div v-else class="text-xs pb-6">{{ card.postDate }}</div>
          <div
            v-if="categories && categories.length"
            class="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-3 pb-6 lg:pb-8"
          >
            <div v-for="(category, index) in categories" :key="index">
              <nuxt-link
                :to="`/knowledge-hub/?knowledgeHub%5BrefinementList%5D%5B${facet}%5D%5B0%5D=${refineWithTag(
                  category.title || category
                )}`"
              >
                <ButtonTag :reverse="false">{{
                  category.title || category
                }}</ButtonTag>
              </nuxt-link>
            </div>
          </div>
          <div v-else class="h-6"></div>
        </div>
        <div v-if="card.excerpt" class="excerpt-wrapper">
          {{ excerptTruncate }}
        </div>
        <div class="flex mt-6 lg:mt-2">
          <nuxt-link :to="`/${card.uri}`">
            <ButtonShape>{{
              entryType === 'podcast' ? 'Listen here' : 'Read more'
            }}</ButtonShape>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      truncateLength: 125,
    }
  },
  computed: {
    entryType() {
      const entry = this.card.__typename || this.card.type
      return entry === 'articles_default_Entry'
        ? 'insight'
        : entry === 'events_default_Entry'
        ? 'event'
        : entry === 'podcasts_default_Entry'
        ? 'podcast'
        : 'news'
    },
    eventWhen() {
      const when = this.card.eventInformation
        ? this.card.eventInformation[0].when
        : this.card.when[0]
      return when || ''
    },
    excerptTruncate() {
      if (!this.card.excerpt || this.card.excerpt === '') return ''
      return this.card.excerpt.length < this.truncateLength
        ? this.card.excerpt
        : this.card.excerpt.slice(0, this.truncateLength) + '...'
    },
    headingTruncate() {
      if (!this.card.heading || this.card.heading === '') return ''
      return this.card.heading.length < this.truncateLength
        ? this.card.heading
        : this.card.heading.slice(0, this.truncateLength) + '...'
    },
    categories() {
      return this.card.categories && this.card.categories.length
        ? this.card.categories
        : this.card.newsTags && this.card.newsTags.length
        ? this.card.newsTags
        : []
    },
    facet() {
      return this.card.categories && this.card.categories.length
        ? 'categories'
        : 'tags'
    },
  },
  methods: {
    refineWithTag(tag) {
      const value = encodeURIComponent(tag)
      return value
    },
  },
}
</script>
<style scoped>
.heading-wrapper {
  min-height: 0;
}
.excerpt-wrapper {
  min-height: 0;
}
@screen lg {
  .heading-wrapper {
    min-height: 7rem;
  }
  .excerpt-wrapper {
    min-height: 6rem;
  }
}

@screen xl {
  .heading-wrapper {
    min-height: 5.5rem;
  }
  .excerpt-wrapper {
    min-height: 6rem;
  }
}
</style>

<template>
  <ais-instant-search
    :routing="routing"
    :search-client="searchClient"
    :index-name="global"
    :initial-ui-state="initialUiState"
  >
    <ais-configure :hits-per-page.camel="6" filters="noIndex:false" />
    <ais-autocomplete ref="search">
      <template slot-scope="{ currentRefinement, refine }">
        <div class="search-bar">
          <div
            class="w-full flex items-center justify-between py-6 md:py-10 tc-container"
          >
            <input
              id="global-search"
              class="w-full md:w-4/12 px-8 py-3 leading-none placeholder-steelblue rounded-full"
              type="search"
              aria-label="Search"
              placeholder="Search the site"
              :value="currentRefinement"
              @input="
                ($event) => {
                  queryValue = $event.currentTarget.value
                  refine($event.currentTarget.value)
                }
              "
            />
            <div
              class="text-primary tc-underline-reverse hover:text-steelblue"
              @click="close"
            >
              Clear Search
            </div>
          </div>
        </div>
      </template>
    </ais-autocomplete>
    <div v-if="queryValue" class="py-6 lg:py-10 tc-container">
      <ais-stats>
        <template slot-scope="{ nbHits }">
          <p class="tc-h3 text-darkteal">
            {{ nbHits }} results for the search {{ `"${queryValue}"` }}
          </p>
        </template>
      </ais-stats>
      <ais-infinite-hits class="pb-6 md:pb-10">
        <template slot-scope="{ items, refineNext, isLastPage }">
          <div class="w-full md:w-6/12">
            <div
              v-for="hit in items"
              :key="hit.objectID"
              class="text-steelblue border-b border-steelblue border-opacity-30 py-6 md:py-10"
            >
              <nuxt-link
                :to="'/' + hit.uri"
                class="flex flex-col transform duration-300 transition-all hover:text-primary"
              >
                <div class="tc-h3 pb-3">{{ hit.title }}</div>
              </nuxt-link>
              <p v-if="hit.wysiwyg" class="">
                {{ wysiwygTruncate(hit.wysiwyg) }}
              </p>
            </div>
          </div>
          <div v-if="!isLastPage" class="py-6 md:py-12 flex justify-center">
            <ButtonPrimary @click="refineNext"> Load more </ButtonPrimary>
          </div>
        </template>
      </ais-infinite-hits>
    </div>
  </ais-instant-search>
</template>
<script>
import searchClient from '@/models/searchClient'
import searchIndex from '@/models/searchIndex'
import history from '@/components/algoliaRouter'
export default {
  props: {
    query: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchClient,
      global: searchIndex.global,
      routing: {
        router: history(),
      },
      queryValue: '',
      truncateLength: 300,
    }
  },
  computed: {
    inputValue() {
      return this.$refs.search.state.currentRefinement
    },
    initialUiState() {
      return {
        [this.global]: {
          query: this.query,
          hitsPerPage: 1000,
        },
      }
    },
  },

  watch: {
    '$route.fullPath': {
      handler() {
        this.close()
      },
    },
  },
  mounted() {
    // close modal on pressing ESC
    document.addEventListener('keyup', (evt) => {
      if (evt.keyCode === 27 && this.open) {
        this.close()
      }
    })
    this.queryValue = this.query
    // this.doRefine()
  },
  methods: {
    close() {
      this.queryValue = ''
      setTimeout(() => {
        this.$refs.search.state.currentRefinement = null
      }, 100)
    },
    wysiwygTruncate(wysiwyg) {
      return wysiwyg.length < this.truncateLength
        ? wysiwyg
        : wysiwyg.slice(0, this.truncateLength) + '...'
    },
  },
}
</script>
<style scoped>
.search-bar {
  background: #f2f5f6;
}

#global-search {
  background: #dae3e6;
}

.tc-underline-reverse {
  display: none;
}

@screen md {
  .tc-underline-reverse {
    @apply relative inline-block cursor-pointer;
  }
}

.tc-underline-reverse::after {
  @apply w-full bg-primary absolute bottom-0 left-0;

  content: '';
  height: 1px;
  transition: all 0.5s ease;
}

.tc-underline-reverse:hover::after,
.tc-underline-reverse:active::after {
  @apply w-0;
}
</style>

<template>
  <form class="w-full relative pb-4" autocomplete="off" @submit.prevent>
    <ais-instant-search
      :routing="routing"
      :search-client="searchClient"
      :index-name="global"
    >
      <ais-configure :hits-per-page.camel="100" filters="noIndex:false" />
      <ais-autocomplete ref="search">
        <template slot-scope="{ currentRefinement, indices, refine }">
          <button
            v-if="!currentRefinement"
            class="tc-global-search-text-input__button"
          >
            <IconSearch class="tc-global-search-text-input__icon" />
          </button>
          <button v-else class="absolute top-1 right-8 mt-4">
            <IconClose
              class="w-auto h-4 fill-current text-white"
              @click="close"
            />
          </button>
          <input
            id="global-search"
            class="tc-search-input"
            type="search"
            aria-label="Search"
            placeholder="Search"
            :value="currentRefinement"
            @input="refine($event.currentTarget.value)"
          />
          <ul
            v-for="index in indices"
            v-show="currentRefinement"
            :key="index.indexId"
            class="z-50 absolute left-0 bottom-0 min-h-56 bg-white text-darkteal transform translate-y-full rounded shadow-xl overflow-hidden py-2"
          >
            <li
              v-for="hit in filteredItems(index.hits)"
              :key="hit.objectID"
              class="text-steelblue"
            >
              <div class="hover:bg-darkgrey">
                <div class="py-3 px-5 flex flex-col">
                  <nuxt-link :to="'/' + hit.uri">
                    <strong>
                      <ais-highlight
                        v-if="hit.heading || hit.title"
                        class=""
                        attribute="title"
                        :hit="hit"
                      ></ais-highlight>
                    </strong>
                    <!-- <ais-snippet attribute="wysiwyg" :hit="hit" /> -->
                  </nuxt-link>
                  <div class="uppercase text-primary text-xs">
                    {{ hit.type }}
                  </div>
                </div>
              </div>
            </li>
            <li
              v-if="index.hits.length > cappedResult"
              class="py-4 flex justify-center"
            >
              <ButtonPrimary
                size="sm"
                class="relative tc-btn"
                @click="results(index.hits)"
              >
                View all
              </ButtonPrimary>
            </li>
          </ul>
        </template>
      </ais-autocomplete>
    </ais-instant-search>
  </form>
</template>
<script>
import searchClient from '@/models/searchClient'
import searchIndex from '@/models/searchIndex'
import history from '@/components/algoliaRouter'
export default {
  components: {
    IconSearch: () => import('@/assets/svg/search.svg?inline'),
    IconClose: () => import('@/assets/svg/close.svg?inline'),
  },
  data() {
    return {
      searchClient,
      global: searchIndex.global,
      routing: {
        router: history(),
      },
      cappedResult: 4,
    }
  },
  computed: {
    inputValue() {
      return this.$refs.search.state.currentRefinement
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
  },
  methods: {
    close() {
      this.$refs.search.state.currentRefinement = ''
    },
    filteredItems(hits) {
      return hits?.length > this.cappedResult
        ? hits.slice(0, this.cappedResult)
        : hits
    },
    async results(hits) {
      const data = {
        heading: 'Search',
        query: this.$refs.search.state.currentRefinement,
      }
      await this.$store.commit('searchResults/store', data)
      await this.$router.push('/search')
    },
  },
}
</script>
<style scoped>
.custom-autocomplete {
  width: 20px;
  color: red;
}
</style>

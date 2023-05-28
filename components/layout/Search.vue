<template>
  <form class="w-full relative pb-10" autocomplete="off" @submit.prevent>
    <input autocomplete="false" name="hidden" type="text" class="hidden" />
    <label
      for="global-search"
      :class="open ? 'w-full' : 'w-10'"
      class="h-10 inline-flex items-center rounded-full relative transition-all"
    >
      <SvgSearch
        class="ml-3 w-5 h-auto fill-current absolute cursor-pointer hover:text-primary"
        fill="white"
        @click="expandBar"
      ></SvgSearch>

      <ais-instant-search
        :routing="routing"
        :search-client="searchClient"
        :index-name="global"
      >
        <ais-configure :hits-per-page.camel="100" filters="noIndex:false" />
        <ais-autocomplete ref="search">
          <template slot-scope="{ currentRefinement, indices, refine }">
            <div class="">
              <input
                id="global-search"
                class="bg-transparent px-10 outline-none placeholder-opacity-75"
                :class="inputClasses"
                type="search"
                aria-label="Search"
                :placeholder="open && 'Enter a Keyword(s)'"
                :value="open ? currentRefinement : ''"
                @input="refine($event.currentTarget.value)"
              />
            </div>
            <div
              v-show="open"
              class="absolute bottom-0 w-230px h-4 border-b-2"
            ></div>
            <ul
              v-for="index in indices"
              v-show="open && currentRefinement && index.hits.length"
              :key="index.indexId"
              class="z-50 mt-6 left-0 -bottom-6 min-h-56 absolute bg-white text-darkteal transform translate-y-full rounded shadow-xl overflow-hidden py-2"
              style="width: 150%"
            >
              <li
                v-for="hit in filteredItems(index.hits)"
                :key="hit.objectID"
                class="text-steelblue"
              >
                <div class="hover:bg-darkgrey">
                  <div class="py-3 px-7 flex flex-col">
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
    </label>
    <div
      v-show="open"
      class="absolute z-50 menu-close w-4 h-4 rounded-full"
      :class="transNav ? 'bg-steelblue' : 'bg-white'"
      @click.stop="close"
    >
      <MenuClose class="w-full h-auto fill-current"></MenuClose>
    </div>
  </form>
</template>
<script>
import searchClient from '@/models/searchClient'
import searchIndex from '@/models/searchIndex'
import history from '@/components/algoliaRouter'
export default {
  components: {
    SvgSearch: () => import('@/assets/svg/search.svg?inline'),
    MenuClose: () => import('@/assets/svg/close.svg?inline'),
  },
  props: {
    transNav: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
      searchClient,
      global: searchIndex.global,
      routing: {
        router: history(),
      },
      cappedResult: 4,
    }
  },
  computed: {
    inputClasses() {
      return this.open ? 'w-full max-w-3xl' : 'w-10'
    },
  },

  watch: {
    '$route.fullPath': {
      handler() {
        if (!this.open) return
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
      this.open = false
      this.$refs.search.state.currentRefinement = ''
      this.$emit('click', false)
    },
    filteredItems(hits) {
      return hits?.length > this.cappedResult
        ? hits.slice(0, this.cappedResult)
        : hits
    },

    async results(hits) {
      const data = {
        preHeading: `Showing ${hits.length} result for`,
        heading: `"${this.$refs.search.state.currentRefinement}"`,
        results: hits,
        query: this.$refs.search.state.currentRefinement,
      }
      await this.$store.commit('searchResults/store', data)
      await this.$router.push('/search')
    },
    expandBar() {
      this.open = true
      this.$emit('click', true)
    },
  },
}
</script>
<style scoped>
label[for='global-search'] .ais-InstantSearch,
label[for='global-search'] .ais-SearchBox {
  width: 100%;
}
label[for='global-search'] .ais-SearchBox-submit {
  color: white;
}
.search-icon {
  margin-left: 12px;
}

.menu-close {
  right: 40px;
  top: 13px;
}
</style>
<style>
.ais-Highlight-highlighted {
  color: #007264;
  background: #e5f8f4;
}
</style>

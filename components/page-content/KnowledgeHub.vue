<template>
  <ais-instant-search
    :routing="routing"
    :search-client="searchClient"
    :index-name="knowledgeHub"
    :initial-ui-state="initialUiState"
  >
    <ais-configure
      :hits-per-page.camel="featuredNews.length ? 7 : 9"
      filters="noIndex:false"
    />
    <div class="bg-darkteal">
      <div class="tc-container py-5">
        <ais-refinement-list
          ref="refinementList"
          operator="or"
          attribute="services"
        >
          <template #default="{}">
            <div
              class="flex flex-wrap flex-row md:space-y-0 md:space-x-2 -ml-2 md:ml-0"
            >
              <div
                v-for="(filter, index) in sectionValues"
                :key="index"
                class="flex items-center"
              >
                <input
                  :id="`radio-${index}`"
                  :checked="filter.label.includes(filterValue)"
                  type="radio"
                  :value="filterValue"
                  name="radio"
                  class="w-4 h-4 hidden radio-pills"
                  @change="updateMap(filter)"
                />
                <label
                  :for="`radio-${index}`"
                  class="ml-2 text-sm my-1 font-medium transition text-white hover:text-bold cursor-pointer rounded-full border-2 border-transparent px-4 py-1"
                  >{{ filter.label }}</label
                >
              </div>
            </div>
          </template>
        </ais-refinement-list>
      </div>
    </div>
    <div class="search-bar">
      <div
        class="tc-container py-5 lg:py-10 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div
          class="input-box w-full lg:w-3/12 px-8 py-3 leading-none placeholder-steelblue rounded-full relative"
        >
          <ais-autocomplete ref="knowledgeHub">
            <template slot-scope="{ currentRefinement, refine }">
              <input
                id="knowledgeHub-search"
                type="search"
                class="w-full input-box focus:outline-none pl-2"
                aria-label="Search"
                placeholder="Search by keyword"
                :value="currentRefinement"
                @input="
                  ($event) => {
                    refine($event.currentTarget.value)
                  }
                "
              />
            </template>
          </ais-autocomplete>
          <div class="absolute" style="top: 13px; left: 12px">
            <IconSearch class="w-auto h-4 fill-current text-primary" />
          </div>
        </div>
        <div class="block lg:hidden mt-4">
          <AccordionWrap>
            <AccordionMenuSmall :is-multi-option="false">
              <template slot="accordion-trigger">
                <div class="text-steelblue font-bold">Filters</div>
              </template>
              <template slot="accordion-content">
                <div class="flex flex-col space-y-4 mt-4">
                  <PageContentFilter
                    attribute="type"
                    :menu-close="filter1"
                    @click="resetOthers(1)"
                  />
                  <PageContentFilter
                    attribute="author"
                    sort-by="name"
                    :disabled="filterValue === 'Firm'"
                    :menu-close="filter2"
                    @click="resetOthers(2)"
                  />
                  <template v-if="filterValue === 'Firm'">
                    <PageContentFilter
                      attribute="tags"
                      :menu-close="filter3"
                      @click="resetOthers(3)"
                    />
                  </template>
                  <template v-else>
                    <PageContentFilter
                      attribute="categories"
                      :menu-close="filter3"
                      @click="resetOthers(3)"
                    />
                    <PageContentFilter class="hidden" attribute="tags" />
                  </template>

                  <!-- <PageContentFilter
                    attribute="categories"
                    :menu-close="filter3"
                    :disabled="filterValue === 'Firm'"
                    @click="resetOthers(3)"
                  />
                  <PageContentFilter class="hidden" attribute="tags" /> -->
                  <ais-clear-refinements
                    ref="clearFilters"
                    class="w-full flex justify-center pl-2"
                    :excluded-attributes="['services']"
                  >
                    <template #default="{ refine }">
                      <UnderlineLink @click="refine">
                        Clear Filters
                      </UnderlineLink>
                    </template>
                  </ais-clear-refinements>
                </div>
              </template>
            </AccordionMenuSmall>
          </AccordionWrap>
        </div>
        <div class="hidden lg:flex space-x-4 items-center">
          <PageContentFilter
            attribute="type"
            :menu-close="filter1"
            @click="resetOthers(1)"
          />
          <PageContentFilter
            attribute="author"
            sort-by="name"
            :disabled="filterValue === 'Firm'"
            :menu-close="filter2"
            @click="resetOthers(2)"
          />
          <template v-if="filterValue === 'Firm'">
            <PageContentFilter
              attribute="tags"
              :menu-close="filter3"
              position="right"
              @click="resetOthers(3)"
            />
          </template>
          <template v-else>
            <PageContentFilter
              attribute="categories"
              :menu-close="filter3"
              position="right"
              @click="resetOthers(3)"
            />
            <PageContentFilter class="hidden" attribute="tags" />
          </template>
          <!-- <PageContentFilter
            attribute="categories"
            :menu-close="filter3"
            :disabled="filterValue === 'Firm'"
            position="right"
            @click="resetOthers(3)"
          />
          <PageContentFilter class="hidden" attribute="tags" /> -->
          <ais-clear-refinements
            ref="clearFilters"
            :excluded-attributes="['services']"
            class="w-full pl-2"
          >
            <template #default="{ refine }">
              <UnderlineLink
                @click="
                  () => {
                    filterValue = -1
                    refine()
                  }
                "
              >
                Clear Filters
              </UnderlineLink>
            </template>
          </ais-clear-refinements>
        </div>
      </div>
    </div>
    <ais-infinite-hits>
      <template slot-scope="{ items, refineNext, isLastPage }">
        <template v-if="items.length">
          <div class="tc-container py-c">
            <CardGridFeatured
              v-show="featured.length"
              :featured="featuredNews"
              :side-card="items[0]"
            />
            <CardGrid
              :cards="getCards(items)"
              card-type="Custom"
              :class="featured.length && 'lg:pt-16'"
            />
          </div>
          <div v-if="!isLastPage" class="pb-c flex justify-center items-center">
            <ButtonPrimary @click="refineNext"> Load more </ButtonPrimary>
          </div>
        </template>
        <template v-else>
          <ais-stats>
            <template slot-scope="{ nbHits }">
              <p class="py-c px-10 tc-h3 text-darkteal">
                {{ nbHits }} results for the search with the keyword
              </p>
            </template>
          </ais-stats>
        </template>
      </template>
    </ais-infinite-hits>
  </ais-instant-search>
</template>
<script>
import { drop } from 'lodash-es'
import searchClient from '@/models/searchClient'
import searchIndex from '@/models/searchIndex'
import history from '@/components/algoliaRouter'
export default {
  components: {
    IconSearch: () => import('@/assets/svg/search.svg?inline'),
    UnderlineLink: () => import('@/components/button/Underline.vue'),
  },

  props: {
    featured: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      toggleValue: false,
      filterValue: 'Insurance & Health',
      sectionName: {
        section1: 'Insurance & Health',
        section2: 'Family Law, Wills & Estates',
      },
      sectionValues: [
        { label: 'Insurance & Health', value: ['Insurance', 'Health'] },
        { label: 'Family Law, Wills & Estates', value: ['Family', 'Wills'] },
        { label: 'Firm', value: ['Firm'] },
      ],
      searchClient,
      knowledgeHub: searchIndex.knowledgeHub,
      routing: {
        router: history(),
      },
      filter1: false,
      filter2: false,
      filter3: false,
      parameter: {},
    }
  },
  computed: {
    initialUiState() {
      return {
        [this.knowledgeHub]: {
          refinementList: {
            services: [this.filterValue],
          },
        },
      }
    },
    featuredNews() {
      return this.featured.length ? this.featured[0] : {}
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
    const query = Object.keys(this.$route.query)
    if (query.length && query[0].includes('services')) {
      // console.log(`Query: ${query[0]}`)
      this.filterValue = this.$route.query[query[0]]
    }
    document.addEventListener('keyup', (evt) => {
      if (evt.keyCode === 27 && this.open) {
        this.close()
      }
    })
  },
  methods: {
    close() {
      setTimeout(() => {
        this.$refs.knowledgeHub.state.currentRefinement = null
      }, 100)
    },
    switchToggle(toggle) {
      this.toggleValue = !toggle
    },
    doRefine4Services(value) {
      // this.$refs.knowledgeHub.state.currentRefinement = null
      const items = [...this.$refs.refinementList.state.items]
      items.forEach((facet) => {
        if (facet.isRefined) {
          this.$refs.refinementList.state.refine(facet.value)
        }
      })

      const filtered1 = items.filter((facet) => facet.value.includes(value[0]))
      const filtered2 =
        value.length > 1
          ? items
              .filter((facet) => !facet.value.includes(value[0]))
              .filter((facet) => facet.value.includes(value[1]))
          : []
      const filtered = [...filtered1, ...filtered2]
      filtered.forEach((facet) => {
        this.$refs.refinementList.state.refine(facet.value)
      })
    },
    getCards(items) {
      return this.featuredNews.length ? drop(items) : items
    },
    resetOthers(index) {
      if (index === 1) {
        this.filter1 = false
        this.filter2 = true
        this.filter3 = true
      } else if (index === 2) {
        this.filter1 = true
        this.filter2 = false
        this.filter3 = true
      } else {
        this.filter1 = true
        this.filter2 = true
        this.filter3 = false
      }
    },
    updateMap(value) {
      this.filterValue = value.label
      this.doRefine4Services(value.value)
      // if (this.filterValue !== -1) this.doRefine4Services(value.value)
      // else {
      //   this.$refs.doRefineAll.state.refine()
      // }
    },
  },
}
</script>
<style scoped>
.radio-pills:checked + label {
  border: 2px solid #fff;
}
.radio-pills:hover + label {
  background: rgba(255, 255, 255, 0.1);
}
.radio-pills + label {
  background: rgba(255, 255, 255, 0.1);
}
@screen md {
  .radio-pills + label {
    background: transparent;
  }
}
.search-bar {
  background: #f2f5f6;
}

.input-box {
  background: #dae3e6;
}

.tc-underline-reverse {
  @apply relative inline-block cursor-pointer;
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

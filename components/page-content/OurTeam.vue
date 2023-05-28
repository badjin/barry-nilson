<template>
  <ais-instant-search
    :routing="routing"
    :search-client="searchClient"
    :index-name="ourTeam"
    :initial-ui-state="initialUiState"
  >
    <ais-configure :hits-per-page.camel="12" />
    <div class="bg-darkteal">
      <div class="tc-container py-5">
        <ais-refinement-list
          ref="refinementList"
          operator="or"
          attribute="service"
        >
          <template #default="{}">
            <ButtonToggle
              v-model="toggleValue"
              :section-name="sectionName"
              class="tc-small w-full lg:w-6/12 xl:w-4/12"
              @click="
                (toggle) => {
                  doRefine4Services(toggle)
                  switchToggle(toggle)
                }
              "
            />
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
          <ais-autocomplete ref="ourTeam">
            <template slot-scope="{ currentRefinement, refine }">
              <input
                id="ourTeam-search"
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
                    attribute="expertise"
                    :menu-close="filter1"
                    @click="resetOthers(1)"
                  />
                  <PageContentFilter
                    attribute="location"
                    sort-by="name"
                    :menu-close="filter2"
                    @click="resetOthers(2)"
                  />
                  <PageContentFilter
                    attribute="rolesPosition"
                    :menu-close="filter3"
                    @click="resetOthers(3)"
                  />
                  <ais-clear-refinements class="w-full flex justify-center">
                    <template #default="{ refine }">
                      <div
                        class="text-primary tc-underline-reverse hover:text-steelblue"
                        @click.prevent="refine"
                      >
                        Clear Filter
                      </div>
                    </template>
                  </ais-clear-refinements>
                </div>
              </template>
            </AccordionMenuSmall>
          </AccordionWrap>
        </div>
        <div class="hidden lg:flex space-x-4 items-center">
          <PageContentFilter
            attribute="expertise"
            :menu-close="filter1"
            @click="resetOthers(1)"
          />
          <PageContentFilter
            attribute="location"
            sort-by="name"
            :menu-close="filter2"
            @click="resetOthers(2)"
          />
          <PageContentFilter
            attribute="rolesPosition"
            position="right"
            :menu-close="filter3"
            @click="resetOthers(3)"
          />
          <ais-clear-refinements class="w-full">
            <template #default="{ refine }">
              <div
                class="text-primary tc-underline-reverse hover:text-steelblue"
                @click.prevent="refine"
              >
                Clear Filter
              </div>
            </template>
          </ais-clear-refinements>
        </div>
      </div>
    </div>
    <ais-infinite-hits>
      <template slot-scope="{ items, refineNext, isLastPage }">
        <div
          class="tc-container py-c grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-1 md:gap-x-10 md:gap-y-10"
        >
          <div v-for="member in items" :key="member.id" class="">
            <CardGridMember :card="member" />
          </div>
        </div>
        <div v-if="!isLastPage" class="pb-c flex justify-center items-center">
          <ButtonPrimary @click="refineNext"> Load more </ButtonPrimary>
        </div>
      </template>
    </ais-infinite-hits>
  </ais-instant-search>
</template>
<script>
import searchClient from '@/models/searchClient'
import searchIndex from '@/models/searchIndex'
import history from '@/components/algoliaRouter'
export default {
  components: {
    IconSearch: () => import('@/assets/svg/search.svg?inline'),
  },
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      toggleValue: false,
      sectionName: {
        section1: 'Insurance & Health',
        section2: 'Family Law, Wills & Estates',
      },
      searchClient,
      ourTeam: searchIndex.ourTeam,
      routing: {
        router: history(),
      },
      filter1: false,
      filter2: false,
      filter3: false,
    }
  },
  computed: {
    initialUiState() {
      return {
        [this.ourTeam]: {
          refinementList: {
            service: ['Insurance & Health', 'Insurance', 'Health'],
          },
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
    // this.doRefine4Services(true)
  },
  methods: {
    close() {
      setTimeout(() => {
        this.$refs.ourTeam.state.currentRefinement = null
      }, 100)
    },
    switchToggle(toggle) {
      this.toggleValue = !toggle
    },
    doRefine4Services(toggle) {
      // console.log(this.$refs.refinementList.state)
      const items = [...this.$refs.refinementList.state.items]
      items.forEach((facet) => {
        if (facet.isRefined) {
          this.$refs.refinementList.state.refine(facet.value)
        }
      })
      let value1
      let value2
      if (!toggle) {
        value1 = 'Family'
        value2 = 'Wills'
      } else {
        value1 = 'Insurance'
        value2 = 'Health'
      }
      const filtered1 = items.filter((facet) => facet.value.includes(value1))
      const filtered2 = items
        .filter((facet) => !facet.value.includes(value1))
        .filter((facet) => facet.value.includes(value2))
      const filtered = [...filtered1, ...filtered2]
      filtered.forEach((facet) => {
        this.$refs.refinementList.state.refine(facet.value)
      })
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
  },
}
</script>
<style scoped>
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

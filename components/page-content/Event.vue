<template>
  <div class="tc-container py-c">
    <div class="flex flex-wrap lg:flex-row-reverse -mx-10">
      <div class="w-full lg:w-6/12 px-10 flex flex-col">
        <div class="">
          <span class="text-xs tracking-loose text-primary uppercase"
            >event information</span
          >
          <div class="flex flex-col space-y-7 lg:space-y-10 mt-5 lg:mt-6">
            <div class="space-y-5 lg:space-y-6">
              <div class="flex space-x-3">
                <div class="order-mark"></div>
                <span class="tc-h4">{{ information.when }}</span>
              </div>
              <div class="flex space-x-3">
                <div class="order-mark"></div>
                <span class="tc-h4">{{ information.time }}</span>
              </div>
              <div class="flex space-x-3">
                <div class="order-mark"></div>
                <span class="tc-h4">{{ information.where }}</span>
              </div>
            </div>
            <CraftLink
              v-show="information.registerLink && information.registerLink.url"
              :link="information.registerLink"
            >
              <ButtonPrimary>
                {{
                  information.registerLink.customText ||
                  information.registerLink.text
                }}
              </ButtonPrimary>
            </CraftLink>
          </div>
        </div>
        <div class="hidden lg:flex flex-col py-7 lg:py-10 space-y-10">
          <div
            class="tc-wys separator-b-meta pb-7 lg:-10"
            v-html="information.description"
          ></div>
          <div v-if="module.eventTags && module.eventTags.length">
            <div class="mb-4 text-xs tracking-loose text-primary uppercase">
              tags
            </div>
            <div class="flex flex-wrap -mx-2">
              <div
                v-for="tag in module.eventTags"
                :key="tag.id"
                class="px-2 my-1"
              >
                <nuxt-link :to="filterUrl(tag.title || tag, 'tags')">
                  <ButtonTag
                    :reverse="false"
                    :class="tag.title.includes('Covid') && 'uppercase'"
                    >{{ tag.title || tag }}</ButtonTag
                  >
                </nuxt-link>
              </div>
            </div>
          </div>
          <div>
            <div class="mb-4 text-xs tracking-loose text-primary uppercase">
              share
            </div>
            <ShareOnSns :full-path="$route.fullPath" />
          </div>
        </div>

        <div class="lg:hidden separator-b pt-4 pb-6">
          <AccordionWrap>
            <AccordionMenuSmall
              :is-multi-option="false"
              @input="(active) => menuExpanded(active)"
            >
              <template slot="accordion-trigger">
                <span class="font-bold">More</span>
              </template>
              <template slot="accordion-content">
                <div class="flex flex-col py-7 space-y-10">
                  <div
                    class="tc-wys separator-b-meta pb-7 lg:-10"
                    v-html="information.description"
                  ></div>
                  <div v-if="module.eventTags && module.eventTags.length">
                    <div
                      class="mb-4 text-xs tracking-loose text-primary uppercase"
                    >
                      tags
                    </div>
                    <div class="flex space-x-3">
                      <div
                        v-for="tag in module.eventTags"
                        :key="tag.id"
                        class="tc-category"
                      >
                        {{ tag.title }}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      class="mb-4 text-xs tracking-loose text-primary uppercase"
                    >
                      share
                    </div>
                    <div class="flex space-x-8 text-steelblue">
                      <a href="#" target="_blank" class="tc-social-links">
                        <Twitter class="h-full tc-social-links--icon" />
                        <span class="text-xs font-bold pl-2"
                          >Share on Twitter</span
                        >
                      </a>
                      <a href="#" target="_blank" class="tc-social-links">
                        <LinkedIn class="h-full tc-social-links--icon" />
                        <span class="text-xs font-bold pl-2"
                          >Share on LinkedIn</span
                        >
                      </a>
                    </div>
                  </div>
                </div>
              </template>
            </AccordionMenuSmall>
          </AccordionWrap>
        </div>
      </div>
      <div class="w-full lg:w-6/12 px-10 tc-wys separator pt-8 lg:pt-0">
        <div class="w-full">
          <div v-if="module.triggerWarning" class="warning-blue">
            {{ module.triggerWarning }}
          </div>
          <div v-html="module.mainContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
import filterUrl from '@/components/filterUrl'
export default {
  components: {
    Twitter: () => import('~/assets/svg/twitter.svg?inline'),
    LinkedIn: () => import('~/assets/svg/linkedInOld.svg?inline'),
  },
  mixins: [filterUrl],
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      activeIndex: -1,
    }
  },
  computed: {
    information() {
      return get(this.module, 'eventInformation[0]') || {}
    },
  },
  methods: {
    rolePosition(staff) {
      return get(staff, 'rolesPositions[0].title') || ''
    },
    refineWithTag(tag) {
      const value = encodeURIComponent(tag)
      return value
    },
  },
}
</script>
<style scoped>
.separator-b-meta {
  @apply border-b border-steelblue border-opacity-30;
}
.separator-b {
  @apply border-b border-steelblue border-opacity-30;
}
.separator {
  @apply border-b-0 border-steelblue border-opacity-30;
}

@screen lg {
  .separator {
    @apply border-b-0 border-r border-steelblue border-opacity-30;
  }
  .separator-b {
    @apply border-b-0 border-steelblue border-opacity-30;
  }
}

.order-mark {
  @apply w-2 h-2 border-r-2 border-t-2 border-primary;

  transform: rotate(45deg) translateY(8px);
}
</style>

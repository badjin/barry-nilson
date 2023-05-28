<template>
  <div class="tc-container py-c">
    <div class="flex flex-col lg:flex-row -mx-10">
      <div class="w-full lg:w-8/12 px-10 tc-wys mb-10 lg:mb-0 separator-r">
        <div class="w-full lg:w-10/12 pb-10 lg:pb-0 separator">
          <div
            v-if="module.triggerWarning"
            class="warning-blue"
            v-html="module.triggerWarning"
          ></div>
          <div v-html="module.mainContent"></div>
        </div>
      </div>
      <div class="w-full lg:w-4/12 px-10 flex flex-col">
        <!-- <div v-if="hasGetInTouch" class="separator-b-meta pb-7 lg:pb-10">
          <span class="text-xs tracking-loose text-primary uppercase"
            >get in touch</span
          >
          <div class="mt-9 -mx-3 lg:-mx-5 flex">
            <nuxt-link
              v-for="staff in module.getInTouch"
              :key="staff.id"
              :to="`/${staff.uri}`"
              class="w-full lg:w-6/12 px-3 lg:px-5"
            >
              <div
                v-if="staff.profile && staff.profile.length"
                class="rounded overflow-hidden"
              >
                <TcRatio :height="252.86" :width="190.4">
                  <nuxt-img
                    :src="staff.profile[0].src"
                    alt="media"
                    format="webp"
                    loading="lazy"
                    preload
                    class="hover:scale-110 transition duration-500"
                  />
                </TcRatio>
              </div>
              <div class="mt-3 lg:mt-4">
                <div class="font-bold">{{ staff.name }}</div>
                <span v-if="rolePosition(staff)">{{
                  rolePosition(staff)
                }}</span>
              </div>
            </nuxt-link>
          </div>
        </div> -->
        <div class="flex flex-col pt-7 lg:pt-10 space-y-10 separator-b">
          <div v-if="module.newsTags && module.newsTags.length">
            <div class="mb-4 text-xs tracking-loose text-primary uppercase">
              tags
            </div>
            <div class="flex flex-wrap -mx-2">
              <div
                v-for="tag in module.newsTags"
                :key="tag.id"
                class="px-2 my-1"
              >
                <nuxt-link
                  :to="`/knowledge-hub/?staging_knowledgeHub%5BrefinementList%5D%5Btags%5D%5B0%5D=${refineWithTag(
                    tag.title || tag
                  )}`"
                >
                  <ButtonTag
                    :reverse="false"
                    :class="tag.title.includes('Covid') && 'uppercase'"
                    >{{ tag.title || tag }}</ButtonTag
                  >
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="pb-6 lg:pb-0">
            <div class="mb-4 text-xs tracking-loose text-primary uppercase">
              share
            </div>
            <ShareOnSns :full-path="$route.fullPath" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
export default {
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    hasGetInTouch() {
      return this.module.getInTouch && this.module.getInTouch.length
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
  @apply border-b-0 border-steelblue border-opacity-30;
}
.separator {
  @apply border-b border-steelblue border-opacity-30;
}
.separator-r {
  @apply border-r-0 border-steelblue border-opacity-30;
}

@screen lg {
  .separator {
    @apply border-b-0 border-steelblue border-opacity-30;
  }
  .separator-r {
    @apply border-r border-steelblue border-opacity-30;
  }
  .separator-b {
    @apply border-b-0 border-steelblue border-opacity-30;
  }
}
</style>

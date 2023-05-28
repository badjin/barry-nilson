<template>
  <div class="tc-container py-c">
    <div class="flex flex-col lg:flex-row -mx-10">
      <div class="w-full lg:w-6/12 px-10 tc-wys separator">
        <div
          v-if="module.triggerWarning"
          class="warning-blue"
          v-html="module.triggerWarning"
        ></div>
        <div class="pb-10 lg:pb-20">
          <iframe
            :src="module.podcastSource"
            height="100%"
            width="100%"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
        <div
          class="w-full lg:w-10/12 separator-b"
          v-html="module.mainContent"
        ></div>
      </div>
      <div class="w-full lg:w-6/12 px-10 flex flex-col mt-10 lg:mt-0">
        <div v-if="hasInThisEpisode" class="separator-b-meta pb-7 lg:pb-10">
          <span class="text-xs tracking-loose text-primary uppercase"
            >In this episode</span
          >
          <div class="mt-9 -mx-3 lg:-mx-5 flex">
            <div
              v-for="staff in module.inThisEpisode"
              :key="staff.id"
              class="w-full lg:w-4/12 px-3 lg:px-5"
            >
              <template v-if="staff.uri">
                <nuxt-link :to="`/${staff.uri}`">
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
              </template>
              <template v-else>
                <div>
                  <TcRatio
                    v-if="staff.profile && staff.profile.length"
                    :height="252.86"
                    :width="190.4"
                  >
                    <nuxt-img
                      :src="staff.profile[0].src"
                      alt="media"
                      format="webp"
                      loading="lazy"
                      preload
                    />
                  </TcRatio>
                  <div class="mt-3 lg:mt-4">
                    <div class="font-bold">{{ staff.name }}</div>
                    <span v-if="rolePosition(staff)">{{
                      rolePosition(staff)
                    }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="flex flex-col py-7 lg:py-10 space-y-10">
          <div v-if="module.podcastTags && module.podcastTags.length">
            <div class="mb-4 text-xs tracking-loose text-primary uppercase">
              tags
            </div>
            <div class="flex flex-wrap -mx-2">
              <div
                v-for="tag in module.podcastTags"
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
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
import filterUrl from '@/components/filterUrl'
export default {
  mixins: [filterUrl],
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    hasInThisEpisode() {
      return this.module.inThisEpisode && this.module.inThisEpisode.length
    },
  },
  methods: {
    rolePosition(staff) {
      return staff.role !== undefined
        ? staff.role
        : get(staff, 'rolesPositions[0].title') || ''
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
</style>
